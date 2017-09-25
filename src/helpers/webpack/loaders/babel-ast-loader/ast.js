/* eslint-disable */
"use strict"

var assign = require("object-assign")
var babel = require("babel-core")
var pick = require("lodash/pick")
var loaderUtils = require("loader-utils")
var cache = require("./fs-cache.js")
var exists = require("./helpers/exists")()
var read = require("./helpers/read")()
var resolveRc = require("./resolve-rc.js")
var path = require("path")
var mkdirp = require("mkdirp")
var cloneDeep = require("babel-types").cloneDeep

var transpile = function(source, options) {
  var result = babel.transform(source, options)

  var code = result.code
  var map = result.map

  if (map && (!map.sourcesContent || !map.sourcesContent.length)) {
    map.sourcesContent = [source]
  }

  return {
    code: code,
    map: map,
    ast: cloneDeep(result.ast),
    metadata: cloneDeep(result.metadata),
  }
}

module.exports = function(source, inputSourceMap) {
  var result = {}

  var compiler = this._compiler
  var project = compiler.project

  // Handle filenames (#106)
  var webpackRemainingChain = loaderUtils.getRemainingRequest(this).split("!")
  var filename = webpackRemainingChain[webpackRemainingChain.length - 1]

  // Handle options
  var globalOptions = this.options.babel || {}
  var loaderOptions = loaderUtils.parseQuery(this.query)
  var userOptions = assign({}, globalOptions, loaderOptions)
  var defaultOptions = {
    inputSourceMap: inputSourceMap,
    sourceRoot: compiler.options.context,
    filename: filename,
    cacheIdentifier: JSON.stringify({
      "babel-loader": "5.6.0",
      "babel-core": babel.version,
      env: process.env.BABEL_ENV || process.env.NODE_ENV,
      babelrc: exists(userOptions.babelrc) ? read(userOptions.babelrc) : resolveRc(process.cwd()),
    }),
  }

  var options = assign({}, defaultOptions, userOptions)

  if (userOptions.sourceMap === undefined) {
    options.sourceMap = this.sourceMap
  }

  if (options.sourceFileName === undefined) {
    options.sourceFileName = path.relative(options.sourceRoot, options.filename)
  }

  var cacheDirectory = options.cacheDirectory
  var cacheIdentifier = options.cacheIdentifier
  var cacheAst = loaderOptions.cacheAst

  delete options.cacheDirectory
  delete options.cacheAst
  delete options.cacheIdentifier
  delete options.query
  delete options.meta

  result = transpile(
    source,
    pick(
      options,
      "filename",
      "filenameRelative",
      "presets",
      "plugins",
      "parserOpts",
      "generatorOpts",
      "highlightCode",
      "only",
      "ignore",
      "auxiliaryCommentBefore",
      "auxiliaryCommentAfter",
      "sourceMaps",
      "inputSourceMap",
      "sourceMapTarget",
      "sourceFileName",
      "sourceRoot",
      "moduleRoot",
      "moduleIds",
      "moduleId",
      "getModuleId",
      "resolveModuleSource",
      "code",
      "no-babelrc",
      "ast",
      "compact",
      "minified",
      "comments",
      "shouldPrintComment",
      "env",
      "retainLines",
      "extends",
    ),
  )

  return {
    path: this.resourcePath,
    ast: result.ast,
    meta: result.metadata,
  }
}
