import { relative, join, resolve, parse, sep, basename, dirname } from 'path'
import { parse as parseUrl, format as formatUrl } from 'url'
import { parse as parseQueryString } from 'querystring'

import * as _mobx from 'mobx'
import _lodash from './lodash-dependencies'
import * as _propUtils from './utils/properties'
import { attachEmitter } from './utils/emitter'
import mware from './utils/mware'
import _Helper from './helpers/index'
import Feature from './helpers/feature'
import Cache from './cache'
import WeakCache from './weak-cache'
import _configBuilder from './config-builder'
import * as _stringUtils from './utils/string'

export const lodash = _lodash
export const mobx = _mobx
export const observableMap = mobx.observable.map
export const propUtils = _propUtils
export const urlUtils = { parseUrl, formatUrl, parseQueryString }
export const pathUtils = { join, parse, resolve, sep, basename, dirname, relative }
export const stringUtils = _stringUtils
export const Helper = _Helper
export const ContextRegistry = Helper.ContextRegistry
export const configBuilder = _configBuilder

export const registerHelper = Helper.registerHelper
export const createRegistry = Helper.createRegistry
export const helpers = Helper.registry
export const features = Feature.registry
export const events = attachEmitter({})

const map = observableMap
const { camelCase, snakeCase } = stringUtils
const { hashObject, createEntity: entity, hide, enhanceObject } = propUtils
const { observe, extendObservable, observable, toJS, computed, action, autorun } = mobx

const selectorCache = new WeakMap()

const {
  result,
  keys,
  pick,
  isFunction,
  omitBy,
  mapValues,
  toPairs,
  zipObjectDeep,
  uniq,
  castArray,
  defaultsDeep: defaults,
  isEmpty,
  isArray,
  isObject,
  flatten,
} = lodash

let runtimesRegistry
let frameworkRuntime
let singleton

export class Runtime {
  displayName = 'Skypager'

  static spawn(options = {}, context = {}, fn) {
    return new Runtime(options, context, fn)
  }

  spawn(options = {}, context = {}, middlewareFn) {
    if (isFunction(options)) {
      middlewareFn = options
      options = {}
      context = context || {}
    }

    if (isFunction(context)) {
      middlewareFn = context
      context = {}
    }

    return this.constructor.spawn(
      { ...this.options, ...options },
      { ...this.context, ...context },
      middlewareFn
    )
  }

  static get runtimes() {
    const base = this

    if (runtimesRegistry) {
      return runtimesRegistry
    }

    runtimesRegistry = new ContextRegistry('runtimes', {
      context: Helper.createMockContext(),
      wrapper(fn) {
        return (...args) => new fn(...args)
      },
      fallback(id) {
        return base || Runtime
      },
    })

    runtimesRegistry.register('universal', () => Runtime)

    return runtimesRegistry
  }

  static initializers = new ContextRegistry('initializers', {
    context: Helper.createMockContext(),
    useDefaultExport: true,
  })

  get initializers() {
    return this.constructor.initializers || Runtime.initializers
  }

  get runtimes() {
    return this.constructor.runtimes || Runtime.runtimes
  }

  static get events() {
    return events
  }

  registerRuntime(...args) {
    return this.constructor.registerRuntime(...args)
  }

  static registerRuntime(name, runtimeClass) {
    Runtime.runtimes.register(name, () => runtimeClass)
    return runtimeClass
  }

  registerHelper(...args) {
    return this.constructor.registerHelper(...args)
  }

  static registerHelper(name, helperClass) {
    registerHelper(name, () => helperClass)
    return helperClass
  }

  log(...args) {
    this.invoke('logger.log', ...args)
  }
  warn(...args) {
    this.invoke('logger.warn', ...args)
  }
  debug(...args) {
    this.invoke('logger.debug', ...args)
  }
  error(...args) {
    this.invoke('logger.error', ...args)
  }
  info(...args) {
    this.invoke('logger.info', ...args)
  }

