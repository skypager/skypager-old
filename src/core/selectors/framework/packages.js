module.exports = function(chain, excludeMissingPackages = false) {
  return chain
    .get("framework.buildStatus.packages", {})
    .values()
    .map(pkg => {
      const { name } = pkg
      const base = name.replace("skypager-", "")
      const parts = base.match(/(^.*s)\-(.*$)/)
      const shortcut = (parts ? parts.slice(1) : [base]).join("/")

      let resolved = false
      const sourceBase = ["src", shortcut].join("/")

      try {
        resolved = require.resolve(name)
      } catch (error) {
        resolved = false
      }

      if (excludeMissingPackages && !resolved) {
        return
      }

      return Object.assign({}, { sourceBase, resolved, name, shortcut }, pkg)
    })
    .compact()
    .keyBy("name")
}
