import author from './author'
import blockContent from './blockContent'
import category from './category'
import directory from './directory'
import gallery from './gallery'
import page from './page'
import post from './post'
import {postBodyBlocks} from './postBodyBlocks'
import singleAndDoubleColumn from './singleAndDoubleColumn'
import tag from './tag'

export const schemaTypes = [
  post,
  tag,
  author,
  category,
  blockContent,
  page,
  singleAndDoubleColumn,
  directory,
  gallery,
  ...postBodyBlocks,
]