  constructor(options = {}, context = {}, middlewareFn) {
    if (isFunction(options)) {
      middlewareFn = options
      options = {}
      context = context || {}
    }

    if (isFunction(context)) {
      middlewareFn = context
      context = {}
    }

    context = { ...global, ...context }

    enhanceObject(this, lodash)
    attachEmitter(this)

    this.hide('logger', options.logger || console, true)
    this.events.emit('runtimeWasCreated', this, this.constructor)

    this.hideGetter('parent', () => context.parent || singleton)

    this.hide('configHistory', [], false)
    this.hide('uuid', require('uuid')())

    this.hide('_name', options.name || camelCase(snakeCase(this.cwd.split('/').pop())))
    this.hideGetter('name', () => this._name)

    this.hide('cache', new Cache(options.cacheData || []))
    this.hide('weakCache', new WeakCache(options.cacheData || [], this))

    this.hide('rawOptions', options)
    this.hide('optionsWithDefaults', defaults({}, options, this.defaultOptions))

    this.hideGetter(
      'context',
      pick(defaults({}, context, this.defaultContext), ...keys(this.contextTypes))
    )

    let { start, initialize, prepare } = this

    if (isFunction(options.initialize))
      initialize = lodash.flow(this.initialize, options.initialize)

    if (isFunction(options.prepare)) prepare = lodash.flow(this.prepare, options.prepare)

    this.hide('initialize', initializeSequence.bind(this, this, initialize), true)
    this.hide('prepare', prepareSequence.bind(this, this, prepare), true)
    this.hide('start', startSequence.bind(this, this, start), true)

    this.hide('middlewares', { [STARTING]: mware(this), [PREPARING]: mware(this) })

    this.hide('_enabledFeatures', {})

    this.hide(
      'registries',
      new ContextRegistry('registries', {
        context: require.context('.', false, /mock/),
      })
    )

    this.hide(
      'selectors',
      new ContextRegistry('selectors', {
        context: require.context('.', false, /mock/),
      })
    )

    this.hideGetter('selectorCache', () => {
      if (selectorCache.has(this)) {
        return selectorCache.get(this)
      }
      selectorCache.set(this, new Map([]))

      return selectorCache.get(this)
    })

    extendObservable(this, {
      state: map(toPairs(this.initialState)),
    })

    this.applyRuntimeInitializers()

    if (typeof options.configure === 'function') {
      this.configure(options.configure.bind(this))
    }

    // autoAdd refers to require.contexts that should be added to our registries
    // this step is deferred until all helpers have been attached.
    this.constructor.autoAdd.forEach(item => {
      const { type, ctx } = item
      this.invoke(`${type}.add`, ctx)
    })

    this.attachAllHelpers()

    if (typeof middlewareFn === 'function') {
      this.use(middlewareFn.bind(this), INITIALIZING)
    }

    // autoConfigs are functions that can be passed in before our runtime gets created
    // their execution is deferred until all of the helper initialization is finished and
    // right before the features get enabled
    this.autoConfigs.forEach(fn => this.configure(fn))
    this.constructor.autoConfigs = this.constructor.autoConfigs.filter(
      fn => typeof fn === 'function' && !fn.temp
    )

    this.enableFeatures(this.autoEnabledFeatures)

    if (this.autoInitialize) this.initialize()
  }

  set name(val) {
    this.hide('_name', val, true)
    return val
  }

  get autoInitialize() {
    return (
      this.at('argv.autoInitialize', 'constructor.autoInitialize').find(
        v => typeof v !== 'undefined'
      ) !== false
    )
  }

  get autoPrepare() {
    return (
      this.at('argv.autoPrepare', 'constructor.autoPrepare').find(v => typeof v !== 'undefined') !==
      false
    )
  }

  get autoEnabledFeatures() {
    const { helperTags = [] } = this

    return (
      this.chain
        // whatever our constructor defines
        .get('constructor.autoEnable', {})
        .keys()
        .concat(
          this.chain
            .get('config.features', {})
            .pickBy(
              v =>
                v &&
                v.disabled !== true &&
                v.enabled !== false &&
                v.disable !== true &&
                v.enable !== false
            )
            .keys()
            .value()
        )
        // plus whatever features are already available whose name matches a helper tag prefix
        .concat(this.availableFeatures.filter(id => helperTags.find(tag => id.indexOf(tag) === 0)))
        // plus whatever features are requested in the options passed to our constructor
        .concat(castArray(this.get('argv.enable', [])))
        .flatten()
        .uniq()
        .reject(featureId => this.availableFeatures.indexOf(featureId) === -1)
        .value()
    )
  }

  static autoEnable = {
    vm: {},
    //'observable': {},
    //'configurable': {},
  }

  static get features() {
    return Feature.registry
  }

  get autoConfigs() {
    return this.get('constructor.autoConfigs', [])
      .filter(f => typeof f === 'function')
      .map(fn => fn.bind(this))
  }

  get runtimeInitializers() {
    const runtime = this
    const { initializers, helperTags: tags } = runtime
    const { pickBy } = this.lodash

    return pickBy(initializers.allMembers(), (fn, id) => !!tags.find(tag => id.indexOf(tag) === 0))
  }

  applyRuntimeInitializers() {
    const { mapValues } = this.lodash
    const matches = this.runtimeInitializers

    this.debug(`Applying runtime initializers`, {
      tags: this.helperTags,
      initializers: Object.keys(matches),
    })

    Helper.attachAll(this, this.helperOptions)

    mapValues(matches, (fn, id) => {
      try {
        this.use(fn.bind(this), INITIALIZING)
      } catch (error) {
        this.error(`Error while applying initializer ${id}`, { error })
      }
    })

    Helper.attachAll(this, this.helperOptions)

    return this
  }

  attachAllHelpers() {
    Helper.attachAll(this, this.helperOptions)
    return this
  }

  mixin(object = {}, options = {}) {
    this.applyInterface(object, {
      transformKeys: true,
      scope: this,
      partial: [],
      right: true,
      insertOptions: false,
      hidden: false,
      ...options,
    })

    return this
  }

