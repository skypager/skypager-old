import { transform } from "babel-core"
import pick from "lodash/pick"

/*
import docblock from 'docblock-parser'

export const docblockParser = docblock({
  tags: {
    name: docblock.singleParameterTag
  }
})
*/

export const rules = [/\.(js|es6|jsx|mjs)$/]

export const createAst = (code = "", options = {}) => transform(code, babelOptions(options)).ast

export const createAST = createAst

export const toAST = createAst

export const compile = (code = "", options = {}) => transform(code, babelOptions(options))

export const validBabelOptions = [
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
  "extends"
]

export const babelOptions = (options = {}) =>
  pick(
    {
      presets: [require.resolve("babel-preset-skypager")],
      ...options
    },
    validBabelOptions
  )
