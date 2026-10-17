import {defineArrayMember, defineField, defineType} from 'sanity'

import {textBlock} from './blockContent'
import {postBodyBlocks} from './postBodyBlocks'
import {isUniqueDocumentSlug} from './uniqueSlug'

export const isUniquePostSlug = isUniqueDocumentSlug('post')

const POST_TYPES = [
  {title: 'Essay', value: 'Essay'},
  {title: 'Note', value: 'Note'},
  {title: 'Snippet', value: 'Snippet'},
] as const

const POST_STAGES = [
  {title: 'Seedling', value: 'Seedling'},
  {title: 'Budding', value: 'Budding'},
  {title: 'Evergreen', value: 'Evergreen'},
] as const

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'When the SEO title is empty, this title is the fallback.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: isUniquePostSlug,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      description: 'The kind of this Post document.',
      options: {
        list: [...POST_TYPES],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'stage',
      title: 'Stage',
      type: 'string',
      description: 'How mature this Post document is.',
      options: {
        list: [...POST_STAGES],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      description: 'The short text for the garden card.',
      rows: 3,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      description: 'References to tag documents. This array may be empty.',
      of: [defineArrayMember({type: 'reference', to: [{type: 'tag'}]})],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      description:
        'The canonical URL and the Open Graph URL are the Post document URL. The Open Graph title and description reuse the SEO title and description.',
      initialValue: {
        noIndex: false,
      },
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (rule) =>
            rule.max(60).warning('SEO titles longer than 60 characters may be cut off.'),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          validation: (rule) =>
            rule.max(160).warning('SEO descriptions longer than 160 characters may be cut off.'),
        }),
        defineField({
          name: 'image',
          title: 'Share image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'noIndex',
          title: 'No index',
          type: 'boolean',
          description: 'Hide this Post document from search engines.',
          initialValue: false,
        }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      description:
        'The content the Post document orders inside the post wrapper. This array may be empty.',
      of: [
        textBlock(),
        ...postBodyBlocks.map((block) => defineArrayMember({type: block.name})),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      stage: 'stage',
    },
    prepare({title, type, stage}) {
      const subtitle = [type, stage].filter(Boolean).join(' · ')
      return {title: title || 'Untitled post', subtitle}
    },
  },
})