  initialize() {
    return this
  }

  async prepare() {
    return this
  }

  async start() {
    return this
  }

  /**
    options will consist of the default options for this Runtime.
    If the runtime is running in strictMode then only the optionTypes
    that have been defined will be allowed
  */
  get options() {
    return this.constructor.strictMode !== false
      ? pick(this.optionsWithDefaults, ...keys(this.optionTypes))
      : this.argv
  }

  get url() {
    return this.isBrowser
      ? lodash.get('window.location', urlUtils.parse(`http://${stringUtils.kebabCase(this.name)}/`))
      : urlUtils.parse(`file://${argv.cwd}`)
  }

  get cwd() {
    return this.get(
      'argv.cwd',
      process && process.cwd ? process.cwd() : this.get('constructor.cwd', '')
    )
  }

  /**
    argv will refer to the initial options passed to the runtime, along with any default values that have been set
  */
  get argv() {
    return this.get('optionsWithDefaults', {})
  }

  set argv(val = {}) {
    this.set('optionsWithDefaults', { ...this.optionsWithDefaults, ...val })
  }

  /**
    The Runtime class can define option and context types, as well as any default
    options or context that should be set.
  */
  static contextTypes = {}

  get contextTypes() {
    return this.constructor.contextTypes
  }

  static defaultContext = {}

  get defaultContext() {
    return { ...global, ...result(this.constructor, 'defaultContext', {}) }
  }

  static optionTypes = typeof global.SkypagerOptionTypes === 'object'

  get optionTypes() {
    return this.constructor.optionTypes
  }

  static defaultOptions = {}

  get defaultOptions() {
    return defaults(
      this.get('packageOptions'),
      result(this.constructor, 'defaultOptions', {}),
      // Find some way to be able to inject ARGV in projects which consume skypager via webpack
      global.SKYPAGER_ARGV,
      global.ARGV
    )
  }

  get env() {
    if (this.isTest) return 'test'
    if (this.isDevelopment) return 'development'
    if (this.isProduction) return 'production'

    return 'development'
  }

  get target() {
    if (this.get('argv.universal')) return 'universal'
    if (this.get('argv.target')) return this.get('argv.target')
    if (this.isElectron) return 'electron'
    if (this.isNode) return 'node'
    if (this.isBrowser) return 'web'

    return 'node'
  }

  // Helps the runtime search for helper packages based on the environment and target combo
  get helperTags() {
    return this.get('options.helperTags', [
      this.env,
      `${this.env}/${this.target}`,
      this.target,
      `${this.target}/${this.env}`,
      'universal',
    ])
  }

  get isBrowser() {
    return !!(
      typeof window !== 'undefined' &&
      typeof document !== 'undefined' &&
      (typeof process === 'undefined' ||
        typeof process.type === 'undefined' ||
        process.type === 'web' ||
        process.type === 'browser')
    )
  }

  get isNode() {
    return !!(typeof process !== 'undefined' && !this.isElectron && process.title === 'node')
  }

  get isElectron() {
    return !!(
      typeof process !== 'undefined' &&
      typeof process.type !== 'undefined' &&
      typeof process.title !== 'undefined' &&
      (process.title.match(/electron/i) || process.versions['electron'])
    )
  }

  get isElectronRenderer() {
    return !!(
      typeof process !== 'undefined' &&
      process.type === 'renderer' &&
      typeof window !== 'undefined' &&
      typeof document !== 'undefined'
    )
  }

  get isReactNative() {
    return !!(
      typeof global !== 'undefined' &&
      typeof navigator !== 'undefined' &&
      navigator.product === 'ReactNative'
    )
  }

  get isDebug() {
    return !!this.get('argv.debug')
  }

  get isDevelopment() {
    return (
      !this.isProduction &&
      !this.isTest &&
      (this.get('argv.env') === 'development' ||
        !!this.get('argv.development') ||
        !!this.get('argv.dev') ||
        process.env.NODE_ENV === 'development' ||
        isEmpty(process.env.NODE_ENV))
    )
  }

  get isTest() {
    return (
      !this.isProduction &&
      (this.get('argv.env') === 'test' ||
        !!this.get('argv.test') ||
        process.env.NODE_ENV === 'test')
    )
  }

  get isProduction() {
    return (
      this.get('argv.env') === 'production' ||
      !!this.get('argv.production') ||
      !!this.get('argv.prod') ||
      process.env.NODE_ENV === 'production'
    )
  }

  runMiddleware(stage) {
    stage = stage || this.stage

    const runtime = this
    const pipeline = runtime.get(['middlewares', stage])

    if (!pipeline) {
      return Promise.resolve(this)
    }

    if (pipeline.getCount() === 0) {
      pipeline.use(next => {
        next()
      })
    }

    return new Promise((resolve, reject) => {
      pipeline.run(err => {
        err ? reject(err) : resolve(err)
      })
    })
  }

