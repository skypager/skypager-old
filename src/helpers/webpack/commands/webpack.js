export function program(p) {
  return p
    .command("webpack")
    .description("webpack compiler helpers")
    .option("--target", "which target to build for: web, node, electron-main, electron-renderer")
    .option("--library-target", "which type of module to build? defaults to umd")
    .option("--public-path", "which value to use as your public path")
    .option("--output-path", "where to save the output")
    .option("--output-filename", "any valid webpack filename option")
    .option("--webpack-config", "specify a path to a webpack config file")
    .option("--compiler-id", "the id of the webpack config profile to use")
}

export async function validate() {
  const options = this.runtime.argv || {}
  const [action = "build"] = (options._ || []).slice(1)

  if (["build", "serve", "watch"].indexOf(action.toString().toLowerCase()) === -1) {
    this.runtime.error("Invalid action supplied. either build / serve / watch. default is build")
    return false
  }

  return true
}

export async function prepare(options = {}) {
  return true
}

export async function run(options = {}) {
  const { print, clear } = this.cli

  if (this.runtime.argv.noClear || this.runtime.argv.clear === false) {
  } else {
    clear()
  }

  const [
    action = "build",
    compilerId = options.compilerId ||
      this.runtime
        .at(
          "options.projectType",
          "options.compilerId",
          "currentPackage.projectType",
          "currentPackage.name"
        )
        .find(v => v && v.length)
  ] = options._.slice(1)

  options = this.lodash.defaults({}, options, {
    target: this.runtime.get(
      "options.defaultBuildTarget",
      this.runtime.get("currentPackage.defaultBuildTarget", "node")
    ),
    libraryTarget: this.runtime.get(
      "options.defaultLibraryTarget",
      this.runtime.get("currentPackage.libraryTarget", "umd")
    )
  })

  if (options.outputPath) {
    options.outputPath = this.runtime.resolve(options.outputPath)
  }

  const isAvailable = compilerId && this.runtime.webpacks.available.indexOf(compilerId) !== -1

  const compilerArgs = []

  if (isAvailable) {
    compilerArgs.push(...[compilerId, options])
  } else if (compilerId) {
    compilerArgs.push(...[compilerId, options])
  } else {
    compilerArgs.push(options)
  }

  const compiler = await this.runtime.compiler(...compilerArgs)

  const doWatch = async (watchOptions = {}) => {
    compiler.watch(watchOptions)
    return compiler
  }

  const doServe = async (devServerOptions = {}) => {
    const server = await compiler.createDevServer(devServerOptions)

    const listener = new Promise((resolve, reject) => {
      server.listen(port, host, e => (e ? reject(e) : resolve(server)))
    })

    return await Promise.resolve(listener)
  }

  const doBuild = async (runOptions = {}) => {
    const results = await compiler.run(runOptions).catch(e => e)

    if (results && (!results.stack && !results.message)) {
      print(compiler.stringifyStats({ colors: true }), 4)
    } else {
      print("Compiler failed")
      console.log(results)
    }

    return compiler
  }

  const fatal = (stageDesc, err, c) => {
    this.runtime.error(`Fatal error encountered while ${stageDesc}`, { message: err.message })
    return c
  }

  if (!compiler.isConfigValid) {
    print("The compiler configuration is invalid")
    print(compiler.configValidationMessages)
    return this
  }

  switch (action) {
    case "watch":
      return doWatch().catch(e => fatal("watching", e, compiler))
    case "serve":
      return doServe().catch(e => fatal("serving", e, compiler))
    case "build":
    default:
      return doBuild().catch(e => fatal("building", e, compiler))
  }
}
