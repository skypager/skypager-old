import skypager from "skypager-runtime"

//import ChangeMonitorPlugin from "./terse/plugins/change-monitor"
//import ExtraEntryPlugin from "./terse/plugins/extra-entry-plugin"
//import WebpackAssetsManifest from "webpack-assets-manifest"
//import ExternalHelpers from "webpack-babel-external-helpers-2"
// import DuplicatePackageChecker from "duplicate-package-checker-webpack-plugin"

const { Helper } = skypager
const { pick, defaults, assign, uniq, get, isFunction, isEmpty, isObject, isArray } = skypager.lodash
const { snakeCase, camelCase } = skypager.stringUtils
const { hideGetter, mixinPropertyUtils } = skypager.propUtils

export class Compiler extends Helper {
  static isCacheable = false

  static dirname = __dirname

  /**
   * The Compiler Helper is a wrapper around the webpack compiler
   */
  get compiler() {
    return this.webpackCompilerInstance
  }

  get devMiddleware() {
    return this.compiler.devMiddleware
  }

  get hotMiddleware() {
    return this.compiler.hotMiddleware
  }

  static configFeatures() {
    return require("./config/features")
  }

  static configReducers() {
    return require("./config/reducers")
  }

  static mapConfigKeys(v, k) {
    return k
  }

  /**
   * A Promise based interface for running the compiler and handling the results.
   *
   * Accepts a function which will be passed the compiler instance before running. This can be used to
   * apply extra plugins to webpack.
   *
   * @example
   *
   *  const node = runtime.compiler('node')
   *  node.run((webpackCompiler) => {
   *    webpackCompiler.apply(function(c) {
   *      c.apply('compilation', function(compilation) {
   *        // do something with the webpack compilation
   *      })
   *    })
   *  })
   */
  async run(options = {}) {
    options = {
      saveStats: !!this.runtime.get("argv.saveStats", false),
      statsOptions: this.tryGet("statsOptions", {}),
      cacheConfig: !!this.runtime.get("argv.cacheConfig", false),
      cacheDllConfig: !!this.runtime.get("argv.cacheDllConfig", false),
      configPath: this.runtime.resolve(`skypager.webpack.config.${this.name}.${this.get("runtime.env")}.js`),
      ...this.options,
      ...options,
    }

    const compiler = this
    const { tap, configPath, cacheDllConfig, cacheConfig, saveStats, statsOptions } = options

    const { writeFileAsync: writeFile, mkdirpAsync: mkdir } = this.runtime.fsx

    if (isFunction(tap)) {
      tap.call(this, compiler.compiler)
    }

    const stats = await this.runner()

    if (cacheConfig) {
      await writeFile(configPath, this.stringifyConfig())
    }

    if (cacheDllConfig && !isEmpty(this.dllCandidates)) {
    }

    return this
  }

  /**
   * Runs the webpack compiler in watch mode.
   */
  watch(options = {}, callback) {
    if (!callback && typeof options === "function") {
      callback = options
      options = {}
    }

    this.compiler.watch(options, (err, rawStats) => {
      if (err) {
        this.emit("error", err)
        this.handleFatalError(err, callback)
        return
      }

      const stats = statsEnhancer.call(this, rawStats, this.compiler)

      this.hide("stats", stats, true)
      this.hideGetter("lastResult", () => stats, true)

      if (rawStats.hasErrors()) {
        this.emit("watch:errors", this, this.formatStats(stats))
        this.runtime.debug("compiler:hadErrors")
      }

      if (rawStats.hasWarnings()) {
        this.emit("watch:warnings", this, this.formatStats(stats))
        this.runtime.debug("compiler:hadWarnings")
      }

      callback && callback(err, ...[this.formatStats(stats), this])

      if (!rawStats.hasWarnings() && !rawStats.hasErrors()) {
        this.emit("watch:success", this, this.formatStats(stats))
        this.runtime.debug("compiler:watch success")
      }
    })
  }

  onFailure(fn) {
    const c = this

    this.plugins.push({
      apply(compiler) {
        compiler.plugin("done", function(stats) {
          if (stats.hasErrors()) {
            fn.call(c, stats, c, compiler)
          }
        })
      },
    })

    return this
  }

  addModuleResolver(fn, before = true) {
    const c = this

    this.plugins.push({
      apply(compiler) {
        compiler.resolvers.normal.plugin(before ? "before-resolve" : "after-resolve", function(data, cb) {
          Promise.resolve(fn.call(c, data))
            .then(result => {
              if (result) {
                cb(null, result)
              } else {
                cb()
              }
            })
            .catch(error => cb(error))
        })
      },
    })

    return this
  }

  addContextResolver(fn, before = true) {
    const c = this

    this.plugins.push({
      apply(compiler) {
        compiler.resolvers.context.plugin(before ? "before-resolve" : "after-resolve", function(data, cb) {
          Promise.resolve(fn.call(c, data))
            .then(result => {
              if (result) {
                cb(result)
              } else {
                cb()
              }
            })
            .catch(error => cb(error))
        })
      },
    })

    return this
  }

