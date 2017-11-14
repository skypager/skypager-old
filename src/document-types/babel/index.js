import { transform } from 'babel-core'
import pick from 'lodash/pick'
import traverseBabelAst from 'babel-traverse'
import * as babelTypeHelpers from 'babel-types'
import generate from 'babel-generator'
import template from 'babel-template'

export const rules = [/\.(js|es6|jsx|mjs)$/]

export const createAst = (code = '', options = {}) => transform(code, babelOptions(options)).ast

export const createAST = createAst

export const toAST = createAst

export const testDoc = doc => rules[0].test(doc.path)

export const compile = (code = '', options = {}) => transform(code, babelOptions(options))

export function traverse(options = {}) {
  const { ast } = this.attributes
  return traverseBabelAst(ast, options)
}

export const interfaceMethods = [
  'getAST',
  'traverse',
  'getBabelTypes',
  'getTemplate',
  'getGenerate',
]

export const getBabelTypes = () => babelTypeHelpers
export const getGenerate = () => generate
export const getTemplate = () => template

export function getAST() {
  return toAST.call(this, this.get('attributes.content', ''))
}

export const validBabelOptions = [
  'filename',
  'filenameRelative',
  'presets',
  'plugins',
  'parserOpts',
  'generatorOpts',
  'highlightCode',
  'only',
  'ignore',
  'auxiliaryCommentBefore',
  'auxiliaryCommentAfter',
  'sourceMaps',
  'inputSourceMap',
  'sourceMapTarget',
  'sourceFileName',
  'sourceRoot',
  'moduleRoot',
  'moduleIds',
  'moduleId',
  'getModuleId',
  'resolveModuleSource',
  'code',
  'no-babelrc',
  'ast',
  'compact',
  'minified',
  'comments',
  'shouldPrintComment',
  'env',
  'retainLines',
  'extends',
]

export const babelOptions = (options = {}) => {
  return pick(require('./babel-rc.js')(options), validBabelOptions)
}
