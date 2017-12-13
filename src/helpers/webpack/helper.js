import webpack from 'webpack'
import Promise from 'bluebird'
import runtime, { Helper } from 'skypager-runtime'
const { mobx, lodash } = runtime
const { action, computed, observable } = mobx
const {
  isEmpty,
  compact,
  keys,
  pick,
  identity,
  castArray,
  sum,
  mapValues,
  isFunction,
  isObject,
  uniq,
} = lodash

const privateData = new WeakMap()

const WEBPACK_PLUGIN_NAMES = keys(webpack).filter(key => key.endsWith('Plugin'))

const WEBPACK_OPTIMIZE_PLUGIN_NAMES = keys(webpack.optimize).filter(key => key.endsWith('Plugin'))

const CREATED = 'CREATED'
const PREPARING = 'PREPARING'
const FAILED = 'FAILED'
const PREPARED = 'PREPARED'
const READY = 'READY'
const WARNINGS = 'WARNINGS'
const ERRORS = 'ERRORS'

export const STATUSES = {
  CREATED,
  PREPARED,
  PREPARING,
  FAILED,
}

export const DID_FAIL = 'didFail'
export const WAS_PREPARED = 'wasPrepared'
export const WILL_PREPARE = 'willPrepare'
export const WILL_RUN = 'willRun'
export const WILL_INITIALIZE = 'willInitialize'

export const LIFECYCLE_HOOKS = {
  DID_FAIL,
  WAS_PREPARED,
  WILL_RUN,
}

export class Webpack extends Helper {
  static isCacheable = true

  static allowAnonymousProviders = true

  static isObservable = true

  static strictMode = false

  static get observables() {
    return {
      status: CREATED,

      configVersion: 0,

      moduleRulesMap: ['shallowMap', {}],

      automaticModuleRulesMap: ['shallowMap', {}],

      externalsMap: ['shallowMap', {}],

      moduleAliasMap: ['shallowMap', {}],

      moduleLocationsMap: ['shallowMap', {}],

      providedModulesMap: ['shallowMap', {}],

      definitionsMap: ['shallowMap', {}],

      pluginsMap: ['shallowMap', {}],

      progress: {
        percentComplete: 0,

        stage: 'Waiting',

        details: [],
      },
    }
  }

  toJSON() {
    const { name, cwd, uuid, progress, config, status, stats } = this
    return this.runtime.convertToJS({ progress, config, status, stats, uuid, name, cwd })
  }

  static get optionTypes() {
    return {
      cwd: 'string',
      entry: 'object',
      outputPath: 'string',
      libraryTarget: 'string',
      publicPath: 'string',
      outputFilename: 'string',
      externalModules: 'object',
      buildTarget: 'string',
      target: 'string',
      target: 'string',
      moduleAliases: 'object',
      moduleLocations: 'object',
    }
  }

  @observable configOptions = observable.shallowMap([])

  @action
  cfg(key, val) {
    this.configOptions.set(key, val)
  }

  initialize() {
    Promise.resolve(this.attemptMethodAsync(WILL_INITIALIZE))

    this.cfg('buildTarget', this.buildTarget)
    this.cfg('cwd', this.cwd)
    this.cfg('entry', this.entry)
    this.cfg('outputPath', this.outputPath)
    this.cfg('publicPath', this.publicPath)
    this.cfg('libraryTarget', this.libraryTarget)
    this.cfg('outputFilename', this.outputFilename)
    this.cfg('externalModules', this.externalModules)
    this.cfg('moduleFolders', this.moduleFolders)
    this.cfg('aliases', this.aliases)
    this.cfg('rules', this.rules)

    // TODO Add support for multiple configs; just need to
    // figure out clean defaults inheritance from provided args used in single config
    const configs = observable.map([])
    this.priv('configs', configs)

    // When a webpack compilation finishes. These objects can be pretty big
    // and we extract a lot of data from them but want to clear them from memory
    // when we're no longer using the compiler
    const stats = observable.shallowMap([])
    this.privateData.set('stats', stats)

    this.status = PREPARING

    this.prepare()
      .then(() => {
        this.status = PREPARED
      })
      .catch(error => {
        this.status = FAILED
        this.emit(DID_FAIL, error)
      })
  }

  async discover() {
    const c = stage => error => {
      this.runtime.error(`Error in discovery stage: ${stage}`, { message: error.message })
      return
    }

    //this.runtime.debug('discovering module locations')
    await this.discoverModuleLocations().catch(c('moduleLocations'))

    //this.runtime.debug('discovering module aliases')
    await this.discoverModuleAliases().catch(c('moduleAliases'))

    //this.runtime.debug('discovering externals')
    await this.discoverExternals().catch(c('externals'))

    //this.runtime.debug('discovering module rules')
    await this.discoverModuleRules().catch(c('moduleRules'))

    //this.runtime.debug('discovering module provide')
    await this.discoverProvidedModules().catch(c('providedModules'))

    //this.runtime.debug('discovering definitions')
    await this.discoverDefinitions().catch(c('definitions'))

    //this.runtime.debug('discovering other plugins')
    await this.discoverPlugins().catch(c('plugins'))

    //this.runtime.debug("discovering entry points")
    //await this.discoverEntryPoints()

    return this
  }

