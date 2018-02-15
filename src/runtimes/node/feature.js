export const hostMethods = ['parseArgv']

/**

TODO

Node runtime initialization is out of control at the moment.  Every feature available
is autoloaded no matter what command is being run. Move these to the command prepare step

*/

export function featureWasEnabled(...args) {
  try {
    enabledHook.call(this, ...args)
  } catch (error) {
    console.error('Error enabling node runtime')
    console.error(error.message)
    console.log(error.stack)
  }
}

export function enabledHook(options = {}) {
  const { runtime } = this
  const { get, omit, defaultsDeep } = runtime.lodash

  defaultsDeep(runtime.argv, runtime.parseArgv(runtime.argv))

  if (runtime.argv.profile) {
    runtime.feature('profiler').enable()
  }

  runtime.invoke('profiler.profileStart', 'nodeRuntimeEnabled')
  runtime.invoke('profiler.profileStart', 'helperCommandEnabled')
  runtime.use(require('skypager-helpers-command'), 'INITIALIZING')
  runtime.invoke('profiler.profileEnd', 'helperCommandEnabled')

  // TODO can this safely be moved to src/features/node in the portfolio?
  // Reasoning is it is c
  runtime.features.add(require.context('./features', false, /\.js$/))

  runtime.invoke('profiler.profileStart', 'osAdaptersEnabled')
  runtime.feature('fs-adapter').enable()

  runtime.lazy('proc', () => {
    const procFeature = runtime.feature('child-process-adapter')
    procFeature.enable()
    return procFeature
  })

  runtime.lazy('os', () => {
    const osFeature = runtime.feature('os-adapter')
    osFeature.enable()
    return osFeature
  })

  runtime.lazy('networking', () => {
    const netFeature = runtime.feature('networking')
    netFeature.enable()
    return netFeature
  })

  runtime.invoke('profiler.profileEnd', 'osAdaptersEnabled')

  if (runtime.argv.logging || process.env.USE_SKYPAGER_LOGGING) {
    runtime.invoke('profiler.profileStart', 'loggerEnabled')
    runtime.feature('logging').enable()
    runtime.invoke('profiler.profileEnd', 'loggerEnabled')
  } else {
    runtime.lazy('logger', () => console)
  }

  runtime.lazy('opener', () => {
    const opener = runtime.feature('opener')
    opener.enable()
    return opener
  })

  runtime.hide(
    '_argv_paths',
    runtime.helperTags.map(tag => ['currentPackage', 'skypager', ...tag.split('/')])
  )

  const packageConfig = runtime.get('currentPackage.skypager', {})

  const { env, target } = runtime

  const targetConfig = defaultsDeep({}, get(packageConfig, [env]), get(packageConfig, [target]))

  runtime.hide('projectConfig', defaultsDeep({}, targetConfig, omit(packageConfig, target, env)))

  defaultsDeep(runtime.argv, runtime.parseArgv(runtime.argv), runtime.projectConfig)

  runtime.lazy('homeFolder', () => {
    const homeDirectory = runtime.feature('home-directory')
    homeDirectory.enable()
    return runtime.homeFolder
  })

  runtime.lazy('skywalker', () => {
    const skywalker = runtime.feature('skywalker')
    skywalker.enable()
    return skywalker
  })

  runtime.invoke('profiler.profileStart', 'packageFinderEnabled')
  runtime.feature('package-finder').enable()
  runtime.invoke('profiler.profileEnd', 'packageFinderEnabled')

  runtime.lazy('autoDiscovery', () => {
    const autoDiscovery = runtime.feature('auto-discovery')
    autoDiscovery.enable()
    return autoDiscovery
  })

  runtime.invoke('profiler.profileStart', 'findCurrentPackage')
  runtime.packageFinder
    .findNearest()
    .then(currentPackagePath => {
      runtime.state.set('currentPackagePath', currentPackagePath)
      runtime.invoke('profiler.profileEnd', 'findCurrentPackage')
    })
    .catch(error => {
      runtime.state.set('packageFinderError', error)
      // swallow the erro
    })

  runtime.feature('git').enable()

  // This seems to be an ok way of lazy loading a feature
  runtime.lazy('packageCache', () => {
    runtime.feature('package-cache').enable()
    return runtime.packageCache
  })

  runtime.lazy('fileDownloader', () => {
    const downloader = runtime.feature('file-downloader')
    downloader.enable()
    return downloader
  })

  runtime.lazy('fileManager', () => {
    try {
      runtime.invoke('profiler.profileStart', 'fileManagerEnabled')
      require('skypager-features-file-manager').attach(runtime)
      runtime.invoke('profiler.profileEnd', 'fileManagerEnabled')
      return runtime.feature('file-manager')
    } catch (e) {}
  })

  runtime.selectors.add(require.context('./selectors', true, /.js$/))

  runtime.feature('main-script').enable()

  const attached = {}

  runtime.hideGetter('attachedHelpers', () => attached)

  const lazyAttach = (baseName, fn) => {
    runtime.invoke('profiler.profileStart', `lazyAttached_${baseName}`)
    runtime.lazy(baseName, () => {
      if (attached[baseName]) {
        return runtime[baseName]
      }

      fn()
      runtime.invoke('profiler.profileEnd', `lazyAttached_${baseName}`)
      attached[baseName] = true

      return runtime[baseName]
    })

    runtime.lazy(`${baseName}s`, () => {
      if (attached[baseName]) {
        return runtime[`${baseName}s`]
      }

      fn()
      attached[baseName] = true

      return runtime[`${baseName}s`]
    })
  }

  lazyAttach('client', () => {
    runtime.invoke('profiler.profileStart', 'clientHelperEnabled')
    runtime.use(require('skypager-helpers-client'), 'INITIALIZING')
    runtime.invoke('profiler.profileEnd', 'clientHelperEnabled')
  })

  lazyAttach('repl', () => {
    runtime.invoke('profiler.profileStart', 'replHelperEnabled')
    runtime.use(require('skypager-helpers-repl'), 'INITIALIZING')
    runtime.invoke('profiler.profileEnd', 'replHelperEnabled')
  })

  lazyAttach('page', () => {
    runtime.invoke('profiler.profileStart', 'pageHelperEnabled')
    runtime.use(require('skypager-helpers-page'), 'INITIALIZING')
    runtime.invoke('profiler.profileEnd', 'pageHelperEnabled')
  })

  lazyAttach('server', () => {
    runtime.invoke('profiler.profileStart', 'serverHelperEnabled')
    runtime.use(require('skypager-helpers-server'), 'INITIALIZING')
    runtime.use('node/server-helper')
    runtime.invoke('profiler.profileEnd', 'serverHelperEnabled')
  })

  lazyAttach('projectType', () => {
    runtime.use(require('skypager-helpers-project-type'), 'INITIALIZING')
  })

  const requestedFeatures = runtime.chain
    .plant(runtime.lodash.castArray(runtime.argv.use))
    .intersection(runtime.features.available)
    .without(Object.keys(runtime.enabledFeatures))
    .value()

  if (requestedFeatures.length) {
    runtime.debug('Enabling features requested via command line', { requestedFeatures })

    requestedFeatures.forEach(featureId => {
      const result = runtime.lodash.attempt(() => runtime.feature(featureId).enable(runtime.argv))

      if (runtime.lodash.isError(result)) {
        runtime.error(`Error while enabling requested feature`, {
          featureId,
          message: result.message,
        })
      }
    })
  }

  if (!runtime.state.get('mainScriptRan')) {
    runtime.invoke('profiler.profileStart', 'mainScriptRunner')
    runtime.mainScript
      .runMainScript()
      .then(() => {
        runtime.setState({ mainScriptRan: true })
        runtime.invoke('profiler.profileEnd', 'mainScriptRunner')
      })
      .catch(err => {
        runtime.error(`Error running mainScript`, { error: err.message })
        runtime.setState({ mainScriptError: err })
        runtime.invoke('profiler.profileEnd', 'mainScriptRunner')

        if (runtime.argv.safeMode) {
          console.error(`Error while running skypager main script. ${err.message}`)
          process.exit(1)
        }
      })
  }

  if (runtime.argv.profile) {
    runtime.profiler.profileEnd('nodeRuntimeEnabled')
  }

  runtime.setState({ nodeFeatureEnabled: true })
  runtime.emit('nodeFeatureEnabled')
}

export function parseArgv(base = {}) {
  const { snakeCase, camelCase } = this.stringUtils
  const { defaultsDeep, omitBy, mapKeys } = this.lodash

  const procArgs = require('minimist')(process.argv.slice(2))

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
