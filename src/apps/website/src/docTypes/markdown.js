import remark from 'remark'
import remarkHtml from 'remark-html'
import slug from 'remark-slug'
import squeeze from 'remark-squeeze-paragraphs'
import stringify from 'remark-stringify'
import normalize from 'remark-normalize-headings'
import parse from 'remark-parse'
import frontMatter from 'remark-frontmatter'
import remarkReact from 'remark-react'

export const standard = (options = {}) =>
  remark()
    .use(frontMatter, ['yaml'])
    .use(remarkReact, options)
    .use(normalize)
    .use(squeeze)
    .use(slug)

export const parser = (options = {}) => standard(options).use(parse)

export const html = (options = {}) => standard(options).use(remarkHtml)

export const stringifier = (options = {}) => standard(options).use(stringify)

export const profiles = {
  parser,
  standard,
  html,
  stringifier,
}

export const utilLoaders = () => {
  return {
    filter: () => require('unist-util-filter'),
    findAfter: () => require('unist-util-find-after'),
    findAllAfter: () => require('unist-util-find-all-after'),
    findAllBefore: () => require('unist-util-find-all-before'),
    index: () => require('unist-util-index'),
    map: () => require('unist-util-map'),
    parents: () => require('unist-util-parents'),
    position: () => require('unist-util-position'),
    removePosition: () => require('unist-util-remove-position'),
    select: () => require('unist-util-select'),
    source: () => require('unist-util-source'),
    visit: () => require('unist-util-visit'),
    reporter: () => require('vfile-reporter'),
    docblockParser: () => require('docblock-parser'),
    toString: () => require('mdast-util-to-string'),
    headingRange: () => require('mdast-util-heading-range'),
    inject: () => require('mdast-util-inject'),
  }
}