  /*
  get configMaps() {
    return this.chain
      .pick(
        "externalsMap",
        "moduleLocationsMap",
        "moduleAliasMap",
        "moduleRulesMap",
        "providedModulesMap",
        "definitionsMap",
        "pluginsMap",
        "configOptions"
      )
      .value()
  }
  */

  async startFileManager(options = {}) {
    await this.runtime.fileManager.startAsync(options)
    return this.runtime.fileManager
  }

  get fileManager() {
    return this.get('runtime.fileManager', {})
  }

  get packageFinder() {
    return this.get('runtime.packageFinder', {})
  }

  async prepare() {
    this.fireHook(WILL_PREPARE)

    await this.startFileManager()
    await this.discover()

    await this.refreshConfig()

    /**
     For each configMap, create an observer which refreshes the config on change
    this.hideProperties(
      this.chain
        .get("configMaps")
        .mapValues((map, name) => map.observe(() => this.refreshConfig().then(() => {

        })))
        .mapKeys((map, name) => name.replace(/Map$/, "Observer"))
        .value()
    )
    */

    const observe = mapName =>
      this[mapName].observe(update => {
        this.refreshConfig()
          .then(() => this.runtime.debug(`refreshed config in response to change in ${mapName}`))
          .catch(error =>
            this.runtime.error(`Error while refreshing config ${mapName}`, {
              message: error.message,
            })
          )
      })

    const moduleAliasMap = observe('moduleAliasMap')
    const moduleRulesMap = observe('moduleRulesMap')
    const moduleLocationsMap = observe('moduleLocationsMap')
    const providedModulesMap = observe('providedModulesMap')
    const definitionsMap = observe('definitionsMap')
    const configOptions = observe('configOptions')
    const externalsMap = observe('externalsMap')
    const pluginsMap = observe('pluginsMap')

    this.stopObserving = () => {
      moduleLocationsMap()
      moduleAliasMap()
      definitionsMap()
      moduleRulesMap()
      configOptions()
      providedModulesMap()
      externalsMap()
      pluginsMap()

      return this
    }

    await this.refreshConfig()

    this.status = PREPARED

    this.emit(WAS_PREPARED)

    return this
  }

  prepareEventWasFired(options = {}) {
    const f = this
    const { timeout = 30 * 1000 } = options

    const ok = resolve => () => resolve(f)
    const notOk = (reject, err) => f => reject(err)

    if (this.status === FAILED || this.status === PREPARED) {
      return Promise.resolve(this)
    }

    return new Promise((resolve, reject) => {
      f.once(WAS_PREPARED, () => ok(resolve)())
      f.once(DID_FAIL, err => notOk(reject, err)())
    })
      .timeout(timeout)
      .catch(error => f)
      .then(() => f)
  }

  /**
    Returns a Promise which will resolve if, or when the file manager is activated
  */
  async whenPrepared(options = {}) {
    if (this.status === PREPARED) {
      return this
    }

    if (this.status === CREATED) {
      await this.prepare()
    } else if (this.status === PREPARING) {
      await this.prepareEventWasFired(options).catch(e => e)
    }

    return this
  }

  async refreshConfig() {
    const { isEmpty } = this.lodash
    let config = await this.generateConfig()

    const result = this.attemptMethod('configWasGenerated', config)

    if (!isEmpty(result)) {
      config = result
    }

    this.updateConfig(this.name, config)

    this.configVersion = this.configVersion + 1
    return config
  }

  @action
  externalize(...args) {
    if (args.length === 2 && (typeof args[0] === 'string' && typeof args[1] === 'string')) {
      this.externalsMap.set(...args)
    }

    return this
  }

  async attemptMethodAsync(method, ...args) {
    const o = this.tryGet(method)

    if (o && isFunction(o)) {
      return await Promise.resolve(o.call(this, ...[...args, this.context])).catch(error => false)
    } else if (o) {
      return await o
    } else if (this.configOptions.has(method)) {
      const meth = this.configOptions.get(meth)

      if (isFunction(meth)) {
        return await meth.call(this, ...[...args, this.context]).catch(error => undefined)
      } else {
        return await meth
      }
    } else {
      return Promise.resolve()
    }
  }
  /**
    Discover external modules will analyze the project folder
    and for the build target, determine from the package.json, etc
    which module requests should be treated as external.
  */
  async discoverExternals() {
    const externals = await this.attemptMethodAsync('externals')

    if (isObject(externals)) {
      Object.keys(externals).forEach(k => this.externalsMap.set(k, externals[k]))
    }

    return this
  }

  @action
  moduleLocation(a, b) {
    this.moduleLocationsMap.set(a, b || a)
    return this
  }

  async discoverModuleLocations() {
    const moduleLocations = await this.attemptMethodAsync('moduleLocations')

    if (isObject(moduleLocations)) {
      Object.keys(moduleLocations).forEach(k => this.moduleLocation(k, moduleLocations[k]))
    }

    return this
  }

  @action
  alias(a, b) {
    this.moduleAliasMap.set(a, b)
    return this
  }