  // function will be passed source, module, hash must return source
  observeModuleTemplate(fn) {
    fn = fn.bind(this)

    this.plugins.push({
      apply(compiler) {
        compiler.plugin("compilation", compilation => {
          compilation.mainTemplate.plugin("startup", fn)
        })
      },
    })
  }

  onSuccess(fn) {
    const c = this

    this.plugins.push({
      apply(compiler) {
        compiler.plugin("done", function(stats) {
          if (!stats.hasErrors() && !stats.hasWarnings()) {
            fn.call(c, stats, c, compiler)
          }
        })
      },
    })

    return this
  }

  addEntry(options = {}) {
    //this.plugins.push(new ExtraEntryPlugin(options))

    return this
  }

  handleFileChange(...args) {
    return this.monitorChanges(...args)
  }

  monitorChanges(handler, ...args) {
    /*
    isFunction(handler) &&
      this.plugins.push(new ChangeMonitorPlugin(handler, ...args))
    */
    return this
  }

  /**
   * Monitor the progress of the compiler with a callback function.
   *
   */
  monitorProgress(handler, ...args) {
    isFunction(handler) && this.plugins.push(new webpack.ProgressPlugin(handler.bind(this), ...args))

    return this
  }

  /**
   * Create an instance of the terse-webpack configuration API, passing in your own custom
   * features or reducers configuration, and a history stack if you have one.
  */

  createAPI() {
    return this.configurator()
  }

  /**
   * Tap into the terse-webpack configuration API and add your own feature / reducer combo
   *
   * A Feature is a function which adds values on to the configuration history stack
   *
   * A reducer produces a webpack configuration key / value from the items in that stack.
   *
   * @example
   *
   *  const compiler = runtime.compiler('node')
   *  compiler.define.feature('whatever', (existingValue, userSuppliedValue) => {
   *    return [...existingValue, ...userSuppliedValue]
   *  })
   *  compiler.define.reducer('webpackConfigKey', (state) => {
   *    return state
   *  })
   */
  get define() {
    const compiler = this

    return {
      feature(name, handler) {
        this.features[name] = handler.bind(compiler)
        return compiler.define
      },
      reducer(name, handler) {
        this.reducers[name] = handler.bind(compiler)
        return compiler.define
      },
      macros(name, handler) {
        this.macros[name] = handler.bind(compiler)
        return compiler.define
      },
    }
  }

  addCompilationHook(eventId, handler) {
    handler = handler.bind(this)

    this.plugins.push({
      apply(compiler) {
        compiler.compilation("plugin", compilation => {
          compilation.plugin(eventId, (...args) => {
            handler(...args)
          })
        })
      },
    })
  }

  watchModules() {
    const c = this

    this.plugins.push({
      apply(compiler) {
        compiler.plugin("compilation", function(compilation) {
          compilation.plugin("failed-module", function(mod) {
            c.moduleDidFail(mod, compilation, compiler)
          })

          compilation.plugin("succeed-module", function(mod) {
            c.moduleDidSucceed(mod, compilation, compiler)
          })

          compilation.plugin("build-module", function(mod) {
            c.moduleDidBuild(mod, compilation, compiler)
          })
        })
      },
    })

    return this
  }

  moduleDidFail(data) {
    if (this.tryGet("moduleDidFail")) {
      this.tryGet("moduleDidFail").call(this, data)
    }
  }

  moduleDidSucceed(data) {
    if (this.tryGet("moduleDidSucceed")) {
      this.tryGet("moduleDidSucceed").call(this, data)
    }
  }

  moduleDidBuild(data) {
    if (this.tryGet("moduleDidBuild")) {
      this.tryGet("moduleDidBuild").call(this, data)
    }
  }

  /**
   * @private
   *
   * The Compiler Helper will automatically call this when it is created.
   */
  initialize() {
    this.plugins = []

    if (this.tryGet("watchModules")) {
      this.watchModules()
    }

    // This allows for compatability with the webpack CLI
    // Simply by module.exports = runtime.compiler('node').configure(...whatever)
    if (this.runtime.get("argv._[1]", "").match(/webpack/)) {
      this.then = this.webpackCompat.bind(this)
    }

    this.lazy("api", this.createAPI.bind(this))
    this.hide("features", this.tryResult("features", {}))
    this.hide("macros", this.tryResult("macros", {}))
    this.hide("reducers", this.tryResult("reducers", {}))
    this.hide("configHistory", this.tryResult("options.configHistory", []))

    this.lazy("webpackCompilerInstance", () => this.createCompiler())

    this.hide("compilerHooks", {})

    this.lazy("config", () => this.buildConfig(), true)

    if (this.tryGet("helpers")) {
      this.applyMixin(this.tryGet("helpers"), this.context, this)
    }

    this.hideGetter("compilation", () => this.getCompilation())
  }

  get isBuild() {
    return this.get("runtime.commandPhrase", "").match(/^build/i)
  }