  configure(...args) {
    if (args.length === 0) return this.configurator()

    let [fn] = args

    if (typeof fn === 'function') {
      const builder = fn(this.configurator())
      this.hide('builder', builder, true)
      this.configHistory.push(this.builder.history)
      return this
    } else if (typeof fn === 'object') {
      this.set('argv.baseConfig', defaultsDeep({}, fn, this.argv.baseConfig))
    }

    return this
  }

  get config() {
    return this.configurator().getConfig()
  }

  static initialState = {}

  stateVersion = 0

  get initialState() {
    return defaults({}, this.get('argv.initialState'), this.constructor.initialState)
  }

  @computed
  get currentState() {
    const { convertToJS } = this
    const { mapValues } = this.lodash

    return mapValues(this.state.toJSON(), v => convertToJS(v))
  }

  @computed
  get cacheKey() {
    return `${this.namespace}:${this.stateVersion}`
  }

  get stage() {
    return this.get('currentState.stage')
  }

  get isInitialized() {
    return this.get('currentState.initialized', false)
  }

  whenStarted(fn) {
    if (this.isStarted) {
      fn.call(this, this, this.options, this.context)
    } else {
      this.once('runtimeDidStart', () => fn.call(this, this.options, this.context))
    }

    return this
  }

  whenReady(fn) {
    return this.whenPrepared(fn)
  }

  whenPrepared(fn) {
    if (this.isPrepared) {
      fn.call(this, this, this.options, this.context)
    } else {
      this.once('runtimeIsPrepared', () => fn.call(this, this.options, this.context))
    }

    return this
  }

  get isPrepared() {
    return this.get('currentState.prepared', this.isRunning || this.isStarted)
  }

  get isRunning() {
    return this.get('currentState.started', false)
  }

  get isStarted() {
    return this.get('currentState.started', false)
  }

  beginTrackingState() {
    if (this.mainDisposer) {
      return this
    }

    const mainDisposer = autorun((...args) => {
      this.stateVersion = this.stateVersion + 1
      const { currentState, stateVersion } = this
      this.emit('change', this, currentState, stateVersion, ...args)
      this.fireHook('stateDidChange', currentState, stateVersion, ...args)
      this.events.emit('runtimeDidChange', this, currentState, stateVersion, ...args)
    })

    const stateDisposer = this.state.observe((update = {}) => {
      const { currentState, stateVersion } = this
      this.fireHook(`${update.name}DidChangeState`, update, currentState, stateVersion)
      this.emit('stateWasUpdated', update, currentState, stateVersion)
    })

    this.hide('mainDisposer', () => {
      mainDisposer()
      stateDisposer()
      return this
    })

    return this
  }

  @action
  replaceState(newState = {}) {
    return this.state.replace(toPairs(newState))
  }

  @action
  setState(newState = {}) {
    const { toPairs } = this.lodash
    return this.state.merge(toPairs(newState))
  }

  stateDidChange() {}

  observe(listener, prop) {
    return observe(prop ? this.get(prop) : this, change => listener.call(this, change))
  }

  makeObservable(properties = {}, target) {
    target = target || this

    properties = omitBy(properties, (val, key) => lodash.has(target, key))

    // WOW clean this up
    // prettier-ignore
    return extendObservable(target, mapValues(properties, val => {
        if (isArray(val) && val[0] === "map" && isObject(val[1])) {
          return observable.map(toPairs(val[1]))
        } else if (isArray(val) && val[0] === "shallowMap" && isObject(val[1])) {
          return observable.shallowMap(toPairs(val[1]))
        } else if (isArray(val) && val[0] === "object") {
          return observable.object(val[1] || {})
        } else if (isArray(val) && val[0] === "shallowObject") {
          return observable.shallowObject(val[1] || {})
        } else if (isArray(val) && val[0] === "shallowArray") {
          return observable.shallowArray(val[1] || [])
        } else if (isArray(val) && val[0] === "array") {
          return observable.array(val[1] || [])
        } else if (isArray(val) && val[0] === "struct") {
          return observable.struct(val[1] || [])
        } else if (isArray(val) && val[0] === "computed" && isFunction(val[1])) {
          return computed(val[1].bind(target))
        } else if (isArray(val) && val[0] === "action" && isFunction(val[1])) {
          return action(val[1].bind(target))
        } else {
          return val
        }
      })
    )
  }

  createObservable(properties = {}, observerFn, scope) {
    const instance = observable(properties)

    if (observerFn) {
      const disposer = observe(instance, change =>
        observerFn.call(scope || instance, change, instance, this.context)
      )

      hide(instance, 'cancelObserver', () => {
        disposer()
        return instance
      })
    }

    hide(instance, 'toJS', () => toJS(instance))

    return instance
  }

  observeState(handler) {
    return this.state.observe(handler)
  }

  interceptState(handler) {
    return this.state.intercept(handler)
  }

  convertToJS(...args) {
    return toJS(...args)
  }

