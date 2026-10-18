import {
  createSchema,
  ConcreteRuleClass,
  type ArraySchemaType,
  type ObjectSchemaType,
  type SchemaType,
  type SlugValidationContext,
  type ValidationMarker,
} from 'sanity'
import {describe, expect, it, vi} from 'vitest'

import directory from './directory'
import gallery from './gallery'
import {schemaTypes} from './index'
import {isUniquePageSlug} from './page'
import singleAndDoubleColumn from './singleAndDoubleColumn'

const schema = createSchema({name: 'test', types: schemaTypes})

function asObject(type: SchemaType | undefined): ObjectSchemaType {
  if (type?.jsonType !== 'object') {
    throw new Error(`Expected an object type, received ${type?.name ?? 'nothing'}`)
  }
  return type
}

function asArray(type: SchemaType | undefined): ArraySchemaType {
  if (type?.jsonType !== 'array') {
    throw new Error(`Expected an array type, received ${type?.name ?? 'nothing'}`)
  }
  return type
}

function field(typeName: string, fieldName: string) {
  const match = asObject(schema.get(typeName)).fields.find((item) => item.name === fieldName)
  if (!match) throw new Error(`Missing ${typeName}.${fieldName}`)
  return match
}

function definitionField(typeName: string, fieldName: string) {
  const type = schemaTypes.find((item) => item.name === typeName)
  const match = type && 'fields' in type ? type.fields?.find((item) => item.name === fieldName) : undefined
  if (!match) throw new Error(`Missing ${typeName}.${fieldName}`)
  return match
}

async function markersFor(validation: unknown, value: unknown): Promise<ValidationMarker[]> {
  if (typeof validation !== 'function') throw new Error('Expected a validation builder')
  const rule = validation(new ConcreteRuleClass().type('String'))
  return rule.validate(value, {})
}

describe('page schema', () => {
  it('registers the page document and the three content objects', () => {
    expect(schema.get('page')?.name).toBe('page')
    expect(schema.get('singleAndDoubleColumn')?.name).toBe('singleAndDoubleColumn')
    expect(schema.get('directory')?.name).toBe('directory')
    expect(schema.get('gallery')?.name).toBe('gallery')
  })

  it('requires a title and a slug, and describes index as the home page', () => {
    const title = field('page', 'title')
    const slug = field('page', 'slug')

    expect(title.type.validation).toBeDefined()
    expect(slug.type.title).toBe('Slug')
    expect(slug.type.description).toContain('index')
    expect(slug.type.description).toContain('home page')
    expect(slug.type.options?.isUnique).toBe(isUniquePageSlug)
  })

  it('stores optional SEO fields and defaults noIndex to false', () => {
    const seo = asObject(field('page', 'seo').type)
    const names = seo.fields.map((item) => item.name)

    expect(names).toEqual(['title', 'description', 'image', 'noIndex'])
    expect(seo.initialValue).toEqual({noIndex: false})

    const noIndex = seo.fields.find((item) => item.name === 'noIndex')
    expect(noIndex?.type.name).toBe('boolean')
    expect(noIndex?.type.initialValue).toBe(false)

    const image = asObject(seo.fields.find((item) => item.name === 'image')?.type)
    expect(image.name).toBe('image')
    expect(image.options?.hotspot).toBe(true)
  })

  it('warns on long SEO text and still accepts it', async () => {
    const seo = definitionField('page', 'seo')
    if (!('fields' in seo) || !seo.fields) throw new Error('Expected SEO object fields')
    const title = seo.fields.find((item) => item.name === 'title')
    const description = seo.fields.find((item) => item.name === 'description')

    const titleMarkers = await markersFor(title?.validation, 'x'.repeat(61))
    const descriptionMarkers = await markersFor(description?.validation, 'y'.repeat(161))
    const shortTitle = await markersFor(title?.validation, 'x'.repeat(60))

    expect(titleMarkers).toEqual([
      expect.objectContaining({
        level: 'warning',
        message: 'SEO titles longer than 60 characters may be cut off.',
      }),
    ])
    expect(descriptionMarkers).toEqual([
      expect.objectContaining({
        level: 'warning',
        message: 'SEO descriptions longer than 160 characters may be cut off.',
      }),
    ])
    expect(shortTitle).toEqual([])
  })

  it('orders only the three content components and allows an empty list', () => {
    const content = asArray(field('page', 'content').type)

    expect(content.of.map((member) => member.name)).toEqual([
      'singleAndDoubleColumn',
      'directory',
      'gallery',
    ])
    expect(definitionField('page', 'content').validation).toBeUndefined()
  })

  it('stores a one-or-two column choice and no child list', async () => {
    expect(singleAndDoubleColumn.fields?.map((item) => item.name)).toEqual(['columns'])
    const columns = field('singleAndDoubleColumn', 'columns')
    expect(columns.type.options?.list).toEqual([
      {title: 'One', value: 'one'},
      {title: 'Two', value: 'two'},
    ])
    const missing = await markersFor(definitionField('singleAndDoubleColumn', 'columns').validation, undefined)
    expect(missing.some((marker) => marker.level === 'error')).toBe(true)
  })

  it('stores a directory type of compact or default', async () => {
    expect(directory.fields?.map((item) => item.name)).toEqual(['type'])
    const type = field('directory', 'type')
    expect(type.type.options?.list).toEqual([
      {title: 'Compact', value: 'compact'},
      {title: 'Default', value: 'default'},
    ])
    const missing = await markersFor(definitionField('directory', 'type').validation, undefined)
    expect(missing.some((marker) => marker.level === 'error')).toBe(true)
  })

  it('registers a gallery with no element fields', () => {
    expect(gallery.fields?.map((item) => item.name)).toEqual(['schemaPlaceholder'])
    expect(gallery.fields?.[0]?.hidden).toBe(true)
    expect(asObject(schema.get('gallery')).fields.map((item) => item.name)).toEqual([
      'schemaPlaceholder',
    ])
    expect(schema._validation ?? []).toEqual([])
  })
})