  get isBuilder() {
    return this.get("runtime.commandPhrase", "").match(/^build/i)
  }

  get isServer() {
    return this.get("runtime.commandPhrase", "").match(/^start|serve/i)
  }

  /**
   * Using this hook you can modify the webpack configuration object before it gets passed
   */
  compilerWillMount(webpackConfig = {}, configApi) {
    const options = this.get("options.compilerWillMount", wc => wc)
    const provider = this.get("provider.compilerWillMount", wc => wc)

    try {
      this.runtime.attemptMethod("compilerWillMount", this, webpackConfig, configApi)
    } catch (error) {}

    webpackConfig = options.call(this, webpackConfig, configApi)
    webpackConfig = provider.call(this, webpackConfig, configApi)

    return webpackConfig
  }

  /**
   * Using this hook you can do things with the webpack compiler instance
   */

  compilerDidMount(webpackCompiler) {
    const options = this.get("options.compilerDidMount", wc => wc)
    const provider = this.get("provider.compilerDidMount", wc => wc)

    webpackCompiler = options.call(this, webpackCompiler)
    webpackCompiler = provider.call(this, webpackCompiler)

    return webpackCompiler
  }

  async loadConfigFrom(configFilePath, options = {}, context = this.context) {
    let onDisk = __non_webpack_require__(this.runtime.resolve(configFilePath))

    if (isObject(onDisk)) {
      onDisk = onDisk.default ? onDisk.default : onDisk
    }

    if (isFunction(onDisk)) {
      onDisk = await onDisk.call(
        this,
        this.get("runtime.env"),
        { ...this.options, ...this.runtime.argv, ...options },
        { ...this.context, ...context },
      )
    }

    return options.prepare === false
      ? onDisk
      : this.prepareWebpackConfig({ ...options, config: onDisk }, { ...this.context, ...context })
  }

  saveConfigTo(outputPath = "skypager.webpack.js") {
    return this.runtime.writeFileAsync(runtime.resolve(outputPath), this.config.getConfig().toString(), "utf8")
  }

  /**
   * Get the webpack configuration that our API built.
   */
  getConfig(options = {}, context = {}) {
    const builderConfig = this.standardConfigAvailable
      ? this.standardWebpackConfiguration
      : options.config || this.get("configuration", this.tryGet("config", this.config.getConfig()))

    return this.tryGet("prepare", options.prepare) === false
      ? builderConfig
      : this.prepareWebpackConfig({ ...options, config: builderConfig }, context)
  }

  stringifyConfig(options = {}, context = this.context) {
    return this.getConfig(options, context).toString()
  }

  get webpackConfigPath() {
    const configPath = this.tryGet("webpackConfig")
    return typeof configPath === "string" && this.runtime.resolve(configPath)
  }

  get standardWebpackConfiguration() {
    const { webpackConfig } = this.options

    if (typeof webpackConfig === "string" && this.runtime.fsx.existsSync(this.webpackConfigPath)) {
      const loaded = __non_webpack_require__(this.webpackConfigPath)
      const loadedConfig = (loaded.default ? loaded.default : loaded) || {}

      if (typeof loadedConfig === "function") {
        return loadedConfig.call(this, this.runtime.env, this.options, this.context)
      } else {
        return loadedConfig
      }
    } else if (typeof webpackConfig === "object" && webpackConfig.entry && webpackConfig.output) {
      return webpackConfig
    } else if (typeof webpackConfig === "function") {
      return webpackConfig.call(this, this.runtime.env, this.options, this.context)
    }
  }

  get standardConfigAvailable() {
    try {
      return !isEmpty(this.get("standardWebpackConfiguration"))
    } catch (error) {
      return false
    }
  }
  /**
  * Provide an API for setting up any webpack hook
 hook(webpackEventId, handler) {
   if (!webpackEventId || !handler) {
     return this
   }

   const [eventName, target = 'compiler'] = webpackEventId.split(':').reverse()

   this.compilerHooks[target]
 }
 */

  webpackCompat() {
    return Promise.resolve(this.getConfig()).catch(error => this.config)
  }

  plugin(...args) {
    this.config.plugin(...args)
    return this
  }

  output(...args) {
    this.config.output(...args)
    return this
  }

  entry(...args) {
    this.config.entry(...args)
    return this
  }

  buildConfig(options = this.options, context = this.context) {
    options = { ...options, api: this.api }
    context = { ...context, compiler: this, project: this.project }

    const result = isFunction(this.tryGet("configure"))
      ? this.tryGet("configure").call(this, options, context)
      : this.api

    const api = this.ensureAPI(result)

    return this.tryGet("buildConfig") ? this.tryGet("buildConfig").call(this, api, options, context) : api
  }

  ensureAPI(object = {}) {
    if (
      isFunction(object.getConfig) &&
      isFunction(object.getState) &&
      isArray(object.history) &&
      isFunction(object.when)
    ) {
      return object
    } else if (object.isCompiler && isArray(object.configHistory)) {
      return this.createAPI(object.features, object.reducers, object.configHistory, object)
    } else {
      console.log("Object", object)
      throw new Error(`The configuration API appears to be invalid. Expect an instance of the terse webpack system`)
    }
  }

