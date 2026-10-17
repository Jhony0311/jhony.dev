import {defineField, defineType} from 'sanity'

import {isUniqueDocumentSlug} from './uniqueSlug'

export const isUniqueTagSlug = isUniqueDocumentSlug('tag')

export default defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: isUniqueTagSlug,
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({title, slug}) {
      return {title: title || 'Untitled tag', subtitle: slug || 'Slug not set'}
    },
  },
})
