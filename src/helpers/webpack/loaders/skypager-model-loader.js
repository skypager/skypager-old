const loaderUtils = require("loader-utils")
const { dirname } = require("path")

module.exports = function(source) {
  this.cacheable()
  const callback = this.async()
  let args = loaderUtils.parseQuery(this.query)
  const project = this._compiler.compilerHelper.project

  args = {
    origin: this.resourcePath,
    pattern: "*.js",
    base: "",
    ...args,
  }

  args.stringify = true
  callback(null, project.select("require-context", args))
}
