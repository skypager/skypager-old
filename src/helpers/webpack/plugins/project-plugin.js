import mapValues from "lodash/mapValues"
import values from "lodash/values"
import uniq from "lodash/uniq"
import pick from "lodash/pick"
import partial from "lodash/partial"

export class ProjectPlugin {
  static setup(host, options) {
    const hooks = defineAllHooks()
    const names = uniq(values(hooks).map(Object.keys))
    const handlerFunctions = pick(module.exports, names)

    Object.assign(host, mapValues(handlerFunctions, fn => partial(fn, host)))

    return new ProjectPlugin(host, options)
  }

  constructor(host, options = {}) {
    this.apply = this.apply.bind(this, host)
  }

  apply(host, compiler) {
    const hooks = HookDefinitions

    mapValues(hooks.compiler, (cfg, eventName) => {
      compiler.plugin(cfg.webpackId, (...args) => {
        console.log("Compiler Should call", eventName)
        if (cfg.isAsync) {
          args[args.length - 1]()
        }
      })

      compiler.plugin("compilation", compilation => {
        mapValues(hooks.compilation, (cfg, eventName) => {
          compilation.plugin(cfg.webpackId, (...args) => {
            console.log("Compilation Should call", eventName)
            if (cfg.isAsync) {
              args[args.length - 1]()
            }
          })
        })
      })
    })
  }
}

export default ProjectPlugin

export const defineAllHooks = () => {
  defineCompilerHook("compilerIsRunning", "run", true, "compiler", "callback")

  defineCompilerHook("compilerIsWatching", "watch-run", true, "watching", "callback")

  defineCompilerHook("compilationIsReady", "compilation", false, "compilation")

  defineCompilerHook("didEnterCompilePhase", "compile", false)

  defineCompilerHook("handleMake", "make", false, "compilation")

  defineCompilerHook("didFinishCompilePhase", "after-compile", true, "compilation")

  defineCompilerHook("willEmit", "emit", true, "compilation", "callback")

  defineCompilerHook("didEmit", "after-emit", true, "compilation", "callback")

  defineCompilerHook("compilerIsDone", "done", false, "stats")

  defineCompilerHook("compilerProducedStats", "done", false, "stats")

  defineCompilerHook("compilerDidFail", "failed", false, "err")

  defineCompilerHook("compilerDetectedChange", "invalid", false)

  defineCompilationHook("willLoadModules", "normal-module-loader", false, "loaderContext", "module")

  defineCompilationHook("willSeal", "seal", false)

  defineCompilationHook("willOptimize", "optimize", false)

  defineCompilationHook("willOptimizeTree", "optimize-tree", true, "chunks", "modules", "callback")

  defineCompilationHook("willOptimizeChunks", "optimize-chunks", false, "chunks")

  defineCompilationHook("didOptimizeChunks", "after-optimize-chunks", false, "chunks")

  defineCompilationHook("willOptimizeModules", "optimize-modules", false, "modules")

  defineCompilationHook("didOptimizeModules", "after-optimize-modules", false, "modules")

  defineCompilationHook("didOptimizeModuleIds", "after-optimize-module-ids", false, "modules")

  defineCompilationHook("willOptimizeChunkAssets", "optimize-chunk-assets", true, "chunks", "callback")

  defineCompilationHook("didOptimizeChunkAssets", "after-optimize-chunk-assets", false, "chunks")

  defineCompilationHook("willOptimizeAssets", "optimize-assets", true, "assets", "callback")

  defineCompilationHook("didOptimizeAssets", "after-optimize-assets", false, "assets")

  defineCompilationHook("willBuildModule", "build-module", false, "module")

  defineCompilationHook("moduleWasSuccessful", "succeed-module", false, "module")

  defineCompilationHook("moduleWasFailure", "failed-module", false, "module")

  defineCompilationHook("didAddModuleAssets", "module-asset", false, "module", "filename")

  defineCompilationHook("didAddChunkAsset", "chunk-asset", false, "chunk", "filename")

  defineCompilationHook("beforeHash", "before-hash", false)

  defineCompilationHook("afterHash", "after-hash", false)

  defineCompilationHook("willRecord", "record", false, "compilation", "records")

  return HookDefinitions
}

