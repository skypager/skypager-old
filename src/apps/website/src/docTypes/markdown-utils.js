import filter from 'unist-util-filter'
import findAfter from 'unist-util-find-after'
import findAllAfter from 'unist-util-find-all-after'
import findAllBefore from 'unist-util-find-all-before'
import index from 'unist-util-index'
import map from 'unist-util-map'
import parents from 'unist-util-parents'
import position from 'unist-util-position'
import removePosition from 'unist-util-remove-position'
import select from 'unist-util-select'
import source from 'unist-util-source'
import visit from 'unist-util-visit'
import toString from 'mdast-util-to-string'
import headingRange from 'mdast-util-heading-range'
import inject from 'mdast-util-inject'

export {
  filter,
  findAfter,
  findAllAfter,
  findAllBefore,
  index,
  map,
  parents,
  position,
  removePosition,
  select,
  source,
  visit,
  toString,
  headingRange,
  inject,
}

export const blankAST = {
  type: 'root',
  children: [],
  position: {
    end: { line: 1, column: 1, offset: 0 },
    start: { line: 1, column: 1, offset: 0 },
  },
}

export class DocumentWrapper {
  static utils = {
    filter,
    findAfter,
    findAllAfter,
    findAllBefore,
    index,
    map,
    parents,
    position,
    removePosition,
    select,
    source,
    visit,
    toString,
    headingRange,
    inject,
  }

  constructor({ id, ast = blankAST, content = '', meta = {} } = {}, context = {}) {
    Object.defineProperty(this, 'ast', { get: () => ast })
    Object.defineProperty(this, 'id', { get: () => id })
    Object.defineProperty(this, 'content', { get: () => content })
    Object.defineProperty(this, 'meta', { get: () => meta })
    Object.defineProperty(this, 'context', { get: () => context, enumerable: false })
    Object.defineProperty(this, 'utils', { get: () => DocumentWrapper.utils })
  }

  get docId() {
    return this.id.replace(/docs\//, '').replace(/\.md$/, '')
  }

  get assetsAvailable() {
    return this.runtime.assets.available.indexOf(`${this.docId}/index`) >= 0
  }

  get assets() {
    return this.assetsAvailable && this.runtime.assets.lookup(`${this.docId}/index`)
  }

  hasAsset(assetId) {
    return this.assetsAvailable && this.assets.available.indexOf(assetId) >= 0
  }

  assetURL(assetId) {
    return this.hasAsset(assetId) && this.assets.lookup(assetId)
  }

  get runtime() {
    return this.context && this.context.runtime
  }

  get children() {
    const { get } = this.runtime.lodash
    return get(this, 'ast.children', [])
  }

  get title() {
    if (this.meta.title) {
      return this.meta.title
    }

    const baseTitle = this.headingNodes.length
      ? this.nodeToString(this.headingNodes[0])
      : this.id
          .split('/')
          .pop()
          .replace(/\.md$/, '')
          .replace(/\-/g, ' ')

    return baseTitle.match(':') ? `${baseTitle.split(':')[0] || ''}`.trim() : baseTitle
  }

  get subheader() {
    if (this.meta.title) {
      return this.meta.title
    }

    const baseTitle = this.headingNodes.length
      ? this.nodeToString(this.headingNodes[0])
      : this.id
          .split('/')
          .pop()
          .replace(/\.md$/, '')
          .replace(/\-/g, ' ')

    return baseTitle.match(':')
      ? `${baseTitle
          .split(':')
          .slice(1)
          .join(' ') || ''}`.trim()
      : ''
  }

  get headingNodes() {
    return this.select('heading')
  }

  get leadingParagraphs() {
    return this.leadingParagraphNodes.map(paragraph => this.nodeToString(paragraph)).join('\n')
  }

  get leadingParagraphNodes() {
    const before = this.headingNodes[1] || this.lastNode

    const paragraphs =
      before && before.position
        ? this.select('paragraph').filter(
            ({ position } = {}) => position.end.line <= before.position.end.line
          )
        : this.children.filter(node => node.type === 'paragraph')

    return paragraphs.slice(0, 2)
  }

  get lastNode() {
    return this.children[this.children.length - 1]
  }

  nodeAt(index) {
    return this.ast.children[index]
  }

  sourceAt(index) {
    const node = typeof index === 'object' ? index : this.nodeAt(index)
    return source(node, this.content)
  }

  nodeToString(index) {
    const node = typeof index === 'object' ? index : this.nodeAt(index)
    return toString(node)
  }

  visit(...args) {
    return visit(this.ast, ...args)
  }

  select(...args) {
    return select(this.ast, ...args)
  }
}

export function wrapDocument({ id, ast, content, meta } = {}) {
  return new DocumentWrapper({ id, ast, content, meta }, { runtime: global.runtime })
}
