import {createSchema} from 'sanity'
import {describe, expect, it} from 'vitest'

import {schemaTypes} from './index'

const schema = createSchema({name: 'test', types: schemaTypes})

describe('schema', () => {
  it('registers every document and object in order', () => {
    const names = [
      'post',
      'tag',
      'author',
      'category',
      'blockContent',
      'page',
      'singleAndDoubleColumn',
      'directory',
      'gallery',
      'quotes',
      'imageGrid',
      'imageWithCaption',
      'twitterEmbed',
      'youtubeEmbed',
      'disclaimer',
    ]

    expect(schemaTypes.map((type) => type.name)).toEqual(names)
    expect(names.map((name) => schema.get(name)?.name)).toEqual(names)
  })
})
