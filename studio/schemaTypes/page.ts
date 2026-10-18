import {defineArrayMember, defineField, defineType} from 'sanity'

import {documentTitleField, seoField} from './seoField'
import {isUniqueDocumentSlug} from './uniqueSlug'

export const isUniquePageSlug = isUniqueDocumentSlug('page')

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    documentTitleField(),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'The slug `index` is the home page. A slug `about` is the path `/about`.',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: isUniquePageSlug,
      },
      validation: (rule) => rule.required(),
    }),
    seoField('page'),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      description: 'The ordered components inside the page wrapper. This array may be empty.',
      of: [
        defineArrayMember({type: 'singleAndDoubleColumn'}),
        defineArrayMember({type: 'directory'}),
        defineArrayMember({type: 'gallery'}),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({title, slug}) {
      const subtitle = slug === 'index' ? '/ (home)' : slug ? `/${slug}` : 'Slug not set'
      return {title: title || 'Untitled page', subtitle}
    },
  },
})