function slugClient(result: boolean) {
  const fetch = vi.fn<(query: string, params: {slug: string; publishedId: string}) => Promise<boolean>>()
  fetch.mockResolvedValue(result)
  const withConfig = vi.fn<(config: {perspective: 'raw'}) => {fetch: typeof fetch}>()
  withConfig.mockReturnValue({fetch})
  const getClient = vi.fn<
    (options: {apiVersion: string}) => {withConfig: typeof withConfig}
  >()
  getClient.mockReturnValue({withConfig})
  return {fetch, withConfig, getClient}
}

describe('isUniquePageSlug', () => {
  it('treats an empty slug as unique before the required check', async () => {
    const getClient = vi.fn<() => void>()

    await expect(
      isUniquePageSlug('', {getClient} as unknown as SlugValidationContext),
    ).resolves.toBe(true)
    expect(getClient).not.toHaveBeenCalled()
  })

  it('rejects another page document with the same slug', async () => {
    const {fetch, withConfig, getClient} = slugClient(false)

    await expect(
      isUniquePageSlug('about', {
        getClient,
        document: {_id: 'drafts.page-1'},
      } as unknown as SlugValidationContext),
    ).resolves.toBe(false)

    expect(getClient).toHaveBeenCalledWith({apiVersion: '2025-02-19'})
    expect(withConfig).toHaveBeenCalledWith({perspective: 'raw'})
    expect(fetch).toHaveBeenCalledWith(
      '!defined(*[_type == "page" && slug.current == $slug && !sanity::versionOf($publishedId)][0]._id)',
      {slug: 'about', publishedId: 'page-1'},
    )
  })

  it('allows the current page, including a version snapshot, to keep its slug', async () => {
    const {fetch, getClient} = slugClient(true)

    await expect(
      isUniquePageSlug('index', {
        getClient,
        document: {_id: 'versions.summer.home'},
      } as unknown as SlugValidationContext),
    ).resolves.toBe(true)

    expect(fetch).toHaveBeenCalledWith(expect.any(String), {
      slug: 'index',
      publishedId: 'home',
    })
  })
})