  /**
   * @private
   *
   * Create the webpack compiler.
   */
  createWebpack(...args) {
    return webpack(...args)
  }

  /**
   * @private
   *
   * prepares the webpack configuration before creating our webpack compiler instance.
   */
  prepareWebpackConfig(options = {}, context = this.context) {
    const project = this.project

    let { config = this.config.getConfig() } = options

    const {
      name = this.name,
      silenceContextWarnings = this.get("options.silenceContextWarnings", true),
      externalizeAll = this.get(
        "options.externalizeAll",
        this.get("provider.externalizeAll", this.get("runtime.argv.externalizeAll", false)),
      ),
      assetManifest = this.get("options.assetManifest", this.get("runtime.argv.assetManifest")) !== false &&
        this.tryResult("assetManifest"),
      forceTarget = false,
      dedupe = runtime.argv.dedupe === true && runtime.argv.hot !== true,
      babelHelpers = runtime.argv.babelHelpers !== false,
    } = options

    config.name = name

    if (this.canUseDllPlugin) {
      this.runtime.debug("Using DLL Plugin", {
        dllManifestPath: this.dllManifestPath,
        dllName: this.dllName,
      })

      this.plugins.push(
        new webpack.DllReferencePlugin({
          context: config.context || runtime.cwd,
          manifest: runtime.fsx.readJsonSync(this.dllManifestPath),
        }),
      )
    }

    if (babelHelpers) {
      //this.plugins.push(new ExternalHelpers())
    }

    if (dedupe) {
      this.plugins.push(new webpack.optimize.DedupePlugin())
    }

    assign(config, {
      context: config.context || runtime.cwd,
      plugins: [...config.plugins, ...this.plugins],
    })

    if (assetManifest) {
      const manifestOptions = isObject(assetManifest) ? assetManifest : this.tryGet("manifestOptions", {})
      /*
      config.plugins.push(
        new WebpackAssetsManifest({
          output: runtime.resolve(config.output.path, "asset-manifest.json"),
          writeToDisk: true,
          ...manifestOptions
        })
      )
        */
    }

    config.resolveLoader = {
      modules: [],
      ...config.resolveLoader,
    }

    if (externalizeAll) {
      config.externals = [/^[a-z\-0-9]+$/]
    }

    config.resolve.modules = uniq(config.resolve.modules)
    config.resolveLoader.modules = uniq(config.resolveLoader.modules)

    if (!silenceContextWarnings) {
      assign(config.module, {
        exprContextRegExp: /$^/,
        exprContextCritical: false,
      })
    }

    if (this.tryGet("usePortfolioPackages", this.runtime.get("argv.usePortfolioPackages"))) {
      config.resolve.modules.push(this.runtime.join(".."))
      config.resolveLoader.modules.push(this.runtime.join(".."))
    }

    config = this.compilerWillMount.call(this, config, this.config) || config

    if (isFunction(this.tryGet("plugins"))) {
      this.runtime.attemptMethod("applyCompilerPlugins", this, config, options)
      config.plugins =
        this.tryGet("plugins").call(
          this,
          { ...options, currentPlugins: config.plugins },
          { ...this.context, ...context },
        ) || config.plugins
    }

    if (isEmpty(config.entry)) {
      config.entry = this.defaultEntryConfig
    }

    if (typeof forceTarget === "string") {
      config.target = forceTarget
    }

    this.runtime.set(`configurations.webpack.${this.name}`, config)

    return config
  }

  get defaultEntryConfig() {
    const val = this.get("options.entry", this.get("options.entries", this.get("options.in")))

    if (typeof val === "string" && val.match(/\w+\=\w+/)) {
      return parse(val)
    }

    return val
  }

  /**
   * @private
   *
   * Creates the actual enhanced webpack compiler and runs through our lifecycle hooks.
   */
  createCompiler(options = {}, context = this.context) {
    const { attachMiddlewares = this.get("options.attachMiddlewares", true), config = this.getConfig() } = defaults(
      {},
      options,
      this.options,
    )

    const baseCompiler = this.createWebpack(config)

    hideGetter(baseCompiler, "project", () => this.project)
    hideGetter(baseCompiler, "compilerHelper", () => this)

    this.compilerDidMount.call(this, baseCompiler)

    if (attachMiddlewares) {
      baseCompiler.devMiddleware = (...args) => require("webpack-dev-middleware")(baseCompiler, ...args)
      baseCompiler.hotMiddleware = (...args) => require("webpack-hot-middleware")(baseCompiler, ...args)

      this.hide("devMiddleware", baseCompiler.devMiddleware)
      this.hide("hotMiddleware", baseCompiler.hotMiddleware)
    }

    this.setupFileSystems(baseCompiler)

    return baseCompiler
  }

  set tapConfig(fn) {
    this.options.tap = fn.bind(this)
    return this
  }

