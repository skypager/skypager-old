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
  const statsOptions = this.runtime.argv.verbose ? {} : { minimal: true }

  await compiler.run()

  if (compiler.hasWarnings) {
    this.print(`Compiler had warnings.`)
    this.print(
      compiler.stringifyStats({ colors: true, warnings: true, errors: true, minimal: true })
    )
  } else if (compiler.hasErrors) {
    this.print(`Compiler had errors.`)
    this.print(compiler.stringifyStats('errors-only'))
  } else if (compiler.wasSuccessful) {
    this.print(compiler.stringifyStats({ colors: true, ...statsOptions }))
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

export async function serveCompiler(compiler) {
  const { port = 3000, host = '0.0.0.0' } = this.runtime.argv

  const devServer = await compiler.createDevServer({
    historyApiFallback: true,
    noInfo: false,
    hot: true,
    contentBase: skypager.join('public'),
    port,
    host,
    publicPath: compiler.publicPath || '/',
    quiet: false,
    ...this.runtime.chain
      .get('argv')
      .pick(
        'historyApiFallback',
        'noInfo',
        'hot',
        'contentBase',
        'port',
        'host',
        'publicPath',
        'quiet'
      )
      .value(),
    stats: { colors: true, minimal: true },
  })

  devServer.listen(port, host, err => {
    if (err) {
      this.print(`ERROR Starting Dev Server`)
      this.print(err.message, 4)
      return
    }

    this.print(`Dev Server is listening on http://${host}:${port}`)
  })
}

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
