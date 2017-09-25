const { dirname } = require("path")

module.exports = function(chain, options = {}) {
  const project = this
  const {
    ignorePattern = /build|public|dist|lib|node_modules/,
    base = "",
    origin,
    pattern = "*.js",
    prefix = "./",
  } = options

  return chain
    .invoke(`query`, `${base}${pattern}`, false, r => r.doc)
    .keyBy(doc => doc.baseRelativePath)
    .mapValues("path")
    .pickBy((absolutePath, baseRelative) => {
      if (absolutePath.match(ignorePattern)) {
        return false
      } else if (origin) {
        return baseRelative.startsWith(dirname(project.relative(origin)))
      } else {
        return true
      }
    })
    .mapKeys((v, k) => {
      return `${prefix}${!origin ? k : k.replace(dirname(project.relative(origin)), "")}`.replace(/\/\//, "/")
    })
    .mapValues((v, k) => (options.resolved !== false ? v : k))
}