  get tapConfig() {
    return this.options.tap || this.options.tapConfig
      ? (this.options.tap || this.options.tapConfig).bind(this)
      : cfg => cfg
  }

  eachOutputPath(fn) {
    return this.chain.plant(this.assetModulesByChunkName).values().map(fn.bind(this))
  }

  get cachedOutputFiles() {
    return this.chain
      .plant(this.assetModulesByChunkName)
      .pickBy(moduleId => typeof __non_webpack_require__.cache[moduleId] !== "undefined")
      .value()
  }

  get moduleTypes() {
    return this.chain.get("stats.compilation.modules").map(m => m.constructor.name).uniq().value()
  }

  get modulesGroupedByType() {
    return this.chain.get("stats.compilation.modules").groupBy(m => m.constructor.name).value()
  }

  get normalModules() {
    return this.get("stats.compilation.modules").filter(m => m.constructor.name === "NormalModule")
  }

  get contextModules() {
    return this.get("stats.compilation.modules").filter(m => m.constructor.name === "ContextModule")
  }

  get libraryTarget() {
    return this.tryResult("libraryTarget", () => this.get("runtime.argv.libraryTarget", "umd"))
  }

  get libraryName() {
    return this.tryResult("libraryName", () => snakeCase(camelCase(this.name)))
  }

  get canUseDllPlugin() {
    const useDllPlugin = this.get(
      "options.useDll",
      this.get("runtime.argv.useDll", this.get("runtime.environment.SKYPAGER_USE_DLL")),
    )
    const generateDll = this.get("options.generateDll", this.get("runtime.argv.generateDll"))

    return !generateDll && useDllPlugin && this.dllOutputExists
  }

  get dllManifestPath() {
    return this.runtime.resolve(this.dllOutputPath, `${this.dllName}.dll.json`)
  }

  get dllOutputExists() {
    const exists = this.runtime.fsx.existsSync
    return exists(this.dllManifestPath)
  }

  get dllName() {
    return this.tryResult("dllName", () => `${this.runtime.name}-${this.name}`)
  }

  get dllOutputPath() {
    return this.tryResult("dllOutputPath", () => this.runtime.paths.bundles)
  }

  get dllLibraryName() {
    return this.tryResult("dllLibraryName", () => this.libraryName)
  }

  get dllLibraryTarget() {
    return this.tryResult("dllLibraryTarget", () => this.libraryTarget)
  }

