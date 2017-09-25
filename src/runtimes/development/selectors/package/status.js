export default async function(chain, basePaths = ["src", "packages"]) {
  const skypager = this
  const cacheBaseByPackage = skypager.fileManager.cacheBaseByPackage

  return chain
    .plant(cacheBaseByPackage)
    .pickBy((cacheKey, dirname) => basePaths.find(basePath => dirname.startsWith(basePath)))
    .mapValues((cacheKey, dirname) => ({
      dirname,
      cacheKey,
    }))
    .thru(report => ({
      gitInfo: skypager.gitInfo,
      cacheKeys: report,
      hostname: require("os").hostname(),
      platform: require("os").platform(),
      arch: require("os").arch(),
      env: skypager.env,
      skypagerFrameworkVersion: skypager.framework.version,
    }))
}
