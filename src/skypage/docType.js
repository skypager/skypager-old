import * as markdown from './docTypes/markdown'
import { wrapDocument } from './markdown-utils'

export const profiles = markdown.profiles

export const rules = [/(\.(md|markdown|mkd))$/i]

export const testDoc = doc => rules[0].test(doc.path)

export const interfaceMethods = [
  'getAST',
  'getContent',
  'getMeta',
  'getFrontMatter',
  'getUtils',
  'getWrapper',
  'getTitle',
  'getSubheader',
  'getHeadingNodes',
  'getLeadingParagraphs',
  'getLeadingParagraphNodes',
  'getLastNode',
  'nodeAt',
  'sourceAt',
  'nodeToString',
  'visit',
  'selectNodes',
  'getCodeBlocksLanguageIndex',
  'getHeadingsByDepthIndex',
  'createIndex',
  'findPreviousHeading',
  'findNodesAfter',
  'findNodesBefore',
]

export function findPreviousHeading(ofNode, options = {}) {
  return (
    this.chain
      .invoke('findNodesBefore', ofNode)
      .filter({ type: 'heading' })
      .first()
      .value() || this.titleHeadingNode
  )
}

export function findNodesAfter(node) {
  const { findAllAfter } = this.wrapper.utils
  const nodesAfter = findAllAfter(this.ast, node)
  return nodesAfter
}

export function findNodesBefore(node) {
  const { findAllBefore } = this.wrapper.utils
  const nodesBefore = findAllBefore(this.ast, node)
  return nodesBefore
}

export function getTitle() {
  return this.wrapper.title
}

export function getSubheader() {
  return this.wrapper.subheader
}

export function getHeadingNodes() {
  return this.wrapper.headingNodes
}

export function getLeadingParagraphs() {
  return this.wrapper.leadingParagraphs
}

export function getLeadingParagraphNodes() {
  return this.wrapper.leadingParagraphNodes
}

export function getLastNode() {
  return this.wrapper.lastNode
}

export function nodeAt(...args) {
  return this.wrapper.nodeAt(...args)
}

export function sourceAt(...args) {
  return this.wrapper.sourceAt(...args)
}

export function nodeToString(...args) {
  return this.wrapper.nodeToString(...args)
}

export function selectNodes(...args) {
  return this.wrapper.select(...args)
}

export function visit(...args) {
  return this.wrapper.visit(...args)
}

export function getAST() {
  return this.tryResult('ast', () => toAST.call(this, this.get('attributes.content', '')))
}

export function getWrapper() {
  return wrapDocument(
    {
      id: this.name,
      content: this.content,
      ast: this.ast,
      meta: this.meta,
    },
    this.context
  )
}

export function getFrontMatter() {
  return readFrontmatter(this.ast)
}

export function getMeta(options = {}, context = {}) {
  return {
    ...parseFrontmatter(this.frontMatter, options),
    ...this.tryGet('meta', {}),
  }
}

export function applyTo(doc) {}

export function getContent() {
  return this.get('attributes.content', '')
}

export const toAST = (content, options = {}) => {
  const processor = profiles.standard(options)

  try {
    return processor.parse(content)
  } catch (error) {
    return { ...blankAST, error }
  }
}

export const blankAST = {
  type: 'root',
  children: [],
  position: {
    end: { line: 1, column: 1, offset: 0 },
    start: { line: 1, column: 1, offset: 0 },
  },
}

export function readFrontmatter({ children = [] } = {}) {
  const first = children[0] || {}
  const { type = 'yaml', value = '' } = first

  if (type === 'yaml') {
    return value
  }

  return ''
}

export function parseFrontmatter(content, options = {}) {
  const { type = 'yaml', defaults = {} } = options

  try {
    if (type === 'yaml') {
      return { ...defaults, ...require('js-yaml').safeLoad(content) }
    }

    return { ...(options.defaults || {}) }
  } catch (error) {
    return { message: error.message, content, options }
  }
}

export function createIndex(onNodesOfType, byNodeProperty) {
  return this.wrapper.utils.index(this.ast, onNodesOfType, byNodeProperty)
}

export function getCodeBlocksLanguageIndex() {
  return this.createIndex('code', 'lang')
}

export function getHeadingsByDepthIndex() {
  return this.createIndex('heading', 'depth')
}

export const compile = (content, options = {}) => {
  const { profile = 'standard' } = options
  const ast =
    typeof content === 'object' ? content : toAST(content, { profile: 'standard', method: 'parse' })

  const compiled = profiles[profile](options).stringify(ast)

  return compiled
}

export const getUtils = () => markdown
