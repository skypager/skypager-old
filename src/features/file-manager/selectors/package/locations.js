export default async function packageLocations(chain, options = {}) {
  const runtime = this
  const { dirname } = this.pathUtils
  const { manifestFile = "package.json" } = options

  return chain
    .invoke("fileManager.files.values")
    .map(p => p.path)
    .filter(path => path.endsWith(manifestFile))
    .map(key => dirname(runtime.relative(runtime.join("src"), key)))
    .uniq()
}
