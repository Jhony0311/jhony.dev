import {getPublishedId, type SlugIsUniqueValidator} from 'sanity'

const PAGE_SLUG_API_VERSION = '2025-02-19'

/**
 * Reject a second page document with the same slug.
 * Drafts, the published document, and version snapshots of the current page stay allowed.
 */
export const isUniquePageSlug: SlugIsUniqueValidator = async (slug, context) => {
  if (!slug) return true

  const publishedId = context.document?._id ? getPublishedId(context.document._id) : null
  const client = context
    .getClient({apiVersion: PAGE_SLUG_API_VERSION})
    .withConfig({perspective: 'raw'})
  const query = publishedId
    ? `!defined(*[_type == "page" && slug.current == $slug && !sanity::versionOf($publishedId)][0]._id)`
    : `!defined(*[_type == "page" && slug.current == $slug][0]._id)`
  const params = publishedId ? {slug, publishedId} : {slug}

  return client.fetch(query, params)
}