  strftime(...args) {
    return require('./strftime')(...args)
  }

  didCreateObservableHelper(helperInstance, helperClass) {
    if (!helperInstance.has('state')) {
      makeStateful(helperInstance)
    }

    if (helperInstance.tryGet('observables')) {
      this.makeObservable(
        helperInstance.tryResult('observables', {}, helperInstance.options, helperInstance.context),
        helperInstance
      )
    }

    if (helperClass.observables) {
      const observables = isFunction(helperClass.observables)
        ? helperClass.observables.call(
            helperInstance,
            helperInstance.options,
            helperInstance.context
          )
        : helperClass.observables

      this.makeObservable(observables, helperInstance)
    }
  }

  static ContextRegistry = ContextRegistry
  static Helper = Helper

  static mobx = mobx
  get mobx() {
    return this.constructor.mobx
  }

  static observableMap = observable.map
  get observableMap() {
    return observable.map
  }

  static lodash = lodash
  get lodash() {
    return lodash
  }

  static pathUtils = pathUtils

  get pathUtils() {
    return pathUtils
  }

  static stringUtils = stringUtils

  get stringUtils() {
    return stringUtils
  }

  static propUtils = propUtils

  get propUtils() {
    return propUtils
  }

  static urlUtils = urlUtils
  get urlUtils() {
    return urlUtils
  }

  get Runtime() {
    return Runtime
  }

  get BaseRuntime() {
    return Runtime
  }

  get helperEvents() {
    return Helper.events
  }

  get runtimeEvents() {
    return events
  }

  get events() {
    return events
  }

  get sandbox() {
    return this.createSandbox(this.context)
  }

  get availableFeatures() {
    const mine = this.get('features.available', [])
    const constructors = this.get('constructor.features.available', [])

    return uniq([...mine, ...constructors])
  }

  get enabledFeatures() {
    return this.chain
      .invoke('featureStatus.toJSON')
      .pickBy({ status: 'enabled' })
      .mapValues(
        ({ cacheKey } = {}, featureId) => this.cache.get(cacheKey) || this.feature(featureId)
      )
      .value()
  }

  get enabledFeatureIds() {
    return this.chain
      .get('enabledFeatures')
      .keys()
      .value()
  }

  get featureRefs() {
    const { isEmpty } = this.lodash
    return this.chain
      .get('enabledFeatures')
      .mapKeys(feature => feature.provider.createGetter || feature.provider.getter)
      .omitBy((v, k) => isEmpty(k))
      .value()
  }

  isFeatureEnabled(name) {
    return this.lodash.has(this.enabledFeatures, name)
  }

  enableFeatures(options = {}) {
    const { availableFeatures } = this

    if (typeof options === 'string' || typeof options === 'undefined') {
      options = [options].filter(v => v)
    }

    if (isArray(options)) {
      options = options.reduce((memo, val) => {
        if (typeof val === 'string') {
          memo[val] = {}
        } else if (isArray(val)) {
          memo[val[0]] = val[1]
        } else {
        }

        return memo
      }, {})
    }

    return mapValues(pick(options, availableFeatures), (cfg, id) => {
      let feature
      try {
        if (this.features.checkKey(id)) {
          feature = this.feature(id)
        } else if (this.constructor.features.available.indexOf(id) >= 0) {
          feature = this.feature(id, { provider: this.constructor.features.lookup(id) })
        }

        feature.enable(cfg)
        this.fireHook('featureWasEnabled', feature, this)
        Helper.attachAll(this, this.helperOptions)

        return feature
      } catch (error) {
        this.fireHook('featureFailedToEnable', feature, error)
        return error
      }
    })
  }

  fireHook(hookName, ...args) {
    const fnHandler = this.get(['options', hookName], this.get(hookName))

    this.runtimeEvents.emit(`runtime:${hookName}`, this, ...args)
    this.emit(`firingHook`, hookName, ...args)
    this.emit(hookName, ...args)

    if (fnHandler) {
      try {
        fnHandler.call(this, ...args)
      } catch (error) {
        this.emit('hookError', hookName, error)
      }
    }

    return this
  }

  get configBuilder() {
    return configBuilder
  }

  get Helper() {
    return this.get('options.helperClass', this.get('context.helperClass', Helper))
  }

  get helperOptions() {
    return this.get('options.helperOptions', this.get('context.helperOptions'), {})
  }

  get helpers() {
    return this.Helper.registry
  }

  get allHelpers() {
    return this.Helper.allHelpers
  }

  get namespace() {
    return this.get('options.namespace', 'skypager-runtime')
  }

  /*
  get use() {
    const runtime = this
    const fn = this.useMiddleware.bind(this)
    const configPresets = Object.keys(this.getConfigPresets())
    const configurator = this.configurator()

    const shortcuts = configPresets
      .filter(id => !lodash.has(fn, id))
      .reduce((memo, name) => ({
        ...memo,
        finish() {

        },
        [name]: (...args) => {
          runtime.configure(c => c[name](...args))
          return runtime.configurator()
        },
      }), {})

    return Object.assign(fn, shortcuts)
  }
  */

