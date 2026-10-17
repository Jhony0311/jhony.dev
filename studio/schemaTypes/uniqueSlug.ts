import {getPublishedId, type SlugIsUniqueValidator} from 'sanity'

const SLUG_API_VERSION = '2025-02-19'

const DOCUMENT_TYPES = ['page', 'post', 'tag'] as const

export type SlugDocumentType = (typeof DOCUMENT_TYPES)[number]

/**
 * Reject a second document of this type with the same slug.
 * Drafts, the published document, and version snapshots of the current document stay allowed.
 */
export function isUniqueDocumentSlug(documentType: SlugDocumentType): SlugIsUniqueValidator {
  return async (slug, context) => {
    if (!slug) return true

    const publishedId = context.document?._id ? getPublishedId(context.document._id) : null
    const client = context
      .getClient({apiVersion: SLUG_API_VERSION})
      .withConfig({perspective: 'raw'})
    const query = publishedId
      ? `!defined(*[_type == "${documentType}" && slug.current == $slug && !sanity::versionOf($publishedId)][0]._id)`
      : `!defined(*[_type == "${documentType}" && slug.current == $slug][0]._id)`
    const params = publishedId ? {slug, publishedId} : {slug}

    return client.fetch(query, params)
  }
}
