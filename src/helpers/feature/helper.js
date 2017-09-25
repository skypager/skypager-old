import Helper from "./helper.js"
import defaults from "lodash/defaults"

const isFunction = o => typeof o === "function"

export class Feature extends Helper {
  static isCacheable = true

  static dirname = __dirname

  static createRegistry(...args) {
    const reg = Helper.createContextRegistry("features", {
      context: require.context("../features", false, /\.js$/),
    })

    reg.enabled = {}

    return reg
  }

  static attach(project, options = {}) {
    return Helper.attach(project, Feature, {
      registryProp: "features",
      lookupProp: "feature",
      cacheHelper: true,
      isCacheable: true,
      registry: Feature.registry,
      ...options,
    })
  }

  initialize() {
    this.applyInterface(this.featureMixin, this.featureMixinOptions)
  }

  get featureMixinOptions() {
    const opts = this.tryResult("featureMixinOptions") || this.tryResult("mixinOptions") || {}
    return defaults({}, opts, this.defaultMixinOptions)
  }

  get hostMixinOptions() {
    const opts = this.tryResult("hostMixinOptions") || this.tryResult("mixinOptions") || {}
    return defaults({}, { scope: this.host }, opts, this.defaultMixinOptions)
  }

  get defaultMixinOptions() {
    return {
      transformKeys: true,
      scope: this,
      partial: [this.context],
      insertOptions: true,
      right: true,
      hidden: false,
    }
  }

  enable(cfg) {
    if (typeof cfg === "object") {
      const { options } = this
      const { defaultsDeep: defaults } = this.runtime.lodash
      this.set("options", defaults({}, cfg, options))
    } else if (isFunction(cfg)) {
      this.configure(cfg.bind(this))
    }

    try {
      this.host.applyInterface(this.hostMixin, this.hostMixinOptions)
    } catch (error) {}

    try {
      this.attemptMethod("featureWasEnabled", cfg, this.options)
    } catch (error) {
      this.host && this.host.error && this.host.error(`Error while enabling feature: ${this.name}`, { error })
    }

    this.set(`host._enabledFeatures.${this.name}`, this.cacheKey)

    return this
  }

  runMethod(methodName, ...args) {
    const method = this.tryGet(methodName, this.get(methodName))
    return isFunction(method) && method.call(this, ...args.push(this.context))
  }

  get hostMixin() {
    return this.projectMixin
  }

  get projectMixin() {
    return this.chain
      .get("hostMethods")
      .filter(m => isFunction(this.tryGet(m)))
      .keyBy(m => m)
      .mapValues(m => this.tryGet(m))
      .pickBy(v => isFunction(v))
      .value()
  }

  get featureMixin() {
    const hostMethods = this.hostMethods

    return this.chain
      .get("featureMethods")
      .filter(m => hostMethods.indexOf(m) === -1 && isFunction(this.tryGet(m)))
      .keyBy(m => m)
      .mapValues(m => this.tryGet(m))
      .pickBy(v => isFunction(v))
      .value()
  }

  get featureMethods() {
    return this.tryResult("featureMethods", [])
  }

  get runtimeMethods() {
    return this.tryResult("runtimeMethods", () => this.hostMethods)
  }

  get hostMethods() {
    return this.tryResult("projectMethods", this.tryResult("hostMethods", []))
  }

  get projectMethods() {
    return this.tryResult("projectMethods", this.tryResult("hostMethods", []))
  }

  get dependencies() {
    return this.tryGet("dependencies", {})
  }

  get isSupported() {
    return this.tryResult("isSupported", true)
  }
}

export default Feature

export const isCacheable = true

export const attach = Feature.attach

Feature.registry = Feature.createRegistry()
