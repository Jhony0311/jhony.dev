import {defineArrayMember, defineField, defineType} from 'sanity'

import {isUniquePageSlug} from './pageSlug'

export default defineType({
  name: 'page',
  title: 'Page',
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
      description: 'The slug `index` is the home page. A slug `about` is the path `/about`.',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: isUniquePageSlug,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      description:
        'The canonical URL and the Open Graph URL are the page URL. The Open Graph title and description reuse the SEO title and description.',
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
            rule
              .max(160)
              .warning('SEO descriptions longer than 160 characters may be cut off.'),
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
          description: 'Hide this page from search engines.',
          initialValue: false,
        }),
      ],
    }),
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
