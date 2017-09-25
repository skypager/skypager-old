const loaderUtils = require("loader-utils")

//const pick = require('lodash/pick')
//const defaults = require('lodash/defaults')

module.exports = function(source) {
  //this.cacheable()

  const callback = this.async()
  const _compiler = this._compiler
  const project = _compiler && _compiler.project

  try {
    //const compiler = this._compiler
    const query = loaderUtils.parseQuery(this.query)

    switch (query.method) {
      case "select":
        const data = project.select(query.select)

        if (typeof data === "object" && typeof data.then === "function") {
          project
            .resolvePromiseHash(data)
            .then(result => {
              callback(null, `module.exports = ${JSON.stringify(result || {}, null, 2)}`)
            })
            .catch(error => callback(error))
        } else {
          callback(null, `module.exports = ${JSON.stringify(data || {}, null, 2)}`)
        }

        break
      case "run":
        project
          .createAsyncScriptRunner(query.code)({ query })
          .then(result => callback(null, `module.exports = ${JSON.stringify(result || {}, null, 2)}`))
          .catch(error => callback(error))

        break
      default:
        callback(null, `module.exports = Skypager.load('${project.realCwd}')`)
    }
  } catch (error) {
    callback(error)
  }
}
