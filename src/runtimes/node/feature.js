export const hostMethods = ["parseArgv"]

export function featureWasEnabled(options = {}) {
  const { runtime } = this
  const { defaultsDeep } = runtime.lodash

  defaultsDeep(runtime.argv, runtime.parseArgv(runtime.argv))

  runtime.use(require("skypager-helpers-command"), "INITIALIZING")

  runtime.features.add(require.context("./features", false, /\.js$/))

  runtime.feature("fs-adapter").enable()
  runtime.feature("child-process-adapter").enable()
  runtime.feature("os-adapter").enable()

  defaultsDeep(
    runtime.argv,
    runtime.parseArgv(runtime.argv),
    ...runtime.helperTags.map(tag => runtime.get(["currentPackage", "skypager", ...tag.split("/")]))
  )

  runtime.feature("home-directory").enable()
  runtime.feature("logging").enable()
  runtime.feature("skywalker").enable()
  runtime.feature("package-finder").enable()
  runtime.feature("git").enable()
  runtime.feature("package-cache").enable()
  runtime.feature("file-downloader").enable()

  require("skypager-features-file-manager").attach(runtime)

  runtime.selectors.add(require.context("./selectors", true, /.js$/))

  runtime.feature("main-script").enable()

  runtime.use(require("skypager-helpers-client"), "INITIALIZING")
  runtime.use(require("skypager-helpers-server"), "INITIALIZING")
  runtime.use(require("skypager-helpers-repl"), "INITIALIZING")
  runtime.use(require("skypager-helpers-page"), "INITIALIZING")
  runtime.use("node/server-helper")

  const requestedFeatures = runtime.chain
    .plant(runtime.lodash.castArray(runtime.argv.use))
    .intersection(runtime.features.available)
    .without(Object.keys(runtime.enabledFeatures))
    .value()

  if (requestedFeatures.length) {
    runtime.debug("Enabling features requested via command line", { requestedFeatures })

    requestedFeatures.forEach(featureId => {
      const result = runtime.lodash.attempt(() => runtime.feature(featureId).enable(runtime.argv))

      if (runtime.lodash.isError(result)) {
        runtime.error(`Error while enabling requested feature`, {
          featureId,
          message: result.message
        })
      }
    })
  }
}

export function parseArgv(base = {}) {
  const { snakeCase, camelCase } = this.stringUtils
  const { defaultsDeep, omitBy, mapKeys } = this.lodash

  const procArgs = require("minimist")(process.argv.slice(2))

  return omitBy(
    defaultsDeep(
      {},
      base,
      procArgs,
      { _: [] },
      mapKeys(procArgs, (v, k) => camelCase(snakeCase(k)))
    ),
    (v, k) => !k || k.length === 0 || k.match(/^\w+\-\w+/)
  )
}
