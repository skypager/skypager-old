const loaderUtils = require("loader-utils")
const { dirname } = require("path")

module.exports = function(source) {
  this.cacheable()
  const callback = this.async()
  const args = loaderUtils.parseQuery(this.query)
  const project = this._compiler.compilerHelper.project

  const { cwd = dirname(this.resourcePath), recursive = !args.shallow, pattern = "*.js", chunked = false } = args

  const relativeCwd = project.relative(cwd)

  callback(
    null,
    chunked ? withCodeSplitting(cwd, recursive, pattern, relativeCwd) : without(cwd, recursive, pattern, relativeCwd),
  )
}

function without(cwd, recursive, pattern, relativeCwd) {
  return `
const entity = require('skypager-util/lib/entity').default

module.exports = entity({
  context: require.context("${cwd}", ${recursive ? "true" : "false"}, toRegexp('${pattern}')),
  pattern: "${pattern}",
  cwd: "${relativeCwd}"
})
`.trim()
}

function withCodeSplitting(cwd, recursive, pattern, relativeCwd) {
  return `
const entity = require('skypager-util/lib/entity').default

module.exports = function() {
  return new Promise(function(resolve,reject) {
    require.ensure([], function() {
      try {
        resolve(entity({
          context: require.context("${cwd}", ${recursive ? "true" : "false"}, toRegexp('${pattern}')),
          pattern: "${pattern}",
          cwd: "${relativeCwd}"
        }))
      } catch(error) {
        reject(error)
      }
    })
  })
}`.trim()
}