export const HookDefinitions = {
  compiler: {},
  compilation: {},
  normalModuleFactories: {},
  contextModuleFactories: {},
  mainTemplate: {},
  normalResolvers: {},
  parser: {},
}

export function defineHook(type, eventName, webpackId, async, ...paramNames) {
  HookDefinitions[type][eventName] = {
    webpackId,
    eventName,
    type,
    async: !!async,
    isAsync: !!async,
    paramNames,
  }
}

export const defineCompilerHook = (...args) => defineHook("compiler", ...args)

export const defineCompilationHook = (...args) => defineHook("compilation", ...args)

export const defineParserHook = (...args) => defineHook("parser", ...args)

export const defineMainTemplateHook = (...args) => defineHook("mainTemplate", ...args)

// handle webpacks compiler watch-run event.
export function compilerIsWatching(host, watching, callback) {}

// handle webpacks compiler compilation event.
export function compilationIsReady(host, compilation) {}

// handle webpacks compiler compile event.
export function didEnterCompilePhase(host) {}

// handle webpacks compiler make event.
export function handleMake(host, compilation) {}

// handle webpacks compiler after-compile event.
export function didFinishCompilePhase(host, compilation) {}

// handle webpacks compiler emit event.
export function willEmit(host, compilation, callback) {}

// handle webpacks compiler after-emit event.
export function didEmit(host, compilation, callback) {}

// handle webpacks compiler done event.
export function compilerIsDone(host, stats) {}

// handle webpacks compiler done event.
export function compilerProducedStats(host, stats) {}

// handle webpacks compiler failed event.
export function compilerDidFail(host, err) {}

// handle webpacks compiler invalid event.
export function compilerDetectedChange(host) {}

// handle webpacks compilation normal-module-loader event.
export function willLoadModules(host, loaderContext, modules) {}

// handle webpacks compilation seal event.
export function willSeal(host) {}

// handle webpacks compilation optimize event.
export function willOptimize(host) {}

// handle webpacks compilation optimize-tree event.
export function willOptimizeTree(host, chunks, modules, callback) {}

// handle webpacks compilation optimize-chunks event.
export function willOptimizeChunks(host, chunks) {}

// handle webpacks compilation after-optimize-chunks event.
export function didOptimizeChunks(host, chunks) {}

// handle webpacks compilation optimize-modules event.
export function willOptimizeModules(host, modules) {}

// handle webpacks compilation after-optimize-modules event.
export function didOptimizeModules(host, modules) {}

// handle webpacks compilation after-optimize-module-ids event.
export function didOptimizeModuleIds(host, modules) {}

// handle webpacks compilation optimize-chunk-assets event.
export function willOptimizeChunkAssets(host, chunks, callback) {}

// handle webpacks compilation after-optimize-chunk-assets event.
export function didOptimizeChunkAssets(host, chunks) {}

// handle webpacks compilation optimize-assets event.
export function willOptimizeAssets(host, assets, callback) {}

// handle webpacks compilation after-optimize-assets event.
export function didOptimizeAssets(host, assets) {}

// handle webpacks compilation build-module event.
export function willBuildModule(host, m) {}

// handle webpacks compilation succeed-module event.
export function moduleWasSuccessful(host, m) {}

// handle webpacks compilation failed-module event.
export function moduleWasFailure(host, m) {}

// handle webpacks compilation module-asset event.
export function didAddModuleAssets(host, m, filename) {}

// handle webpacks compilation chunk-asset event.
export function didAddChunkAsset(host, chunk, filename) {}

// handle webpacks compilation before-hash event.
export function beforeHash(host) {}

// handle webpacks compilation after-hash event.
export function afterHash(host) {}

// handle webpacks compilation record event.
export function willRecord(host, compilation, records) {}