  async discoverModuleAliases() {
    const moduleAliases = await this.attemptMethodAsync('moduleAliases')
    const packageAliases = this.get('runtime.currentPackage.aliases', {})
    const configuredAliases = this.aliases || {}

    const aliasConfig = this.lodash.defaults({}, configuredAliases, moduleAliases, packageAliases)

    this.lodash.mapValues(aliasConfig, (dest, pkg) => {
      this.alias(pkg, dest)
    })

    return this
  }

  @action
  define(a, b) {
    this.definitionsMap.set(a, typeof b === 'string' ? b : JSON.stringify(b))
    return this
  }

  async discoverDefinitions() {
    const definitions = await this.attemptMethodAsync('definitions')
    const hardCoded = this.tryResult('define', () =>
      this.get('runtime.currentPackage.define', this.get('runtime.options.define'))
    )
    const definitionsConfig = this.lodash.defaults({}, definitions, hardCoded)

    this.lodash.mapValues(definitionsConfig, (v, k) => {
      this.define(k, v)
    })

    return this
  }

  @action
  provide(a, b) {
    this.providedModulesMap.set(a, b)
    return this
  }

  async discoverProvidedModules() {
    const providedModules = await this.attemptMethodAsync('providedModules')
    const hardCoded = this.tryResult('provide', () =>
      this.get('runtime.currentPackage.provide', this.get('runtime.options.provide'))
    )
    const providedModulesConfig = this.lodash.defaults({}, providedModules, hardCoded)

    this.lodash.mapValues(providedModulesConfig, (v, k) => {
      this.provide(k, v)
    })

    return this
  }

  @action
  rule(name, options = {}) {
    const { defaultsDeep } = this.runtime.lodash

    const existing = this.moduleRulesMap.get(name)

    if (existing) {
      options === false
        ? this.moduleRulesMap.remove(name)
        : this.moduleRulesMap.set(name, defaultsDeep({}, options, existing))
    } else {
      this.moduleRulesMap.set(name, defaultsDeep({}, options))
    }

    return this
  }

  async discoverModuleRules() {
    //const { fileManager } = this
    //const extensions = fileManager.extensions.filter(f => f.length)

    this.rules.forEach((rule, i) => {
      rule.name = rule.name || `rule-${i}`
      this.rule(rule.name, this.lodash.omit(rule, 'name'))
    })

    return this
  }

  @action
  plugin(name, ...args) {
    const keys = this.pluginsMap.keys().filter(k => k.startsWith(name))
    const key = `${name}-${keys.length}`
    this.pluginsMap.set(key, { name, key, args })
    return this
  }

  async discoverPlugins() {
    const plugins = await this.attemptMethodAsync('webpackPlugins')

    if (isEmpty(plugins)) {
      //this.runtime.debug('None found')
      return this
    }

    if (isObject(plugins)) {
      Object.keys(plugins).forEach(k => this.plugin(k, plugins[k]))
    }

    return this
  }

  priv(k, v) {
    if (k && v) {
      this.privateData.set(k, v)
      return this.privateData.get(k)
    } else if (k && !v) {
      return this.privateData.get(k)
    }
  }

  get configOptions() {
    return this.priv('configOptions')
  }

  set buildTarget(val) {
    this.configOptions.set('buildTarget', val)
    return val
  }

  set cwd(val) {
    this.configOptions.set('cwd', val)
    return val
  }

  set libraryTarget(val) {
    this.configOptions.set('libraryTarget', val)
    return val
  }

  set outputPath(val) {
    this.configOptions.set('outputPath', val)
    return val
  }

  set publicPath(val) {
    this.configOptions.set('publicPath', val)
    return val
  }

  set outputFilename(val) {
    this.configOptions.set('outputFilename', val)
    return val
  }

  set entry(val) {
    this.configOptions.set('entry', val)
    return val
  }

  // Get input parameters from the config options observable map if theyre set
  // otherwise, check the options, or provider, as usual for helpers.  this makes it
  // so once the config options observable has control of the value, it can be changed
  // by an external UI and we can react to that
  configOption(param, defaultVal) {
    const result = this.invoke('configOptions.has', param)
      ? this.invoke('configOptions.get', param)
      : this.tryResult(param, defaultVal)

    if (result) return result

    return typeof defaultVal === 'function' ? defaultVal.call(this, param) : defaultVal
  }

  get pkg() {
    return this.result('options.pkg', () => this.runtime.currentPackage)
  }

  @computed
  get buildTarget() {
    return this.configOption('buildTarget') || this.configOption('target', 'web')
  }

  @computed
  get aliases() {
    return this.configOption('aliases', {})
  }

  @computed
  get rules() {
    return this.configOption('rules', [])
  }

  @computed
  get moduleFolders() {
    return uniq(
      compact([
        ...this.configOption('moduleFolders', []),
        ...this.configOption('moduleLocations', []),
      ])
    )
  }

  @computed
  get cwd() {
    return this.configOption('cwd', this.runtime.cwd)
  }

  @computed
  get externalModules() {
    return this.configOption('externalModules', {})
  }

  @computed
  get publicPath() {
    return this.configOption('publicPath', this.buildTarget.match(/electron/i) ? '' : '/')
  }

