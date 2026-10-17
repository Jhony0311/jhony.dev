import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'directory',
  title: 'Directory',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      description: 'Compact is the list on the home page. Default is the list on the garden page.',
      options: {
        list: [
          {title: 'Compact', value: 'compact'},
          {title: 'Default', value: 'default'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      type: 'type',
    },
    prepare({type}) {
      const subtitle =
        type === 'compact' ? 'Compact' : type === 'default' ? 'Default' : 'Type not set'
      return {title: 'Directory', subtitle}
    },
  },
})
