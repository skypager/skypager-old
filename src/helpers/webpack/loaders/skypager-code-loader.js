const loaderUtils = require("loader-utils")

module.exports = function(source) {
  this.cacheable()

  const callback = this.async()

  const args = loaderUtils.parseQuery(this.query)

  const project = this._compiler.compilerHelper.project

  const code = this.query.slice(1)

  const runner = project.createAsyncScriptRunner(code)

  try {
    runner({ query: this.query, args })
      .then(result => callback(null, `module.exports = ${require("util").inspect(result)}`))
      .catch(error => callback(error))
  } catch (error) {
    callback(error)
  }
}