  @computed
  get outputPath() {
    const outputPath = this.configOption('outputPath', () => 'dist')
    return this.runtime.resolve(outputPath)
  }

  @computed
  get outputFilename() {
    return this.configOption('outputFilename', '[name].js')
  }

  @computed
  get libraryTarget() {
    return this.configOption('libraryTarget', 'umd')
  }

  @computed
  get entry() {
    const { runtime } = this

    return this.configOption(
      'entry',
      this.tryResult('entry', () => {
        const indexPath = runtime.fsx.existsSync(runtime.join('src', 'index.js'))
          ? runtime.join('src', 'index.js')
          : runtime.join('index.js')

        return {
          index: [indexPath],
        }
      })
    )
  }

  @computed
  get plugins() {
    const values = this.pluginsMap
      .values()
      .map(v => this.runtime.convertToJS(v))
      .map(({ name, args } = {}) => {
        const Plugin = this.resolvePlugin(name)
        return new Plugin(...args)
      })

    if (this.configOption('hot')) {
      const opts = this.configOption('hot')
      values.push(new webpack.HotModuleReplacementPlugin(typeof opts === 'object' ? opts : {}))
    }

    return [...values]
  }

  @computed
  get isConfigValid() {
    return !webpack.validate(this.config).length
  }

  @computed
  get configValidationMessages() {
    return this.validateConfig()
      .map(m => m && m.message)
      .filter(f => f)
  }

  validateConfig() {
    return webpack.validate(this.config)
  }

  devServer(options = {}) {}

  /**
    Attempts to return a webpack plugin constructor given a string for convenience
  */
  resolvePlugin(pluginReference) {
    if (typeof pluginReference !== 'string') {
      return pluginReference
    }

    const { runtime } = this

    if (WEBPACK_PLUGIN_NAMES.indexOf(pluginReference) >= 0) {
      return webpack[pluginReference]
    } else if (WEBPACK_OPTIMIZE_PLUGIN_NAMES.indexOf(pluginReference) >= 0) {
      return webpack.optimize[pluginReference]
    } else if (pluginReference.startsWith('optimize.')) {
      return webpack.optimize[pluginReference]
    }

    const { packageFinder } = runtime

    let resolvesTo = __non_webpack_require__.resolve(pluginReference)

    if (!resolvesTo) {
      try {
        resolvesTo = packageFinder.attemptResolve(pluginReference)
      } catch (e) {}
    }

    try {
      if (resolvesTo) {
        const pluginFn = __non_webpack_require__(resolvesTo)
        return pluginFn.default ? pluginFn.default : pluginFn
      } else {
        return false
      }
    } catch (error) {
      this.runtime.error(`Error resolving plugin`, { resolvesTo, error: error.message })
      return false
    }
  }

  /**
    Given a list of plugin names, get an object back

    @example

      const {
        HtmlWebpackPlugin,
        DefinePlugin,
        HotModuleReplacementPlugin
      } = this.resolvePlugins('HotModuleReplacementPlugin', 'DefinePlugin', 'html-webpack-plugin')
  */
  resolvePlugins(...pluginRefs) {
    const { camelize, snakeCase } = this.runtime.stringUtils

    return this.chain
      .plant(pluginRefs)
      .keyBy(
        ref => (ref.match(/^[a-z]/) ? camelize(snakeCase(ref.replace(/^optimize./, ''))) : ref)
      )
      .mapValues(ref => this.resolvePlugin(ref))
      .value()
  }

  configVersion = 0

  @action
  updateConfig(key, config) {
    this.configVersion = this.configVersion + 1
    this.configs.set(key, config)
    return this
  }

  @action
  setExternal(request, resolution) {}

  @computed
  get definitions() {
    return this.chain.invoke('definitionsMap.toJSON').value()
  }

  @computed
  get providedModules() {
    return this.chain.invoke('providedModulesMap.toJSON').value()
  }

  @computed
  get target() {
    return this.configOption('target', 'web')
  }

  /**
    References the stats.errors
  */
  @computed
  get errors() {
    return this.getStat('errors') || []
  }

  /**
    References the stats.warnings
  */
  @computed
  get warnings() {
    return this.getStat('warnings') || []
  }

  /**
    References the stats.hash
  */
  @computed
  get hash() {
    return this.getStat('hash') || []
  }

  /**
    References the stats.time
  */
  @computed
  get time() {
    const { children = [] } = this

    return children.length > 0 ? sum(children.map(m => m.time)) : this.getStat('time')
  }

  /**
    References the stats.assetsByChunkName
  */
  @computed
  get assetsByChunkName() {
    return this.getStat('assetsByChunkName') || {}
  }

  @computed
  get assetPaths() {
    const { outputPath } = this
    return this.chain
      .get('assetsByChunkName')
      .mapValues(basename => this.runtime.resolve(outputPath, basename))
      .value()
  }

  @computed
  get wasSuccessful() {
    return !this.hasErrors && !this.hasWarnings && this.hasOutput
  }

  @computed
  get hasErrors() {
    return this.errors && this.errors.length > 0
  }

  @computed
  get hasWarnings() {
    return this.warnings && this.warnings.length > 0
  }

  @computed
  get hasOutput() {
    return Object.keys(this.assetsByChunkName).length
  }

