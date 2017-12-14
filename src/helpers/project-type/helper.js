import { Helper } from 'skypager-runtime'

const mapContext = req =>
  req.keys().reduce(
    (memo, key) => ({
      ...memo,
      [key.replace(/\.\//, '').replace(/\.js$/, '')]: req(key).default || req(key),
    }),
    {}
  )

export class ProjectType extends Helper {
  static providerTypes = {
    readTemplateTree: 'func',
  }

  static configFeatures() {
    return mapContext(require.context('./config/features', false, /\.js$/))
  }

  static configReducers() {
    return mapContext(require.context('./config/reducers', false, /\.js$/))
  }

  static attach(host, options = {}) {
    return Helper.attach(host, ProjectType, {
      registry: Helper.createContextRegistry('project-type', {
        context: Helper.createMockContext(),
      }),
      ...options,
    })
  }

  /**
    Apply the project type template, starting with the files tree.
  */
  async applyTemplate(options = {}) {
    const { isFunction } = this.lodash

    isFunction(options.before) && options.before(this)
    await this.applyTemplateTree(options)

    isFunction(options.after) && options.after(this)
    return this
  }

  /**
    A Project Type provider can export a JSON representation of the default
    files tree, and we can use that to generate files on top of another project.

    The files tree provided by a Project Type provider should be an object whose keys
    are the relative file pathname, and whose values are an object that contain at least
    a property called `content` which contains the file contents.

    @param {Object} options
    @param {Boolean} options.mergePackage don't overwrite the existing package.json, instead merge the template
    @param {Boolean} options.overwrite overwrite any of our current files
  */
  async applyTemplateTree(options = {}) {
    const { runtime } = this
    const { entries, defaultsDeep, isFunction } = this.lodash
    const missingFiles = await this.findMissingTemplateFiles(options)

    await Promise.all(
      entries(missingFiles).map(([relativePath, content]) => {
        isFunction(options.onWriteFile) && options.onWriteFile(relativePath)
        return this.writeFileFromTemplate(
          options.base ? `${options.base}/${relativePath}` : relativePath,
          content
        )
      })
    )

    // If there is already a package.json in this project we can merge in the template package
    if (options.mergePackage !== false && !missingFiles['package.json']) {
      const { templatePackage = {} } = this
      const currentPackage = await runtime.fsx.readJsonAsync(runtime.join('package.json'))

      const newPackageData = defaultsDeep({}, currentPackage, templatePackage)

      isFunction(options.onMergePackage) &&
        options.onMergePackage(newPackageData, currentPackage, templatePackage)

      await runtime.fsx.writeFileAsync(
        runtime.join('package.json'),
        JSON.stringify(newPackageData, null, 2)
      )
    }

    return this.templateTree
  }

  /**
    @private writes a file from the template to the local project path, ensuring
    the directory exists first.
  */
  async writeFileFromTemplate(relativePath, content) {
    const { runtime } = this
    const { dirname } = runtime.pathUtils
    const { mkdirpAsync: mkdir, writeFileAsync: write } = runtime.fsx

    await mkdir(dirname(runtime.resolve(relativePath)))
    await write(runtime.resolve(relativePath), content && content.length ? content : '')

    return relativePath
  }

  /**
    @private uses the project walker to find existing files, and returns the
    template tree files which don't already exist. Passing overwrite = true
    will return all files regardless.
  */
  async findMissingTemplateFiles(options = {}) {
    const { runtime } = this
    const { omit, mapValues } = this.lodash
    const existingFileIds = []

    if (!options.overwrite) {
      const skywalker = runtime.skywalker
      await skywalker.projectWalker().run()
      existingFileIds.push(...skywalker.fileIds)
    }

    const tree = await this.readTemplateTree(options)

    return mapValues(omit(tree, existingFileIds), 'content')
  }

  /**
    Reads the project type template tree
  */
  async readTemplateTree(options = {}) {
    const { mapKeys } = this.lodash
    if (this.templateTree && !options.fresh && !options.refresh) {
      return this.templateTree
    }

    let tree = await this.attemptMethodAsync('readTemplateTree')

    tree = mapKeys(tree, (v, k) => k.replace(/^files\//, ''))

    this.hide('templateTree', tree || {})

    // Parse the template tree package manifest so that we can merge any values into our current one
    if (this.templateTree['package.json']) {
      this.set('templatePackage', JSON.parse(this.templateTree['package.json'].content))
    }

    return this.templateTree
  }
}

export const registerHelper = () => Helper.registerHelper('project-type', () => ProjectType)

export default ProjectType

export const attach = ProjectType.attach
