import { Helper } from 'skypager-runtime'

export class Project extends Helper {
  static isCacheable = true

  static isObservable = true

  static dirname = __dirname

  get manifest() {
    return this.tryGet('manifest')
  }

  async saveManifest() {}

  static attach(runtime, options = {}) {
    if (!runtime.has('projectType')) {
      ProjectType.attach(runtime)
    }

    return Helper.attach(runtime, Project, {
      registryProp: 'projects',
      lookupProp: 'project',
      cacheHelper: true,
      isCacheable: true,
      registry:
        options.registry ||
        Helper.createContextRegistry('projects', {
          context: Helper.createMockContext(),
        }),
      ...options,
    })
  }

  initialize() {
    if (this.projectType) {
      this.projectType.applyInterfaceToProject(this)
    }
  }

  findDependents() {
    return this.packageManager.findDependentsOf(this.packageName)
  }

  get projectType() {
    if (
      this.projectTypeId &&
      this.runtime.projectTypes &&
      this.runtime.projectTypes.available.indexOf(this.projectTypeId) !== -1
    ) {
      try {
        return this.runtime.projectType(this.projectTypeId)
      } catch (error) {}
    }
  }

  get projectTypeId() {
    return (
      this.get('provider.projectType') ||
      this.get('options.projectType') ||
      this.get('provider.projectTypeId') ||
      this.get('options.projectTypeId')
    )
  }

  get packageName() {
    return this.get('provider.name')
  }

  get version() {
    return this.tryGet('version')
  }

  get manifestPath() {
    return this.tryGet('_file.path')
  }

  async spawnRuntime(options = {}, context = {}) {
    return this.runtime.spawn({ ...options, cwd: this.cwd }, context)
  }

  get cwd() {
    return this.dirname
  }

  get dirname() {
    return this.tryGet('_file.dir')
  }

  get packageId() {
    return this.tryGet('_packageId')
  }

  get manifestData() {
    return this.lodash.omit(this.provider, '_file', '_packageId')
  }

  get fileManager() {
    return this.tryResult('fileManager', () => {
      if (!this.runtime.fileManager) {
        if (!this.runtime.feature.fileManager) {
          throw new Error(`File Manager is not available`)
        }

        this.runtime.feature.fileManager()
      }

      return this.runtime.fileManager
    })
  }

  get moduleManager() {
    return this.tryResult('moduleManager', () => {
      if (!this.runtime.moduleManager) {
        if (!this.runtime.feature.moduleManager) {
          throw new Error(`Module Manager is not available`)
        }

        this.runtime.feature.moduleManager()
      }

      return this.runtime.moduleManager
    })
  }

  get packageManager() {
    return this.tryResult('packageManager', () => {
      if (!this.runtime.packageManager) {
        if (!this.runtime.feature.packageManager) {
          throw new Error(`Package Manager is not available`)
        }

        this.runtime.feature.packageManager()
      }

      return this.runtime.packageManager
    })
  }

  get collectionMixin() {
    return this.tryResult('collectionMixin', () => this.result('projectType.collectionMixin')) || {}
  }

  get instanceMixin() {
    return this.tryResult('instanceMixin', () => this.result('projectType.instanceMixin')) || {}
  }

  get collectionMixinOptions() {
    const opts =
      this.tryResult('collectionMixinOptions') ||
      this.tryResult('mixinOptions') ||
      this.result('projectType.collectionMixinOptions', {})

    return defaults({}, opts, this.defaultMixinOptions)
  }

  get instanceMixinOptions() {
    const opts =
      this.tryResult('instanceMixinOptions') ||
      this.tryResult('mixinOptions') ||
      this.result(
        'projectType.projectInterfaceOptions',
        this.result('projectType.interfaceOptions', {})
      )

    return defaults({}, opts, this.defaultMixinOptions)
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
}

export default Project

export const isCacheable = true

export const attach = Project.attach

export const registerHelper = () => {
  if (Helper.registry.available.indexOf('project') === -1) {
    Helper.registerHelper('project', () => Project)
  }
}
