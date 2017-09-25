module.exports = function(chain) {
  return chain.pick(
    "name",
    "cwd",
    "cacheKey",
    "childFolderNames",
    "sourcePaths",
    "subFolderNames",
    "gitInfo",
    "manifest",
    "env",
    "hostname",
    "dependencies",
  )
}