  get dllConfig() {
    const base = this.getConfig()
    const buildEntry = this.tryGet("buildDllEntries", this.tryGet("buildDllEntry"))

    base.name = this.dllName

    base.entry = {
      [this.dllName]: buildEntry ? buildEntry.call(this, this.dllCandidates) : this.dllCandidates,
    }

    base.output = {
      filename: "[name].dll.js",
      path: this.dllOutputPath,
      library: this.dllLibraryName,
      libraryTarget: this.dllLibraryTarget,
    }

    base.plugins = [
      new webpack.DllPlugin({
        name: this.dllLibraryName,
        path: this.runtime.resolve(base.output.path, "[name].dll.json"),
      }),

      ...this.tryResult("dllCompilerPlugins", () => []),
    ]

    if (this.options.minify !== false) {
      base.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false },
        }),
      )
    }

    return base
  }

  get dllCompiler() {
    const base = this.createWebpack(this.dllConfig)
    const orig = base.run.bind(base)

    base.isDllCompiler = true
    base.getParentCompiler = () => this

    base.run = () => new Promise((resolve, reject) => orig((err, result) => (err ? reject(err) : resolve(result))))

    return base
  }

  get dllCandidates() {
    const prefix = `${this.runtime.join("node_modules")}/`

    return this.chain
      .get("localNodeModuleDependencies", [])
      .reject(m => m.match(/babel-runtime|core-js|regenerator-runtime/i))
      .map(m => m.replace(prefix, ""))
      .uniq()
      .sort()
      .value()
  }

  get aggressiveDLLCandidates() {
    const prefix = `${this.runtime.join("node_modules")}/`

    return this.chain.get("localNodeModuleDependencies", []).map(m => m.replace(prefix, "")).uniq().sort().value()
  }

  get localNodeModuleDependencies() {
    return this.chain.get("localNodeModulesMetadata", []).map("resource").uniq().value()
  }

  get nodeModuleDependencies() {
    return this.chain.get("nodeModulesMetadata", []).map("resource").uniq().value()
  }

  get localNodeModulesMetadata() {
    const p = this.runtime.join("node_modules")

    return this.get("modulesMetadata").filter(m => m.context && m.context.startsWith(p))
  }

  get nodeModulesMetadata() {
    return this.get("modulesMetadata").filter(m => m.context && m.context.match(/node_modules/))
  }

  get localModulesMetadata() {
    return this.get("modulesMetadata").filter(m => m.context && !m.context.match(/node_modules/))
  }

  get modulesMetadata() {
    const slice = (m = {}, descend = true) => {
      let base = pick(m, "id", "request", "resource", "context", "rawRequest", "userRequest")

      if (descend) {
        base = {
          ...base,
          dependencies: slice(m.dependencies, false),
          reasons: slice(m.reasons, false),
          issuer: slice(m.issuer, false),
        }
      }

      return base
    }

    return this.get("stats.compilation.modules").map(slice)
  }

  get jsonAssets() {
    return this.chain.get("outputFilenames").pickBy(modulePath => modulePath.match(/\.json$/)).value()
  }

  get stylesheetAssets() {
    return this.chain.get("outputFilenames").pickBy(modulePath => modulePath.match(/\.css$/)).value()
  }

  get javascriptAssets() {
    return this.chain.get("assetModulesByChunkName").pickBy(modulePath => modulePath.match(/\.js$/)).value()
  }

  get fileAssets() {
    return this.chain
      .get("assetModulesByChunkName")
      .pickBy(modulePath => modulePath.match(/\.(png|gif|jpg|ico|ttf|woff|woff2|eot|svg|mp3|mp4|wav|zip)$/))
      .value()
  }

  get assetModulesByChunkName() {
    const outputMap = this.outputMap

    return this.chain
      .invoke("stats.toJson")
      .get("assetsByChunkName")
      .mapValues((list, chunkName) => outputMap[typeof list === "string" ? list : list[0]])
      .value()
  }

  get outputMap() {
    return this.chain
      .get("stats.compilation.assets", {})
      .keys()
      .reduce(
        (memo, filename) => ({
          ...memo,
          [filename]: join(this.outputPath, filename),
        }),
        {},
      )
      .value()
  }

  get outputFileNames() {
    return this.outputFilenames
  }

  get outputFilenames() {
    return this.chain
      .get("stats.compilation.assets", {})
      .keys()
      .reduce(
        (memo, filename) => ({
          ...memo,
          [filename]: join(this.outputPath, filename),
        }),
        {},
      )
      .value()
  }

  get compilerOptions() {
    return this.get("compiler.options", {})
  }

  get pluginNames() {
    return this.get("compilerOptions.plugins", []).map(p => p.constructor && p.constructor.name)
  }

  get outputFileSizes() {
    return this.chain
      .get("compilation.assets", {})
      .mapValues((asset, chunkName) => ({
        size: asset._cachedSize,
        chunkName,
        existsAt: this.runtime.relative(this.outputPath, asset.existsAt),
      }))
      .value()
  }

  get missingDependencies() {
    return this.chain
      .result("getCompilation")
      .get("missingDependencies", [])
      .map(m => m.split("/").pop().replace(/\.\w+$/g, ""))
      .reject(f => f.endsWith("node_modules"))
      .uniq()
      .value()
  }

  get fileDependencies() {
    return this.chain.result("getCompilation").get("fileDependencies", []).value()
  }

  get externalFileDependencies() {
    return this.get("fileDependencies", []).filter(p => p.match(/node_modules/) || !p.startsWith(this.runtime.cwd))
  }

  get namedChunks() {
    return this.get("compilation.namedChunks")
  }

  get chunkNames() {
    return Object.keys(this.namedChunks)
  }

  get compilationHash() {
    return this.get("compilation.fullHash")
  }

  get duration() {
    const { startTime = 0, endTime = 0 } = this.get("lastResult", {})

    return this.hasResults ? `${(endTime - startTime) / 1000} seconds.` : "NA"
  }

  get wasSuccessful() {
    return this.hasResults && !this.hasErrors && !this.hasWarnings
  }

  get hasResults() {
    return typeof this.lastResult !== "undefined" && typeof this.lastResult.toJson === "function"
  }

  get hasErrors() {
    return this.missingDependencies.length > 0 || this.result("lastResult.hasErrors")
  }

  get hasWarnings() {
    return this.missingDependencies.length > 0 || this.result("lastResult.hasWarnings")
  }

  get hadErrors() {
    return this.hasErrors
  }
  get hadWarnings() {
    return this.hasWarnings
  }

  get errors() {
    return this.get("rawErrors", []).map(webpackError => ({
      message: webpackError.message,
      name: webpackError.name,
      error: {
        message: get("webpackError.error.message", webpackError.message),
        stack: get("webpackError.error.stack"),
      },
      module: pick(get("webpackError.module", {}), "id", "resource", "request", "userRequest", "rawRequest"),
    }))
  }

  get rawErrors() {
    return this.chain.invoke("getCompilation").get("errors", []).value()
  }

  get rawWarnings() {
    return this.chain.invoke("getCompilation").get("warnings", []).value()
  }

  get moduleFiles() {
    return this.get("stats.json.modules", [])
      .map(m => m.identifier.split("!").pop().toString())
      .filter(path => path.match(this.runtime.realCwd) && path.match(/\.\w+$/))
      .map(path => path.replace(this.runtime.realCwd, "."))
  }

  get outputPath() {
    return this.get("compiler.outputPath", this.runtime.get(this.runtime.paths.output))
  }

  getCompilation() {
    return this.get("stats.compilation", {})
  }

  inputFileSystem() {
    return this.get("compiler.inputFileSystem")
  }

  outputFileSystem() {
    return this.options.useMemory && !this.options.useMemoryInput
      ? this.get("compiler.outputFileSystem")
      : this.get("compiler.inputFileSystem")
  }

  watchFileSystem() {
    return this.get("compiler.watchFileSystem.inputFileSystem")
  }

  loaderFileSystem() {
    return this.get("compiler.resolvers.loader.fileSystem")
  }

  moduleFileSystem() {
    return this.get("compiler.resolvers.normal.fileSystem")
  }

  contextFileSystem() {
    return this.get("compiler.resolvers.context.fileSystem")
  }

  watcher() {
    return this.get("compiler.watchFileSystem")
  }

  async compilerWillRun() {
    this.runtime.debug(`Compiler ${this.name} will run`)

    const hook = this.get("provider.compilerWillRun")
    if (hook) {
      await hook.call(this, this)
    }

    const optional = this.get("options.compilerWillRun")
    if (optional) {
      await optional.call(this, this)
    }

    return this
  }

  async compilerDidFinish() {
    this.runtime.debug(`Compiler ${this.name} did finish`, {
      ...this.pick("wasSuccessful", "hasErrors", "hasWarnings"),
    })

    const hook = this.tryGet("compilerDidFinish")

    if (hook) {
      await hook.call(this)
    }

    if (this.wasSuccessful) {
      this.runtime.debug("Generated assets", {
        assets: Object.keys(this.outputFilenames),
      })
    }

    return this
  }

  async postProcessors() {
    const useDllPlugin = this.get(
      "options.useDll",
      this.get("runtime.argv.useDll", this.get("runtime.environment.SKYPAGER_USE_DLL")),
    )
    const generateDll = this.get("options.generateDll", this.get("runtime.argv.generateDll"))
    const saveStats = this.get("options.saveStats", this.get("runtime.argv.saveStats"))
    const hook = this.tryGet("postProcessors")

    this.runtime.debug("compiler is running post processors", {
      customHook: isFunction(hook),
      saveStats: !!saveStats,
      generateDll: !!generateDll,
    })

    if (hook) {
      await hook.call(this, this.lastResult, this.context)
    }

    if (this.wasSuccessful && (generateDll || (useDllPlugin && !this.dllOutputExists))) {
      const dllCompiler = this.dllCompiler
      const dllStats = await this.dllCompiler.run()

      this.runtime.debug("DLL Generation finished", {
        hadErrors: dllStats.hasErrors(),
        hasWarnings: dllStats.hasWarnings(),
        assets: Object.keys(dllStats.compilation.assets),
      })

      if (this.isBuilder) {
        console.log(dllStats.toString("normal"))
      }

      await this.processDllResults(dllStats, dllCompiler, this)
    }

    if (this.wasSuccessful && saveStats) {
      this.runtime.debug("saving stats", { ...this.statsOptions })
      await this.saveStats()
    }

    return this
  }

  async processDllResults(dllStats, dllCompiler, compiler = this) {
    await this.runtime.attemptMethodAsync("processDllResults", dllStats, dllCompiler, compiler)

    if (this.tryGet("processDllResults")) {
      this.tryGet("processDllResults").call(this, dllStats, dllCompiler, compiler)
    }

    if (dllStats.hasErrors() || dllStats.hasWarnings()) {
      this.emit("dll:failure", dllStats, dllCompiler)
    } else {
      this.emit("dll:success", dllStats, dllCompiler)
    }

    return this
  }

  get runner() {
    const compiler = this
    const runner = compiler.runHandler.bind(compiler)
    const { project, compilerWillRun, compilerDidFinish, postProcessors } = this
    const { debug, error } = project

    return async function compilerIsRunning() {
      compiler.runtime.debug("compilerIsRunning", compiler.options)

      try {
        await compilerWillRun.call(compiler, compiler.options)
        await runtime.attemptMethodAsync("compilerWillRun", compiler)
        debug(`${compiler.name} compiler: finished pre run hooks`)
      } catch (e) {
        error(`${compiler.name} compiler: error in pre-runhook`, e)
      }

      try {
        await runner(compiler, compiler)
        debug(`${compiler.name} compiler: finished running`)
      } catch (e) {
        error(`${compiler.name} compiler: error in run`, e)
      }

      try {
        debug(`${compiler.name} compiler: finished post run hooks`)
        await compilerDidFinish.call(compiler, compiler, compiler.lastResult)
        await runtime.attemptMethodAsync("compilerDidFinish", compiler)
      } catch (e) {
        error(`${compiler.name} compiler: error in post run hooks`, e)
      }

      try {
        await postProcessors.call(compiler)
        await runtime.attemptMethodAsync("compilerPostProcess", compiler)
      } catch (e) {
        error(`${compiler.name} compiler: error in post processing step`, e)
      }

      return compiler
    }
  }

  get runHandler() {
    return (compiler = this) =>
      new Promise((resolve, reject) => {
        compiler.runEnhanced((err, ...args) => (err ? reject(err) : resolve(...args)))
      })
  }

  /**
   * A convenience method for displaying Webpack stats output.
   */
  printStats(options = {}, logger = console.log.bind(console)) {
    const { verbose = false, superVerbose = !!options.debug } = options

    if (this.stats) {
      logger(
        this.stats.toString({
          colors: true,
          cached: false,
          chunks: !!verbose,
          source: !!superVerbose,
          modules: !!verbose,
          assets: true,
          timings: true,
          hash: true,
          reasons: !!superVerbose,
          chunkOrigins: !!superVerbose,
          ...options,
        }),
      )
    }
  }

  formatStats(statsObject) {
    const handler = this.get("options.statsFormatter", this.get("provider.statsFormatter", o => o))

    return handler.call(this, {
      hadErrors: statsObject.hasErrors(),
      hadWarnings: statsObject.hasWarnings(),
      hash: statsObject.hash,
      startTime: statsObject.startTime,
      endTime: statsObject.endTime,
      getReport: options => pick(statsObject.toJson(options), "errors", "warnings", "assetsByChunkName", "hash"),
      getRawStats: () => statsObject,
    })
  }

  saveStats(data = {}, options = {}) {
    options = { ...this.statsOptions, ...options }

    data = pick(data, options.fields)

    return this.runtime.writeFileAsync(
      this.runtime.resolve(options.outputPath, options.filename),
      JSON.stringify(data, null, 2),
    )
  }

  get statsOptions() {
    const c = this

    return {
      outputPath: this.get("runtime.argv.statsPath", this.get("options.statsPath", this.outputPath)),
      filename: c.get("runtime.argv.statsFilename", `${c.name}.stats.json`),
      fields: c.get(
        this.get("runtime.argv.statsFields"),
        this.get("options.statsFields", [
          "assetsByChunkName",
          "hash",
          "startTime",
          "endTime",
          "errors",
          "warnings",
          "timings",
        ]),
      ),
    }
  }

  runEnhanced(callback) {
    this.compiler.run((err, rawStats) => {
      if (err) {
        this.emit("error", err)
        this.handleFatalError(err, callback)
        return
      }

      const stats = statsEnhancer.call(this, rawStats, this.compiler)

      this.hideGetter("stats", () => rawStats, true)
      this.hideGetter("lastResult", () => stats, true)

      if (rawStats.hasErrors()) {
        this.emit("compilation:errors", this, stats)
      }

      if (rawStats.hasWarnings()) {
        this.emit("compilation:warnings", this, stats)
      }

      if (!rawStats.hasWarnings() && !rawStats.hasErrors()) {
        this.emit("compilation:success", this, stats)
      }

      callback && callback(err, ...[this.formatStats(stats), this])
    })

    return this
  }

  setupFileSystems(compiler) {
    const {
      useMemory = false,
      useMemoryInput = false,
      useMemoryResolvers = !!this.options.useMemoryInput,
      useMemoryOutput = true,
    } = this.options

    if (useMemory) {
      const fs = this.runtime.memoryFileSystem

      if (useMemoryInput) {
        compiler.inputFileSystem = fs
      }

      if (useMemoryResolvers) {
        compiler.resolvers.normal.fileSystem = fs
        compiler.resolvers.context.fileSystem = fs
      }

      if (useMemoryOutput) {
        compiler.outputFileSystem = fs
      }
    }

    return compiler
  }

  readOutputFileSync(path, ...args) {
    return this.readOutputFileAsync(path, ...args)
  }

  readOutputFile(path, callback) {
    return this.outputFileSystem().readFile(path, callback)
  }

  readOutputFileAsync(path) {
    return new Promise((resolve, reject) =>
      this.outputFileSystem().readFile(path, (err, result) => (err ? reject(err) : resolve(result.toString()))),
    )
  }

  /**
   * @private
   *
   * handles a fatal error
   */
  handleFatalError(error, callback) {
    const silent = this.get("options.silent", false)

    if (!silent) {
      console.log("Fatal Error in Compiler")
      console.log(error.message)
      console.log(error.stack)
    }

    isFunction(callback) && callback(error)

    return this
  }

  static createRegistry = () =>
    Helper.createContextRegistry("compilers", {
      context: require.context("./compilers", false, /.js$/),
    })

  static attach(project, options = {}) {
    return Helper.attach(project, Compiler, {
      registryProp: "compilers",
      lookupProp: "compiler",
      registry: options.registry || Compiler.createRegistry(),
      ...options,
    })
  }
}

export default Compiler

export const registry = (Compiler.registry = Compiler.createRegistry())

export const registerHelper = () => {
  if (Helper.registry.available.indexOf("compiler") === -1) {
    Helper.registerHelper("compiler", () => Compiler)
  }
}

export const statsEnhancer = (stats, compiler) => {
  const enhanced = mixinPropertyUtils(stats, true)

  return Object.assign(enhanced, {
    get outputPath() {
      return compiler.outputPath
    },
  })
}

function identity(c) {
  return c
}
