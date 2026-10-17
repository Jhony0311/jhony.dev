import {isUniqueDocumentSlug} from './uniqueSlug'

/**
 * Reject a second page document with the same slug.
 * Drafts, the published document, and version snapshots of the current page stay allowed.
 */
export const isUniquePageSlug = isUniqueDocumentSlug('page')