  use(fn, stage) {
    const runtime = this

    //this.debug('using ', { fnType: (typeof fn), keys: Object.keys(fn), stage })

    if (typeof fn === 'object' && typeof fn.initializer === 'function') {
      return this.use(fn.initializer.bind(this), INITIALIZING)
    } else if (typeof fn === 'object' && typeof fn.attach === 'function') {
      fn.attach.call(this, this, this.options, this.context)
    }

    if (typeof fn === 'object' && typeof (fn.middleware || fn.use) === 'function') {
      fn = fn.middleware || fn.use || fn.default
      stage = stage || PREPARING
    }

    if (typeof fn === 'string') {
      if (runtime.availableFeatures.indexOf(fn) >= 0) {
        const featureId = fn.toString()
        fn = () => runtime.feature(featureId).enable()
        stage = stage || INITIALIZING
      } else {
        try {
          const mod = __non_webpack_require__(fn)
          return this.use(mod, stage || INITIALIZING)
        } catch (error) {}
      }
    }

    if (fn && typeof fn.call === 'function' && stage === INITIALIZING) {
      fn.call(runtime, err => {
        if (err) {
          runtime.error(err.message || `Error while using fn ${fn.name}`, { error: err })
          throw err
        }
      })

      return this
    }

    if (typeof fn !== 'function') {
      return this
    }

    if (typeof stage === 'undefined' && this.isPrepared) {
      stage = STARTING
    }

    // Get the middleware pipeline for this particular stage

    const pipeline = runtime.result(['middlewares', stage], () => {
      const p = mware(runtime)
      runtime.set(['middlewares', stage], p)
      return p
    })

    pipeline.use(fn.bind(runtime))

    return this
  }

  createRegistry(name, options = {}) {
    const registry = Helper.createRegistry(name, {
      context: Helper.createMockContext(),
      ...options,
    })

    this.fireHook('registryWasCreated', name, registry, options)

    return registry
  }

  createSandbox(ctx = {}) {
    return {
      // all aliases i've used over time for the same thing. should deprecrate them gracefully
      project: this,
      runtime: this,
      skypager: this,
      host: this,
      propUtils,
      stringUtils,
      urlUtils,
      mobx,
      lodash,
      currentState: this.currentState,
      ...this.featureRefs,
      ...ctx,
    }
  }

  /**
  * Observable property system base on Mobx
  */

  hashObject(...args) {
    return hashObject(...args)
  }

  createEntityFrom(...properties) {
    const src = this.slice(...properties)
    return entity(toJS(src))
  }

  slice(...properties) {
    return toJS(zipObjectDeep(properties, this.at(properties)))
  }

  tryGet(property, defaultValue) {
    return (
      this.at(`options.${property}`, `context.${property}`).filter(
        v => typeof v !== 'undefined'
      )[0] || defaultValue
    )
  }

  tryResult(property, defaultValue, options = {}, context = {}) {
    const val = this.tryGet(property)

    if (!val) {
      return typeof defaultValue === 'function'
        ? defaultValue.call(this, { ...this.options, ...options }, { ...this.context, ...context })
        : defaultValue
    } else if (typeof val === 'function') {
      return val.call(this, { ...this.options, ...options }, { ...this.context, ...context })
    } else {
      return val
    }
  }

  // Merge the objects found at k starting with at options, provider, projectConfig
  mergeGet(key, namespaces = ['options', 'argv', 'config']) {
    key = typeof key === 'string' ? key.split('.') : key
    key = flatten(castArray(key))

    return defaults({}, ...namespaces.map(n => this.get([n, ...key])))
  }

  // Merge the objects found at k starting with at options, provider, projectConfig
  // If the property is a function, it will be called in the scope of the helper, with the helpers options and context
  mergeResult(key, namespaces = ['options', 'argv', 'config']) {
    key = typeof key === 'string' ? key.split('.') : key
    key = flatten(castArray(key))

    const ifFunc = v => (typeof v === 'function' ? v.call(this, this.options, this.context) : v)

    return defaults({}, ...namespaces.map(n => this.get([n, ...key])).map(ifFunc))
  }

  async selectCached(selectorId, ...args) {
    if (this.selectorCache.get(selectorId)) {
      return this.selectorCache.get(selectorId)
    }

    return this.select(selectorId, ...args)
  }

  // run a selector from the selectors registry
  async select(selectorId, ...args) {
    let selector = this.selectors.lookup(selectorId)

    selector = isFunction(selector.default) ? selector.default : selector

    const result = await selector.call(this, this.chain, ...args)

    return isFunction(result.value) ? result.value() : result
  }

  async selectThru(selectorId, ...args) {
    const fn =
      args.length && typeof args[args.length - 1] === 'function'
        ? args[args.length - 1]
        : this.lodash.identity

    const response = await this.selectChain(selectorId, ...args)

    return response.thru(fn).value()
  }

