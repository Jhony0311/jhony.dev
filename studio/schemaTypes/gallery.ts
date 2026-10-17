import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'object',
  description: 'A group of elements in a masonry layout.',
  fields: [
    // Sanity rejects an object type with no fields. This is not a gallery element.
    defineField({
      name: 'schemaPlaceholder',
      type: 'string',
      hidden: true,
      readOnly: true,
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Gallery'}
    },
  },
})
