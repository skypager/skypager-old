const loaderUtils = require("loader-utils")

//const pick = require('lodash/pick')
//const defaults = require('lodash/defaults')

module.exports = function(source) {
  const callback = this.async()
  const _compiler = this._compiler
  const project = _compiler && _compiler.project

  try {
    //const compiler = this._compiler
    const query = loaderUtils.parseQuery(this.query)
    const webpackRemainingChain = loaderUtils.getRemainingRequest(this).split("!")
    const filename = webpackRemainingChain[webpackRemainingChain.length - 1]
    const doc = project.documents.find(doc => doc.path === filename)

    if (!doc) {
      callback(new Error(`Could not find doc with ${filename}: ${this.query}`))
      return
    }

    const data = doc.ready.createExportable()

    callback(
      null,
      `
    const api = require('skypager-util/lib/entity').default
    const data = ${JSON.stringify(data, null, 2)}

    module.exports = api(data)
    `,
    )
  } catch (error) {
    callback(error)
  }
}