  async selectChainThru(selectorId, ...args) {
    const fn =
      args.length && typeof args[args.length - 1] === 'function'
        ? args[args.length - 1]
        : this.lodash.identity

    const response = await this.selectChain(selectorId, ...args)

    return response.thru(fn)
  }

  // run a selector, stay in lodash chain mode
  async selectChain(selectorId, ...args) {
    const results = await this.select(selectorId, ...args)
    return lodash.chain(results)
  }

  get configPresets() {
    return this.availableFeatures.map(featureId => camelCase(snakeCase(featureId))).reduce(
      (memo, featureId) => ({
        ...memo,
        [featureId]: function(builder, ...args) {
          return builder.feature(featureId, ...args)
        },
      }),
      {}
    )
  }

  static configFeatures() {
    return {
      helper(existing, helperId, opts) {
        if (!existing && !helperId) return
        if (!helperId) return existing
        if (!existing && helperId) existing = {}
        opts = opts || {}

        return {
          ...existing,
          [helperId]: {
            ...(existing[helperId] || {}),
            ...opts,
          },
        }
      },
      feature(existing, featureId, opts) {
        if (!existing && !featureId) return
        if (!featureId) return existing
        if (!existing && featureId) existing = {}
        opts = opts || {}

        featureId = camelCase(snakeCase(featureId))

        return {
          ...existing,
          [featureId]: {
            ...(existing[featureId] || {}),
            ...opts,
          },
        }
      },
    }
  }

  static configReducers() {
    return {
      feature(state = {}) {
        return state.feature || {}
      },
      helper(state = {}) {
        return state.helper || {}
      },
    }
  }

  static configPresets() {
    return {}
  }

  get baseConfig() {
    return this.mergeResult('baseConfig', ['argv', 'constructor']) || {}
  }

  configurator(options = {}) {
    if (this.builder) {
      return this.builder
    }

    const { scope = this, tap = this.tryGet('tapConfig') } = options

    const features = this.getConfigFeaturesObject(options.features)
    const reducers = this.getConfigReducersObject(options.reducers)
    const presets = this.getConfigPresetsObject(options.presets)

    return configBuilder.call(this, {
      features,
      reducers,
      presets,
      baseConfig: {
        ...this.baseConfig,
        ...(options.baseConfig || {}),
      },
      history: this.configHistory,
      scope,
      tap,
      onStash: (...a) => this.emit('config:stashed', ...a),
      onReset: (...a) => this.emit('config:reset', ...a),
      ...this.configuratorOptions,
      ...options,
    })
  }

  get configuratorOptions() {
    return this.mergeResult('configuratorOptions', ['argv', 'constructor']) || {}
  }

  get configKeysFn() {
    return (v, k) => stringUtils.pluralize(k)
  }

  stringifyConfig() {
    return this.config.toString()
  }

  getConfigFeaturesObject(passed = {}) {
    let options = this.options.configFeatures || (c => ({}))
    let mine = this.configFeatures || (c => ({}))
    let constructors = this.constructor.configFeatures || (c => ({}))

    options = isFunction(options) ? options.call(this, this.options, this.context) : options || {}

    constructors = isFunction(constructors)
      ? constructors.call(this, this.options, this.context)
      : constructors || {}

    mine = isFunction(mine) ? mine.call(this, this.options, this.context) : mine || {}

    return Object.assign({}, constructors, mine, options, passed)
  }

  getConfigFeatures(passed = {}) {
    const base = omitBy(this.getConfigFeaturesObject(passed), v => !isFunction(v))
    return mapValues(base, fn => fn.bind(this))
  }

  getConfigPresetsObject(passed = {}) {
    let options = this.options.configPresets || (c => ({}))
    let mine = this.configPresets || (c => ({}))
    let constructors = this.constructor.configPresets || (c => ({}))

    options = isFunction(options) ? options.call(this, this.options, this.context) : options || {}

    constructors = isFunction(constructors)
      ? constructors.call(this, this.options, this.context)
      : constructors || {}

    mine = isFunction(mine) ? mine.call(this, this.options, this.context) : mine || {}

    return Object.assign({}, constructors, mine, options, passed)
  }

  getConfigPresets(passed = {}) {
    const base = omitBy(this.getConfigPresetsObject(passed), v => !isFunction(v))
    return mapValues(base, fn => fn.bind(this))
  }

  getConfigReducersObject(passed = {}) {
    let options = this.options.configReducers || (c => ({}))
    let mine = this.configReducers || (c => ({}))
    let constructors = this.constructor.configReducers || (c => ({}))

    options = isFunction(options) ? options.call(this, this.options, this.context) : options || {}

    constructors = isFunction(constructors)
      ? constructors.call(this, this.options, this.context)
      : constructors || {}

    mine = isFunction(mine) ? mine.call(this, this.options, this.context) : mine || {}

    return Object.assign({}, constructors, mine, options, passed)
  }

