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
  'findNextHeading',
  'nextHeading',
  'findPreviousHeading',
  'previousHeading',
  'findNodeAfter',
  'findNodesAfter',
  'findNodesAfterUntil',
  'findNodesBefore',
  'findNodesBeforeUntil',
  'findNodesBetween',
  'wrapNode',
  'wrapNodes',
  'getTitleHeadingNode',
  'getNodes',
  'getSlug',
  'indexNodes',
  'addRenderers',
  'toReact',
]

export function addRenderers(options = {}) {
  const { react = options } = options
  const { runtime } = this
  const { isFunction, isString } = this.lodash
  const { render, renderToString, renderToStaticMarkup } = react
  let { el } = react

  if (runtime.isBrowser && render) {
    if (isString(el)) {
      el = document.getElementById(el)
    } else if (!el) {
      el = document.getElementById(options.renderTo || options.id || 'app')
    }

    this.getter('render', () => o => render(this.toReact(o), el))
  }

  if (isFunction(renderToString)) {
    this.getter('renderToString', () => o => renderToString(this.toReact(o)))
  }

  if (isFunction(renderToStaticMarkup)) {
    this.getter('renderToStaticMarkup', () => o => renderToStaticMarkup(this.toReact(o)))
  }

  if (!render && options.markup && isFunction(renderToStaticMarkup)) {
    this.getter('render', () => o => renderToStaticMarkup(this.toReact(o)))
  } else if (!render && isFunction(renderToString)) {
    this.getter('render', () => o => renderToString(this.toReact(o)))
  }
}

export function toReact(options = {}) {
  const doc = this
  options.restore !== false && doc.nodes.forEach(node => node.restore && node.restore())
  return this.docType.provider.compile(doc.ast, options)
}

export function indexNodes(options = {}) {
  const { indexes = {} } = options
  const { castArray, mapValues } = this.lodash

  if (!this.indexes) {
    this.hide('indexes', {})
  }

  mapValues(indexes, (args, name) => {
    this.indexes[name] = this.createIndex(...castArray(args))
  })

  const { nodes = this.nodes } = options

  return nodes.map((node, index) => {
    node.index = index
    return node
  })
}

export function getSlug(node) {
  const { kebabCase } = this.runtime.stringUtils
  if (node && node.type && (node.position || node.children)) {
    return kebabCase(this.nodeToString(node))
  } else {
    return kebabCase(this.title)
  }
}

export function getNodes() {
  return this.get('ast.children', [])
}

export function wrapNodes(options = {}) {
  const wrapped = this.nodes.map((node, index) => {
    node.index = index
    return this.wrapNode(node, options)
  })

  return options.indexes ? this.indexNodes({ nodes: wrapped, ...options }) : wrapped
}

export function wrapNode(node, options) {
  const { omitBy, mapValues } = this.lodash

  const wrapper = mapValues(
    {
      findAfter: findNodeAfter,
      findAllAfter: findNodesAfter,
      findPreviousHeading,
      findNextHeading,
      nextHeading,
      previousHeading,
      findBefore: findNodesBefore,
      findAfterUntil: findNodesAfterUntil,
      findBeforeUntil: findNodesBeforeUntil,
      viewSource: sourceAt,
      toString: nodeToString,
      getSlug,
      restore: () => (this.nodes[node.index] = omitBy(node, v => typeof v === 'function')),
    },
    fn => fn.bind(this, node)
  )

  const wrapped = options.clone
    ? Object.assign({}, node, omitBy(wrapper, (fn, key) => node[key]))
    : Object.assign(node, omitBy(wrapper, (fn, key) => node[key]))

  return wrapped
}

export const previousHeading = findPreviousHeading
export const nextHeading = findNextHeading

export function findParentHeading(ofNode, options = {}) {
  if (ofNode.type !== 'heading') {
    return this.findPreviousHeading(ofNode, options)
  }

  return this.invoke('findPreviousHeading', ofNode, {
    maxDepth: ofNode.depth,
  })
}

export function findPreviousHeading(ofNode, options = {}) {
  const { depth, maxDepth, minDepth } = options

  return (
    this.chain
      .invoke('findNodesBefore', ofNode, 'heading')
      .filter(node => {
        if (depth && node.depth !== depth) {
          return false
        }
        if (maxDepth && node.depth >= maxDepth) {
          return false
        } else if (minDepth && node.depth <= minDepth) {
          return false
        }

        return true
      })
      .first()
      .value() || this.titleHeadingNode
  )
}

export function findNextHeading(ofNode, options = {}) {
  const { depth, maxDepth, minDepth } = options

  return this.chain
    .invoke('findNodesAfter', ofNode, 'heading')
    .filter(node => {
      if (depth && node.depth !== depth) {
        return false
      }
      if (maxDepth && node.depth >= maxDepth) {
        return false
      } else if (minDepth && node.depth <= minDepth) {
        return false
      }

      return true
    })
    .first()
    .value()
}

export function findNodeAfter(node, ...args) {
  const { findAfter } = this.wrapper.utils
  const found = findAfter(this.ast, node, ...args)
  return found
}

export function findNodesAfterUntil(...args) {
  return {
    until: predicate =>
      this.chain
        .invoke('findNodesAfter', ...args)
        .takeWhile(predicate)
        .value(),
  }
}

export function findNodesBeforeUntil(...args) {
  return {
    until: predicate =>
      this.chain
        .invoke('findNodesBefore', ...args)
        .takeWhile(predicate)
        .value(),
  }
}

export function findNodesAfter(node, ...args) {
  const { findAllAfter } = this.wrapper.utils
  const nodesAfter = findAllAfter(this.ast, node, ...args)
  return nodesAfter
}

export function findNodesBefore(node, ...args) {
  const { findAllBefore } = this.wrapper.utils
  const nodesBefore = findAllBefore(this.ast, node, ...args)
  return nodesBefore
}

export function findNodesBetween(start, end, ...args) {
  const { findAllBetween } = this.wrapper.utils
  const nodesBetween = findAllBetween(this.ast, start, end, ...args)
  return nodesBetween
}

export function getTitle() {
  return this.wrapper.title
}

export function getTitleHeadingNode() {
  return (
    this.headingNodes[0] || {
      type: 'heading',
      depth: 1,
      children: [
        {
          type: 'text',
          value: this.title,
          position: {
            start: { line: 1, column: 3, offset: 2 },
            end: { line: 1, column: 11, offset: 10 },
            indent: [],
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 1, column: 11, offset: 10 },
        indent: [],
      },
    }
  )
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