  /**
    References the stats.chunks
  */
  @computed
  get chunks() {
    return this.getStat('chunks') || []
  }

  /**
    References the stats.modules
  */
  @computed
  get modules() {
    return this.getStat('modules') || []
  }

  /**
    References the stats.filteredModules
  */
  @computed
  get filteredModules() {
    return this.getStat('filteredModules')
  }

  /**
    References the stats.children
  */
  @computed
  get children() {
    return this.getStat('children') || []
  }

  getStat(stat) {
    return this._stats.get(stat)
  }

  @computed
  get stats() {
    return this._stats.toJSON()
  }

  @computed
  get config() {
    const values = this.configs.values()

    if (values.length > 1) {
      if (this.configs.has(this.name)) {
        return this.runtime.convertToJS(this.configs.get(this.name))
      } else {
        throw 'Multi configs not supported yet'
      }
    }

    const cfg =
      values.length === 1
        ? this.runtime.convertToJS(values[0])
        : values.length === 0 ? {} : this.runtime.convertToJS(values)

    return this.lodash.mapValues(cfg, (v, k) => this.runtime.convertToJS(v))
  }

  get hasBabelRc() {
    return this.runtime.fsx.existsSync(this.runtime.resolve(this.cwd, '.babelrc'))
  }

  get localBabelRc() {
    return (
      (this.hasBabelRc &&
        this.runtime.fsx.readJsonSync(this.runtime.resolve(this.cwd, '.babelrc'))) ||
      {}
    )
  }

  @computed
  get disableBabel() {
    return this.configOption('babel') === false || this.configOption('disableBabel')
  }

  @computed
  get babelConfig() {
    const fn = this.tryGet('babelConfig')

    if (this.configOptions.has('babelConfig')) {
      return this.runtime.convertToJS(this.configOptions.get('babelConfig'))
    } else if (
      this.configOption('babelrc') === false &&
      this.configOption('babel') !== false &&
      fn
    ) {
      return { babelrc: false, ...this.runtime.convertToJS(this.tryResult('babelConfig')) }
    } else if (this.configOption('babel') !== false && this.hasBabelRc) {
      return this.localBabelRc
    } else if (this.configOption('babel') !== false && !this.hasBabelRc && fn) {
      return { ...this.runtime.convertToJS(this.tryResult('babelConfig')) }
    } else if (!fn && !this.hasBabelRc && this.configOption('babel') !== false) {
      return {}
    }
  }

  @computed
  get automaticModuleRules() {
    const rules = this.automaticModuleRulesMap
    const moduleRules = this.moduleRulesMap

    if (
      this.runtime.argv.enableAutoBabel &&
      !this.disableBabel &&
      !rules.has('babel') &&
      !moduleRules.has('babel')
    ) {
      rules.set('babel', {
        include: [this.runtime.cwd],
        exclude: [this.runtime.join('node_modules'), path => !path.startsWith(this.runtime.cwd)],
        use: compact([
          {
            loader: 'babel-loader',
            options: this.babelConfig,
          },
        ]),
      })
    }

    !rules.has('yaml') && !moduleRules.has('yaml')
    rules.set('yaml', [
      {
        test: /\.(yml|yaml)$/i,
        include: [this.runtime.cwd],
        use: ['json-loader', 'yaml-loader'],
      },
    ])

    // if it already has json don't do anything
    !rules.has('json') && !moduleRules.has('json')
    rules.set('json', [
      {
        loader: 'json-loader',
        test: /\.json$/,
        include: [this.runtime.cwd],
      },
    ])

    return Object.values(rules.toJSON())
  }

  @computed
  get moduleRules() {
    return this.lodash.flatten([...this.generatedModuleRules, ...this.automaticModuleRules])
  }

  @computed
  get generatedModuleRules() {
    const ruleNames = this.moduleRulesMap.keys()
    const { lodash: { omit }, convertToJS: toJS } = this.runtime

    return ruleNames.map(ruleName => {
      const rule = toJS(this.moduleRulesMap.get(ruleName))
      const { name = ruleName, loader, use = [] } = rule

      if (use.length === 0 && !loader) {
        use.unshift({ loader: `${name}-loader` })
      } else if (use.length === 0 && loader) {
        use.unshift(loader)
      }

      const formatted = { ...omit(rule, 'name'), use }

      if (isEmpty(formatted.use)) {
        delete formatted.use
      }

      return formatted
    })
  }
  /**

  */
  findExternalModulesIn(options = {}) {}

  @computed
  get externals() {
    const { isRequestExternal } = this
    return [isRequestExternal.bind(this)]
  }

  get privateData() {
    const result = privateData.get(this)

    if (!result) {
      privateData.set(this, new Map())
    }

    return privateData.get(this)
  }

  set _stats(rawStats) {
    this.privateData.set('rawStats', rawStats)

    // remove source
    const json = rawStats.toJson({ source: false })

    // Set stats on our observable map
    mapValues(json, (v, k) => {
      this._stats.set(k, v)
    })

    return json
  }

  get _stats() {
    return this.privateData.get('stats')
  }

  get configs() {
    return this.privateData.get('configs')
  }

  get _configs() {
    return this.privateData.get('configs')
  }