  getConfigReducers(passed = {}) {
    const base = omitBy(this.getConfigReducersObject(passed), v => !isFunction(v))
    return mapValues(base, fn => fn.bind(this))
  }

  static get framework() {
    return (frameworkRuntime = frameworkRuntime || Runtime.createSingleton())
  }

  static createSingleton(...args) {
    return (global.skypager = global.skypager || (singleton = singleton || new this(...args)))
  }

  static autoConfigs = []
  static autoAdd = []
}

export const createSingleton = Runtime.createSingleton.bind(Runtime)

export const INITIALIZING = 'INITIALIZING'
export const INITIALIZED = 'INITIALIZED'
export const PREPARING = 'PREPARING'
export const READY = 'READY'
export const STARTING = 'STARTING'
export const RUNNING = 'RUNNING'
export const START_FAILURE = 'START_FAILURE'
export const PREPARE_FAILURE = 'PREPARE_FAILURE'
export const INITIALIZE_FAILURE = 'INITIALIZE_FAILURE'

export const stages = {
  INITIALIZING,
  INITIALIZED,
  PREPARING,
  READY,
  STARTING,
  RUNNING,
  START_FAILURE,
  INITIALIZE_FAILURE,
  PREPARE_FAILURE,
}

export function initializeSequence(runtime, initializeMethod) {
  if (runtime.isInitialized) return runtime

  runtime.fireHook('beforeInitialize', runtime)

  runtime.beginTrackingState()
  runtime.setState({ stage: INITIALIZING, initialized: true })

  try {
    initializeMethod.call(runtime)
  } catch (error) {
    runtime.setState({ stage: INITIALIZE_FAILURE, error })
    throw error
  }

  runtime.fireHook('afterInitialize', runtime)
  runtime.setState({ stage: INITIALIZED })
  events.emit('runtimeDidInitialize', runtime, runtime.constructor)

  runtime.attachAllHelpers()

  if (runtime.autoPrepare !== false) Promise.resolve(runtime.prepare())

  return runtime
}

export async function prepareSequence(runtime, prepareMethod) {
  if (runtime.isPrepared) return runtime

  runtime.setState({ stage: PREPARING })
  runtime.fireHook('preparing')

  try {
    await this.runMiddleware(PREPARING)
  } catch (error) {
    runtime.setState({ stage: PREPARE_FAILURE, error })
    runtime.fireHook('prepareDidFail', error)
    throw error
  }

  try {
    if (typeof runtime.options.prepare === 'function') {
      await Promise.resolve(runtime.options.prepare.call(runtime, runtime.argv, runtime.sandbox))
    }

    await prepareMethod.call(runtime, runtime.argv, runtime.sandbox)

    runtime.setState({ stage: READY, prepared: true })
  } catch (error) {
    runtime.setState({ stage: PREPARE_FAILURE, error })
    runtime.fireHook('prepareDidFail', error)
    throw error
  }

  runtime.fireHook('runtimeIsPrepared')
  return runtime
}

export async function startSequence(runtime, startMethod) {
  if (runtime.stage === RUNNING) return runtime
  if (runtime.isStarted) return runtime

  const beforeHooks = runtime
    .at('options.beforeStart', 'beforeStart', 'options.runtimeWillStart', 'runtimeWillStart')
    .filter(f => typeof f === 'function')

  events.emit('runtimeIsStarting', runtime, runtime.constructor)

  if (beforeHooks.length > 0) {
    try {
      await Promise.all(beforeHooks.map(fn => fn.call(runtime, runtime.argv, runtime.sandbox)))
    } catch (error) {
      runtime.setState({ stage: START_FAILURE, error, failureStage: 'beforeHooks' })
      throw error
    }
  }

  try {
    runtime.setState({ stage: STARTING })
    await this.runMiddleware(STARTING)
  } catch (error) {
    runtime.setState({ stage: START_FAILURE, error, failureStage: 'middlewares' })
    throw error
  }

  try {
    await startMethod.call(runtime, runtime.options)
  } catch (error) {
    runtime.setState({ stage: START_FAILURE, error })
    throw error
  }

  runtime.setState({ stage: RUNNING, started: true })
  runtime.fireHook('runtimeDidStart', runtime, runtime.currentState)
  events.emit('runtimeDidStart', runtime, runtime.currentState, runtime.constructor)

  return this
}

export function makeStateful(obj) {
  obj.stateVersion = 0

  extendObservable(obj, {
    state: map(toPairs(obj.initialState || {})),
    currentState: computed(() => obj.state.toJSON()),
  })

  autorun((...args) => {
    const stateVersion = (obj.stateVersion = obj.stateVersion + 1)
    const { currentState } = obj
    obj.emit('change', obj, currentState, stateVersion)
    obj.fireHook('stateDidChange', currentState, stateVersion)
  })

  obj.state.observe((update = {}) => {
    obj.fireHook(`${update.name}DidChangeState`, update)
  })

  //obj.getter('currentState', () => obj.state.toJSON())

  return obj
}

export default Runtime
