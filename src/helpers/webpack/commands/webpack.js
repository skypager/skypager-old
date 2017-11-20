export function program(p) {
  return p
    .command('webpack')
    .description('webpack compiler helpers')
    .option('--target', 'which target to build for: web, node, electron-main, electron-renderer')
    .option('--entry-point', 'path to the entry point of the application')
    .option('--library-target', 'which type of module to build? defaults to umd')
    .option('--public-path', 'which value to use as your public path')
    .option('--output-path', 'where to save the output')
    .option('--output-filename', 'any valid webpack filename option')
    .option('--webpack-config', 'specify a path to a webpack config file')
    .option('--compiler-id', 'the id of the webpack config profile to use')
}

export async function prepare(options = {}) {
  await this.runtime.mainScript.whenReady()
  return true
}

export async function run(argv) {
  const { _: args = [] } = this.runtime.argv
  args.shift()

  const { omitBy, isEmpty, defaults } = this.lodash
  const availableWebpacks = this.runtime.get('webpacks.available', [])

  if (args[0] === 'available' || argv.available) {
    this.print(`Available Compilers:`, 2)
    this.print(availableWebpacks, 4)
    process.exit(0)
  }

  const { compilerId, action } = getCompilerAction({ argv, args, availableWebpacks })

  const options = defaults({}, argv)

  if (compilerId && availableWebpacks.indexOf(compilerId) >= 0) {
    await useAvailableCompiler.call(this, { compilerId, action, options, args, argv })
  } else {
    await useAnonymousCompiler.call(this, { action, options, args, argv })
  }
}

export async function useAvailableCompiler({ compilerId, action, options, args, argv }) {
  const { runtime } = this
  const compiler = await runtime.compiler(compilerId, options)

  switch (action) {
    case 'serve':
      return serveCompiler.call(this, compiler)
    case 'watch':
      return watchCompiler.call(this, compiler)
    case 'build':
    default:
      return runCompiler.call(this, compiler)
  }
}

export async function runCompiler(compiler) {
  await compiler.run()

  if (compiler.hasWarnings) {
    this.print(`Compiler had warnings.`)
  } else if (compiler.hasErrors) {
    this.print(`Compiler had errors.`)
    this.print(compiler.stringifyStats('errors-only'))
  } else if (compiler.wasSuccessful) {
    this.print(`Compiler was successful.`)
  }

  return compiler
}

export async function watchCompiler(compiler) {
  const { aggregateTimeout = 400 } = this.runtime.argv

  let initial

  compiler.watch({ aggregateTimeout }, err => {
    if (!err && !initial) {
      this.print('Compiler is running in watch mode.')
      this.print(`Current Directory: ${compiler.cwd}`)
      initial = true
    }

    if (err) {
      this.print(`Watcher received fatal error`)
      this.print(error.message, 4)
      return
    }

    !initial && this.print(`Watch Success: ${compiler.get('currentPackage.name', compiler.cwd)}`)
    this.print(compiler.stringifyStats('minimal'), 4)
  })
}

export async function serveCompiler(compiler) {}

export async function useAnonymousCompiler({ action, options, args, argv }) {
  const { runtime } = this
  const compiler = await runtime.compiler(options)
  console.log('Using Anonymous Compiler')
  console.log(compiler)
}

export function getCompilerAction({ argv, args, availableWebpacks }) {
  let action = argv.action
  let compilerId = argv.compilerId

  if (args.length === 1 && availableWebpacks.indexOf(args[0]) >= 0) {
    action = action || 'build'
    compilerId = args[0]
  }

  if (args.length > 1) {
    action = action || args[0]
    compilerId = compilerId || args[1]
  }

  return { compilerId, action }
}

export async function oldRun(options = {}) {
  const { print, clear } = this.cli

  if (this.runtime.argv.noClear || this.runtime.argv.clear === false) {
  } else {
    clear()
  }

  const [
    action = 'build',
    compilerId = options.compilerId ||
      this.runtime
        .at(
          'options.projectType',
          'options.compilerId',
          'currentPackage.projectType',
          'currentPackage.name'
        )
        .find(v => v && v.length),
  ] = options._.slice(1)

  options = this.lodash.defaults({}, options, {
    target: this.runtime.get(
      'options.defaultBuildTarget',
      this.runtime.get('currentPackage.defaultBuildTarget', 'node')
    ),
    libraryTarget: this.runtime.get(
      'options.defaultLibraryTarget',
      this.runtime.get('currentPackage.libraryTarget', 'umd')
    ),
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

  console.log('Creating Compiler', isAvailable, compilerArgs)

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
      print('Compiler failed')
      console.log(results)
    }

    return compiler
  }

  const fatal = (stageDesc, err, c) => {
    this.runtime.error(`Fatal error encountered while ${stageDesc}`, { message: err.message })
    return c
  }

  if (!compiler.isConfigValid) {
    print('The compiler configuration is invalid')
    print(compiler.configValidationMessages)
    return this
  }

  switch (action) {
    case 'watch':
      return doWatch().catch(e => fatal('watching', e, compiler))
    case 'serve':
      return doServe().catch(e => fatal('serving', e, compiler))
    case 'build':
    default:
      return doBuild().catch(e => fatal('building', e, compiler))
  }
}