  get rawStats() {
    return (
      this.privateData.get('rawStats') || {
        toString() {
          return 'Waiting to run'
        },
        toJson() {
          return {}
        },
      }
    )
  }

  stringifyStats(options = {}) {
    const stats = this.privateData.get('rawStats')
    return stats
      ? stats.toString(typeof options === 'string' ? options : { colors: true, ...options })
      : 'Waiting to run.'
  }

  /**
    Run the webpack compiler and return the stats object

    @param {async Function} compilerWillRun
    @param {async Function} compilerDidFinish
  */
  async run(options = {}) {
    const { compilerWillRun, compilerDidFinish } = options

    await this.whenPrepared()

    if (!this.isConfigValid) {
      throw new Error(`Configuration is invalid. See this.configValidationMessages`)
    }

    await this.refreshConfig()

    const compiler = await this.compiler(options)

    this.fireHook(WILL_RUN, compiler, compiler.options)

    try {
      await this.attemptMethodAsync('compilerWillRun', compiler)
      if (isFunction(compilerWillRun)) {
        await compilerWillRun.call(this, compiler)
      }
    } catch (error) {
      this.runtime.error(`Error while running compilerWillRun hooks`, {
        message: error.message,
        stack: error.stack,
      })
      throw error
    }

    const stats = await compiler.runAsync(options).catch(err => {
      this.runtime.error(`Compiler run error`, { message: err.message, stack: err.stack })
      return false
    })

    if (stats) {
      this._stats = stats
    }

    if (this.errors.length) {
      this.status = ERRORS
    } else if (this.warnings.length) {
      this.status = WARNINGS
    } else if (!this.warnings.length && !this.errors.length) {
      this.status = READY
    }

    try {
      await this.attemptMethodAsync('compilerDidFinish', compiler, stats)
      if (isFunction(compilerDidFinish)) {
        await compilerDidFinish.call(this, compiler)
      }
    } catch (error) {
      this.runtime.error(`Error while running compilerWillRun hooks`, {
        message: error.message,
        stack: error.stack,
      })
      throw error
    }

    return this
  }

  /**
    Start a webpack compiler in watch mode

    @param {Number} options.aggregateTimeout - default 300, number in ms
    @param {Boolean|Number} options.poll - default false, a number in ms to poll
    @param {RegExp} options.ignored - ignore certain folders from being watched

    @see https://webpack.js.org/configuration/watch/
  */
  async watch(options = {}, cb) {
    const { runtime } = this
    const compiler = await this.compiler(options)

    const { aggregateTimeout = 300, poll = false, ignored = /node_modules/ } = options

    compiler.watch({ aggregateTimeout, ignored, poll }, (err, stats) => {
      if (!err && stats) {
        this._stats = stats
      }

      if (typeof cb === 'function') {
        cb(err, stats)
        return
      }

      if (err) {
        runtime.error(`Fatal error in watcher: ${err.message}`)
        return
      }

      runtime.debug(`Webpack watcher success`)
    })
  }

  /**
    @param {async Function} prepareWebpackConfig - called with the initial configuration object
    @param {Function} mapConfig - a function which gets called with a config object, and should return one
  */
  async generateConfig(options = {}) {
    const { prepareWebpackConfig, mapConfig = identity } = { ...this.options, ...options }

    let config = await this.loadConfig(options)

    config = castArray(config)

    await this.attemptMethodAsync('prepareWebpackConfig', config)

    if (isFunction(prepareWebpackConfig)) {
      await prepareWebpackConfig.call(this, config, this.context)
    }

    config.map(obj => pick(obj, VALID_CONFIG_KEYS)).forEach((cfg, i) => {
      const name = cfg.name || `${this.name}${i}`

      try {
        const injected = this.injectFinalPlugins(cfg)
        this.updateConfig(name, this.sanitizeConfig(mapConfig(injected)))
      } catch (error) {
        this.updateConfig(name, this.sanitizeConfig(mapConfig(cfg)))
      }
    })

    return this.config
  }

  sanitizeConfig(config = {}) {
    if (config.module && isEmpty(config.module.rules)) {
      delete config.module.rules
    }

    if (config.module && isEmpty(config.module)) {
      delete config.module
    }

    return config
  }

  get webpack() {
    return webpack
  }

  get loaderUtils() {
    return require('loader-utils')
  }

  hmrEntry(entry, options = {}) {
    const { pick } = this.runtime.lodash
    const qs = require('querystring').stringify(
      pick(
        options,
        'path',
        'name',
        'overlay',
        'timeout',
        'dynamicPublicPath',
        'noInfo',
        'quiet',
        'reload'
      )
    )

    const { client = 'webpack-hot-middleware/client' } = options

    return [`${client}?${qs}`, entry]
  }

  async createDevServer(options = {}) {
    const WebpackDevServer = require('webpack-dev-server')
    const { pick } = this.runtime.lodash
    const compiler = await this.createCompiler(options)
    const server = new WebpackDevServer(compiler, {
      ...options,
      setup(app, devServer) {
        if (options.hot) {
          app.use(
            require('webpack-hot-middleware')(compiler, {
              path: '/__webpack_hmr',
              log: false,
              ...pick(options.middlewareOptions || options || {}, 'log', 'heartbeat', 'path'),
            })
          )
        }

        if (typeof options.setup === 'function') {
          options.setup(app, devServer)
        }
      },
    })

    return server
  }

