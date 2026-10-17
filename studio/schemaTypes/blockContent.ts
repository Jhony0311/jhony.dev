import {defineType, defineArrayMember} from 'sanity'

/**
 * Text styles for rich text. The Post document body reuses this block.
 */
export function textBlock() {
  return defineArrayMember({
    title: 'Block',
    type: 'block',
    styles: [
      {title: 'Normal', value: 'normal'},
      {title: 'H1', value: 'h1'},
      {title: 'H2', value: 'h2'},
      {title: 'H3', value: 'h3'},
      {title: 'H4', value: 'h4'},
      {title: 'Quote', value: 'blockquote'},
    ],
    lists: [{title: 'Bullet', value: 'bullet'}],
    marks: {
      decorators: [
        {title: 'Strong', value: 'strong'},
        {title: 'Emphasis', value: 'em'},
      ],
      annotations: [
        {
          title: 'URL',
          name: 'link',
          type: 'object',
          fields: [
            {
              title: 'URL',
              name: 'href',
              type: 'url',
            },
          ],
        },
      ],
    },
  })
}

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [textBlock()],
})
