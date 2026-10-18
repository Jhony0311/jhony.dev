import {defineField} from 'sanity'

const SEO_SUBJECT = {
  page: {
    url: 'page URL',
    document: 'page',
  },
  post: {
    url: 'Post document URL',
    document: 'Post document',
  },
} as const

export type SeoSubject = keyof typeof SEO_SUBJECT

/**
 * Title shared by the page and post documents.
 * When the SEO title is empty, this title is the fallback.
 */
export function documentTitleField() {
  return defineField({
    name: 'title',
    title: 'Title',
    type: 'string',
    description: 'When the SEO title is empty, this title is the fallback.',
    validation: (rule) => rule.required(),
  })
}

/**
 * SEO object shared by the page and post documents.
 * The subject names that document in the Studio descriptions.
 */
export function seoField(subject: SeoSubject) {
  const labels = SEO_SUBJECT[subject]

  return defineField({
    name: 'seo',
    title: 'SEO',
    type: 'object',
    description: `The canonical URL and the Open Graph URL are the ${labels.url}. The Open Graph title and description reuse the SEO title and description.`,
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
        description: `Hide this ${labels.document} from search engines.`,
        initialValue: false,
      }),
    ],
  })
}
