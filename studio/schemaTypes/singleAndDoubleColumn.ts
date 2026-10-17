import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'singleAndDoubleColumn',
  title: 'Single and Double Column',
  type: 'object',
  fields: [
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'string',
      description: 'One column or two.',
      options: {
        list: [
          {title: 'One', value: 'one'},
          {title: 'Two', value: 'two'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      columns: 'columns',
    },
    prepare({columns}) {
      const subtitle =
        columns === 'one' ? 'One column' : columns === 'two' ? 'Two columns' : 'Columns not set'
      return {title: 'Single and Double Column', subtitle}
    },
  },
})
