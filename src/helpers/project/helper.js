const isFunction = o => typeof o === "function"
import { Helper } from "skypager-runtime"

export class Project extends Helper {
  static isCacheable = true

  static isObservable = true

  static dirname = __dirname

  get manifest() {
    return this.tryGet("manifest")
  }

  async saveManifest() {}

  static attach(runtime, options = {}) {
    if (!runtime.has("projectType")) {
      ProjectType.attach(runtime)
    }

    return Helper.attach(runtime, Project, {
      registryProp: "projects",
      lookupProp: "project",
      cacheHelper: true,
      isCacheable: true,
      registry:
        options.registry ||
          Helper.createContextRegistry("projects", {
            context: Helper.createMockContext()
          }),
      ...options
    })
  }

  initialize() {
    ;(async () => {
      if (!this.runtime.packageManager) {
        this.runtime.feature.packageManager().enable()
      }
      if (!this.runtime.moduleManager) {
        this.runtime.feature.moduleManager().enable()
      }
      if (!this.runtime.fileManager) {
        this.runtime.feature.fileManager().enable()
      }

      await this.runtime.fileManager.whenActivated()
      await this.runtime.packageManager.startAsync()
      await this.runtime.moduleManager.startAsync()
    })()
  }

  findDependents() {
    return this.packageManager.findDependentsOf(this.packageName)
  }

  get packageName() {
    return this.get("provider.name")
  }

  get version() {
    return this.tryGet("version")
  }

  get manifestPath() {
    return this.tryGet("_file.path")
  }

  get dirname() {
    return this.tryGet("_file.dir")
  }

  get packageId() {
    return this.tryGet("_packageId")
  }

  get manifestData() {
    return this.lodash.omit(this.provider, "_file", "_packageId")
  }

  get packageManager() {
    return this.runtime.packageManager
  }

  get fileManager() {
    return this.runtime.fileManager
  }

  get moduleManager() {
    return this.runtime.moduleManager
  }

  get collectionMixin() {
    return {}
  }

  get instanceMixin() {
    return {}
  }

  get collectionMixinOptions() {
    const opts = this.tryResult("collectionMixinOptions") || this.tryResult("mixinOptions") || {}
    return defaults({}, opts, this.defaultMixinOptions)
  }

  get instanceMixinOptions() {
    const opts = this.tryResult("instanceMixinOptions") || this.tryResult("mixinOptions") || {}
    return defaults({}, opts, this.defaultMixinOptions)
  }

  get defaultMixinOptions() {
    return {
      transformKeys: true,
      scope: this,
      partial: [this.context],
      insertOptions: true,
      right: true,
      hidden: false
    }
  }
}

export default Project

export const isCacheable = true

export const attach = Project.attach

export const registerHelper = () => {
  if (Helper.registry.available.indexOf("project") === -1) {
    Helper.registerHelper("project", () => Project)
  }
}
