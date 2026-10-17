import {defineField, defineType} from 'sanity'

const POST_BODY_BLOCK_LABELS = [
  ['quotes', 'Quotes'],
  ['imageGrid', 'Image Grid'],
  ['imageWithCaption', 'Image with Caption'],
  ['twitterEmbed', 'Twitter Embeds'],
  ['youtubeEmbed', 'Youtube Embeds'],
  ['disclaimer', 'Disclaimers'],
] as const

function placeholderBlock(name: string, title: string) {
  return defineType({
    name,
    title,
    type: 'object',
    fields: [
      // Sanity rejects an object type with no fields. This is not a content field.
      defineField({
        name: 'schemaPlaceholder',
        type: 'string',
        hidden: true,
        readOnly: true,
      }),
    ],
    preview: {
      prepare() {
        return {title}
      },
    },
  })
}

export const postBodyBlocks = POST_BODY_BLOCK_LABELS.map(([name, title]) =>
  placeholderBlock(name, title),
)
