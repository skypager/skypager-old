import loaderUtils from "loader-utils"
import { parser } from "skypager-project/lib/document-utils"
import yaml from "js-yaml"
import pick from "lodash/pick"

export default function(source, inputSourceMap) {
  const webpackRemainingChain = loaderUtils.getRemainingRequest(this).split("!")
  const filename = webpackRemainingChain[webpackRemainingChain.length - 1]
  const compiler = this._compiler
  const project = compiler.project

  this.cacheable()
  const callback = this.async()
  const query = loaderUtils.parseQuery(this.query)

  const handler = query.receive && typeof project.get(query.receive) === "function"
    ? obj => project.invoke(query.receive, obj)
    : obj => (query.pick ? pick(obj, query.pick.split(",")) : obj)

  const receive = obj => {
    const r = handler(obj)

    return r
  }

  try {
    if (filename.endsWith("js")) {
      callback(
        null,
        JSON.stringify(
          receive({
            ...require("./babel-ast-loader/ast").call(this, source, inputSourceMap),
            path: filename,
            query,
          }),
        ),
      )
    } else if (filename.endsWith("md")) {
      const ast = parser().parse(source)
      const first = (ast.children && ast.children[0]) || {}

      callback(
        null,
        JSON.stringify(
          receive({
            ast,
            meta: first.type && first.type === "yaml" ? yaml.safeLoad(first.value) : {},
            path: filename,
            query,
          }),
        ),
      )
    }
  } catch (error) {
    callback(error)
  }
}
