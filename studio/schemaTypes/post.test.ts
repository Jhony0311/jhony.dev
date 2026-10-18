import {
  createSchema,
  ConcreteRuleClass,
  type ArraySchemaType,
  type ObjectSchemaType,
  type ReferenceSchemaType,
  type SchemaType,
  type SlugValidationContext,
  type ValidationMarker,
} from 'sanity'
import {describe, expect, it, vi} from 'vitest'

import {schemaTypes} from './index'
import {postBodyBlocks} from './postBodyBlocks'
import post, {isUniquePostSlug} from './post'
import {isUniqueTagSlug} from './tag'

const schema = createSchema({name: 'test', types: schemaTypes})

const POST_FIELDS = ['title', 'slug', 'type', 'stage', 'summary', 'tags', 'seo', 'body']
const STARTER_FIELDS = ['author', 'mainImage', 'categories', 'publishedAt']
const BLOCK_LABELS = [
  'Quotes',
  'Image Grid',
  'Image with Caption',
  'Twitter Embeds',
  'Youtube Embeds',
  'Disclaimers',
]

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

function asReference(type: SchemaType | undefined): ReferenceSchemaType {
  if (type?.jsonType !== 'object' || type.name !== 'reference') {
    throw new Error(`Expected a reference type, received ${type?.name ?? 'nothing'}`)
  }
  return type as ReferenceSchemaType
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

describe('post schema', () => {
  it('registers the Post document fields and the tag document', () => {
    expect(post.fields?.map((item) => item.name)).toEqual(POST_FIELDS)
    expect(asObject(schema.get('post')).fields.map((item) => item.name)).toEqual(POST_FIELDS)
    expect(schema.get('tag')?.name).toBe('tag')
    expect(schema.get('author')?.name).toBe('author')
    expect(schema.get('category')?.name).toBe('category')
  })

  it('registers the Post document fields and keeps author and category', () => {
    expect(asObject(schema.get('post')).fields.map((item) => item.name)).toEqual(POST_FIELDS)
    expect(schemaTypes.find((item) => item.name === 'author')?.type).toBe('document')
    expect(schemaTypes.find((item) => item.name === 'category')?.type).toBe('document')
    const names = asObject(schema.get('post')).fields.map((item) => item.name)
    for (const name of [...STARTER_FIELDS, 'createdAt', 'updatedAt']) {
      expect(names).not.toContain(name)
    }
  })

  it('requires a title, slug, type, and stage', async () => {
    const title = await markersFor(definitionField('post', 'title').validation, undefined)
    const type = await markersFor(definitionField('post', 'type').validation, undefined)
    const stage = await markersFor(definitionField('post', 'stage').validation, undefined)
    const slugMissing = await markersFor(definitionField('post', 'slug').validation, undefined)
    const slug = definitionField('post', 'slug')

    expect(title.some((marker) => marker.level === 'error')).toBe(true)
    expect(type.some((marker) => marker.level === 'error')).toBe(true)
    expect(stage.some((marker) => marker.level === 'error')).toBe(true)
    expect(slugMissing.some((marker) => marker.level === 'error')).toBe(true)
    expect(slug.validation).toBeTypeOf('function')
    expect(field('post', 'slug').type.options?.isUnique).toBe(isUniquePostSlug)
    expect(field('post', 'slug').type.options?.source).toBe('title')
    expect(field('post', 'slug').type.options?.maxLength).toBe(96)
    expect(field('post', 'slug').type.description).toBeUndefined()
  })

  it('closes type and stage on the Post document values', () => {
    expect(field('post', 'type').type.options?.list).toEqual([
      {title: 'Essay', value: 'Essay'},
      {title: 'Note', value: 'Note'},
      {title: 'Snippet', value: 'Snippet'},
    ])
    expect(field('post', 'stage').type.options?.list).toEqual([
      {title: 'Seedling', value: 'Seedling'},
      {title: 'Budding', value: 'Budding'},
      {title: 'Evergreen', value: 'Evergreen'},
    ])
  })

  it('keeps summary optional and references tag documents', () => {
    expect(definitionField('post', 'summary').validation).toBeUndefined()
    expect(field('post', 'summary').type.name).toBe('text')

    const tags = asArray(field('post', 'tags').type)
    expect(definitionField('post', 'tags').validation).toBeUndefined()
    expect(asReference(tags.of[0]).to.map((item) => item.name)).toEqual(['tag'])
  })

  it('copies the page SEO object onto the Post document', () => {
    const seo = asObject(field('post', 'seo').type)
    const names = seo.fields.map((item) => item.name)

    expect(names).toEqual(['title', 'description', 'image', 'noIndex'])
    expect(seo.initialValue).toEqual({noIndex: false})
    expect(seo.description).toContain('Post document URL')

    const noIndex = seo.fields.find((item) => item.name === 'noIndex')
    expect(noIndex?.type.name).toBe('boolean')
    expect(noIndex?.type.initialValue).toBe(false)
    expect(noIndex?.type.description).toContain('Post document')

    const image = seo.fields.find((item) => item.name === 'image')
    expect(image?.type.title).toBe('Share image')
    expect(asObject(image?.type).options?.hotspot).toBe(true)
  })

  it('warns on long SEO text and still accepts it', async () => {
    const seo = definitionField('post', 'seo')
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

  it('orders text and the six label blocks, and allows an empty body', () => {
    const defined = definitionField('post', 'body')
    if (!('of' in defined) || !defined.of) throw new Error('Expected body members')
    const text = defined.of[0]
    if (!text || !('styles' in text) || !('marks' in text)) {
      throw new Error('Expected the body text block')
    }

    const body = asArray(field('post', 'body').type)
    const compiled = body.of[0]
    if (!compiled || !('fields' in compiled) || !compiled.fields) {
      throw new Error('Expected the compiled body text block')
    }
    const style = compiled.fields.find((item) => item.name === 'style')
    const listItem = compiled.fields.find((item) => item.name === 'listItem')

    expect(defined.validation).toBeUndefined()
    expect(body.of.map((member) => member.name)).toEqual([
      'block',
      ...postBodyBlocks.map((block) => block.name),
    ])
    expect(body.of.map((member) => member.title)).toEqual(['Block', ...BLOCK_LABELS])
    expect(style?.type.options?.list).toEqual(text.styles)
    expect(listItem?.type.options?.list).toEqual(text.lists)
    expect(text.marks?.decorators?.map((decorator) => decorator.title)).toEqual(['Strong', 'Emphasis'])
    expect(text.marks?.annotations?.map((annotation) => annotation.name)).toEqual(['link'])
    expect(body.of.map((member) => member.name)).not.toContain('image')
    expect(body.of.map((member) => member.name)).not.toContain('singleAndDoubleColumn')
    expect(asArray(schema.get('blockContent')).of.map((member) => member.name)).toEqual(['block'])
  })

  it('gives each label block only the hidden placeholder field', () => {
    expect(schema._validation ?? []).toEqual([])

    for (const block of postBodyBlocks) {
      expect(BLOCK_LABELS).toContain(block.title)
      expect(block.fields?.map((item) => item.name)).toEqual(['schemaPlaceholder'])
      expect(block.fields?.[0]?.hidden).toBe(true)
      expect(block.fields?.[0]?.readOnly).toBe(true)
      expect(asObject(schema.get(block.name)).fields.map((item) => item.name)).toEqual([
        'schemaPlaceholder',
      ])
    }
  })
})

describe('tag schema', () => {
  it('requires a title and a slug built from the title', () => {
    expect(asObject(schema.get('tag')).fields.map((item) => item.name)).toEqual(['title', 'slug'])
    expect(definitionField('tag', 'title').validation).toBeTypeOf('function')
    expect(definitionField('tag', 'slug').validation).toBeTypeOf('function')

    const slug = field('tag', 'slug')
    expect(slug.type.options?.source).toBe('title')
    expect(slug.type.options?.maxLength).toBe(96)
    expect(slug.type.options?.isUnique).toBe(isUniqueTagSlug)
    expect(slug.type.description).toBeUndefined()
  })
})

function slugClient(result: boolean) {
  const fetch = vi.fn<(query: string, params: {slug: string; publishedId?: string}) => Promise<boolean>>()
  fetch.mockResolvedValue(result)
  const withConfig = vi.fn<(config: {perspective: 'raw'}) => {fetch: typeof fetch}>()
  withConfig.mockReturnValue({fetch})
  const getClient = vi.fn<(options: {apiVersion: string}) => {withConfig: typeof withConfig}>()
  getClient.mockReturnValue({withConfig})
  return {fetch, withConfig, getClient}
}

describe('post and tag slug checks', () => {
  it.each([
    ['post', isUniquePostSlug],
    ['tag', isUniqueTagSlug],
  ] as const)('treats an empty %s slug as unique before the required check', async (_type, isUnique) => {
    const getClient = vi.fn<() => void>()

    await expect(isUnique('', {getClient} as unknown as SlugValidationContext)).resolves.toBe(true)
    expect(getClient).not.toHaveBeenCalled()
  })

  it.each([
    ['post', isUniquePostSlug],
    ['tag', isUniqueTagSlug],
  ] as const)('rejects another %s document with the same slug', async (documentType, isUnique) => {
    const {fetch, withConfig, getClient} = slugClient(false)

    await expect(
      isUnique('shared', {
        getClient,
        document: {_id: 'drafts.doc-1'},
      } as unknown as SlugValidationContext),
    ).resolves.toBe(false)

    expect(getClient).toHaveBeenCalledWith({apiVersion: '2025-02-19'})
    expect(withConfig).toHaveBeenCalledWith({perspective: 'raw'})
    expect(fetch).toHaveBeenCalledWith(
      `!defined(*[_type == "${documentType}" && slug.current == $slug && !sanity::versionOf($publishedId)][0]._id)`,
      {slug: 'shared', publishedId: 'doc-1'},
    )
  })

  it.each([
    ['post', isUniquePostSlug],
    ['tag', isUniqueTagSlug],
  ] as const)('allows the current %s document to keep its slug', async (documentType, isUnique) => {
    const {fetch, getClient} = slugClient(true)

    await expect(
      isUnique('shared', {
        getClient,
        document: {_id: `versions.summer.${documentType}-1`},
      } as unknown as SlugValidationContext),
    ).resolves.toBe(true)

    expect(fetch).toHaveBeenCalledWith(expect.any(String), {
      slug: 'shared',
      publishedId: `${documentType}-1`,
    })
  })
})