  /**
    compilerWillMount
    awaits generateConfig
    compilerWasCreated
  */
  async createCompiler(options = {}) {
    const catcher = label => err => {
      this.runtime.error(`Error in ${label}`, { message: err.message, stack: err.stack })
      throw err
    }

    await this.attemptMethodAsync('compilerWillMount').catch(catcher(`compilerWillMount`))

    const { compilerWasCreated, compilerWillMount } = { ...this.options, ...options }

    if (isFunction(compilerWillMount)) {
      await compilerWillMount
        .call(this, { ...this.options, ...options })
        .catch(catcher(`compilerWillMount Option`))
    }

    await this.refreshConfig()

    const { config = this.config } = { ...this.options, ...options }

    // we make an observable _configs
    const compiler = webpack(config)

    await this.attemptMethodAsync('compilerWasCreated', compiler, config, this.context).catch(
      catcher(`compilerWasCreated`)
    )

    if (isFunction(compilerWasCreated)) {
      await compilerWasCreated
        .call(this, compiler, config, this.context)
        .catch(catcher(`compilerWasCreated option`))
    }

    async function runAsync(opts = {}) {
      return new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
          err ? reject(err) : resolve(stats)
        })
      })
    }

    compiler.runAsync = runAsync.bind(compiler)

    return compiler
  }

  async compiler(options = {}) {
    if (this.compilerInstance) return this.compilerInstance

    const compilerInstance = await this.createCompiler.call(this, options)

    this.hide('compilerInstance', compilerInstance)

    return compilerInstance
  }

  injectFinalPlugins(config = {}) {
    const { plugins = [] } = config

    const { NamedModulesPlugin, ProgressPlugin, DefinePlugin, ProvidePlugin } = this.resolvePlugins(
      'NamedModulesPlugin',
      'DefinePlugin',
      'ProgressPlugin',
      'ProvidePlugin'
    )

    plugins.push(new NamedModulesPlugin())

    plugins.push(
      new ProgressPlugin((percentComplete, stage, ...args) => {
        this.progress.percentComplete = percentComplete * 100
        this.progress.stage = stage
        this.progress.details.length = 0
        this.progress.details.push(...args)
      })
    )

    if (!isEmpty(this.definitions)) {
      plugins.push(new DefinePlugin(this.definitions))
    }

    if (!isEmpty(this.providedModules)) {
      plugins.push(new ProvidePlugin(this.providedModules))
    }

    this.attemptMethod('injectPlugins', plugins, config)

    return config
  }

  /**
    willLoadConfig
  */
  async loadConfig(options = {}) {
    options = { ...this.options, ...options }
    const { uniq, pick, defaultsDeep } = this.runtime.lodash

    // If the user wants to use standard webpack config, just export a property called
    // standard config, and we will skip any attempts to add to it
    if (this.tryGet('standardConfig')) {
      return this.attemptMethodAsync(
        'standardConfig',
        this.runtime.get('argv.env', this.runtime.env),
        {
          ...this.runtime.argv,
          ...options,
        }
      )
    }

    const providedConfig = mapValues(
      pick(this.provider || {}, VALID_CONFIG_KEYS),
      (v, k) => (isFunction(v) ? v.call(this, this.options, this.context) : v)
    )
    //const { packageFinder } = this.runtime
    // const moduleLocations = await packageFinder.findPackageLocations()

    await this.attemptMethodAsync('willLoadConfig', { options, providedConfig })

    const {
      libraryTarget = this.libraryTarget,
      outputPath = this.outputPath,
      outputFilename = this.outputFilename,
      buildTarget = this.buildTarget,
      entry = this.entry,
      cwd = this.cwd,
      publicPath = this.publicPath,
      externalizeDependencies = (options.buildTarget || this.buildTarget) !== 'web',
      descriptionFiles = ['package.json'],
      moduleLocations = ['packages', 'node_modules'],
      devtool = this.runtime.get('argv.devtool', 'cheap-module-eval-source-map'),
      loaderModuleLocations = [
        skypager.resolve(__dirname, 'node_modules'),
        skypager.resolve(__dirname, '..'),
      ],
    } = options

    const webpackConfig = this.tryResult('webpackConfig', {})

    //console.log('Webpack Config Before Defaults', webpackConfig)
    //console.log('Aliases', this.moduleAliasMap.toJSON())

    const cfg = defaultsDeep({}, webpackConfig, {
      target: buildTarget,

      entry,

      devtool: devtool,

      context: this.configOption('context', this.runtime.resolve(cwd)),

      plugins: compact([
        ...castArray(webpackConfig.plugins),
        ...castArray(providedConfig.plugins),
        ...castArray(options.plugins),
        ...castArray(this.plugins),
      ]),

      externals: compact([
        ...castArray(webpackConfig.externals),
        ...castArray(providedConfig.externals),
        ...castArray(options.externals),
        ...this.externals,
      ]),

      resolveLoader: {
        modules: uniq([...loaderModuleLocations, 'packages', 'node_modules']),
      },

      resolve: {
        descriptionFiles,
        alias: this.moduleAliasMap.toJSON(),
        modules: uniq(
          compact([
            ...uniq([
              this.configOption('context', this.runtime.resolve(cwd)),
              this.runtime.resolve(cwd),
              this.runtime.resolve(cwd, 'src'),
              ...compact(moduleLocations),
            ]),
            ...castArray(providedConfig.moduleLocations),
            ...castArray(options.moduleLocations),
          ])
        ),
        cachePredicate({ path, request } = {}) {
          return true
        },
      },

      module: {
        rules: compact([
          ...castArray(webpackConfig.rules),
          ...castArray(options.rules),
          ...this.moduleRules,
        ]),
      },

      output: {
        path: outputPath,
        libraryTarget,
        filename: outputFilename,
        publicPath,
        ...options.output,
      },
    })

    if (externalizeDependencies && typeof externalizeDependencies !== 'string') {
      cfg.externals.push(
        this.generateExternalsFunction.call(this, {
          pkg: this.pkg,
          ...this.tryResult('externalsOptions', {}),
        })
      )
    }

    const finalizeConfig = this.tryGet('finalizeConfig')

    if (typeof finalizeConfig === 'function') {
      return finalizeConfig.call(this, cfg) || cfg
    } else {
      return cfg
    }
  }

  isRequestExternal(ctx, req, callback) {
    if (typeof callback !== 'function') {
      callback = function() {}
    }

    // this.runtime.debug(`is request external?`, { ctx, req })

    if (this.externalsMap.has(req)) {
      callback(null, this.externalsMap.get(req))
      return true
    }

    callback(null)
    return false
  }

  /**
    @param {Object|String} pkg - a JSON representation, or path to a package.json manifest
    @param {String} modulesDir - absolute path to a node_modules folder which has our external modules init
  */
  generateExternalsFunction(options = {}) {
    const externalsHelper = require('./externals').call(this, options)

    return (ctx, req, cb) => {
      externalsHelper(ctx, req, (err, result) => {
        if (typeof result !== 'undefined') {
          //runtime.debug("Externals Helper", { ctx, req, result })
        }

        cb(err, result)
      })
    }
  }

  async findLoaders(options = {}) {
    const loaderPaths = await this.packageFinder.find(/-loader$/, options)

    return this.chain
      .plant(loaderPaths)
      .keyBy(path => path.split('/').pop())
      .mapValues((path, name) => ({
        path,
        name,
        resolved: this.packageFinder.attemptResolve(name),
      }))
      .value()
  }

  async findPlugins(options = {}) {
    const pluginPaths = await this.packageFinder.find(/webpack-plugin/, options)

    return this.chain
      .plant(pluginPaths)
      .keyBy(path => path.split('/').pop())
      .mapValues((path, name) => ({
        path,
        name,
        resolved: this.packageFinder.attemptResolve(name),
      }))
      .value()
  }

  static attach(runtime, options = {}) {
    const result = Helper.attach(runtime, Webpack, {
      lookupProp: 'webpack',
      registryProp: 'webpacks',
      registry:
        options.registry ||
        Helper.createContextRegistry('webpacks', {
          context: Helper.createMockContext(),
        }),
      ...options,
    })

    runtime.compiler = async function createWebpackCompiler(...args) {
      const w = runtime.webpack(...args)

      await w.whenPrepared()
      await w.refreshConfig()

      return w
    }

    /*
    if (!runtime.get([options.lookupProp || 'webpack', 'plugins'])) {
      runtime.set([options.lookupProp || 'webpack', 'plugins'], Helper.createContextRegistry('webpackPlugins', {
        context: Helper.createMockContext(),
      }))
    }

    if (!runtime.get([options.lookupProp || 'webpack', 'loaders'])) {
      runtime.set([options.lookupProp || 'webpack', 'loaders'], Helper.createContextRegistry('webpackLoaders', {
        context: Helper.createMockContext(),
      }))
    }
    */

    return result
  }
}

export function initializer(next) {
  const runtime = this
  Webpack.attach(runtime)
  next && next.call && next.call(this)
}

export default Webpack

export const attach = Webpack.attach

export const registerHelper = () => {
  if (Helper.registry.available.indexOf('webpack') === -1) {
    Helper.registerHelper('webpack', () => Webpack)
  }
}

export const VALID_CONFIG_KEYS = [
  'entry',
  'context',
  'output',
  'plugins',
  'devtool',
  'devServer',
  'resolve',
  'module',
  'watch',
  'watchOptions',
  'externals',
  'performance',
  'stats',
  'amd',
  'bail',
  'cache',
  'loader',
  'profile',
  'recordsPath',
  'recordsInputPath',
  'recordsOutputPath',
  'name',
  'target',
  'buildTarget',
  'moduleAliases',
  'moduleLocations',
  'moduleFolders',
  'externalizeDependencies',
]

/*
const mapContext = req =>
  req.keys().reduce(
    (memo, key) => ({
      ...memo,
      [key.replace(/\.\//, "").replace(/\.js$/, "")]: req(key).default || req(key),
    }),
    {},
  )
*/
