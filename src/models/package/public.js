import * as runtimeModel from './runtime'
import mapValues from 'lodash/mapValues'
import flatten from 'lodash/flatten'
import pickBy from 'lodash/pickBy'
import set from 'lodash/set'
import get from 'lodash/get'
import semver from 'semver'
import { relative } from 'path'

const { keys } = Object

export const routes = ['src/:subfolders+/package.json']

export const collectionMethods = (options, context) => ({
  findBy(fn) {
    return this.instanceChain
      .values()
      .filter(fn.bind(this))
      .value()
  },

  findByName(name) {
    return this.keyBy('name')[name]
  },

  findDependentsOf(name) {
    const versionMap = this.getVersionMap()
    const entries = this.getDependencyEntries()

    const results = pickBy(entries, (mappings, moduleName) => {
      return mappings.find(items => items[0] === name)
    })

    return mapValues(results, mappings => mappings.find(items => items[0] === name))
  },

  updateDependentVersions(packageName, updatedVersion) {
    const deps = this.findDependentsOf(packageName)
    const pkg = this.findByName(packageName)

    updatedVersion =
      typeof updatedVersion === 'string'
        ? updatedVersion
        : typeof updatedVersion === 'object' ? pkg.version : false

    if (!updatedVersion) {
      return false
    }

    const model = this

    return pickBy(deps, (loc, depName) => {
      let [target, location, version] = loc
      const dep = model.findByName(depName)

      version = version.replace(/^\^/, '')

      if (dep && !semver.eq(version, updatedVersion) && dep.updatePackage) {
        model.runtime.debug(
          `Updating ${target} to ${updatedVersion} from ${version} in ${depName} ${location}`
        )
        dep.setVal([location, packageName], updatedVersion)
        return true
      }
    })
  },

  keyBy(prop = 'name') {
    return this.instanceChain.keyBy(prop).value()
  },

  getVersionMap() {
    return this.instanceChain
      .keyBy('name')
      .mapValues('version')
      .value()
  },

  getMutualDependencyEntries() {
    const versionMap = this.getVersionMap()
    const entries = this.getDependencyEntries()
    const matches = pickBy(entries, (mappings, moduleName) => {
      return mappings.find(items => versionMap[items[0]])
    })

    return mapValues(matches, (mappings, moduleName) =>
      mappings.filter(([depName, location, version] = {}) => versionMap[depName])
    )
  },

  getOutdatedDependents() {
    return pickBy(this.getMutualDependencyEntries(), (mappings, moduleName) => {
      const pkg = this.findByName(moduleName)
    })
  },

  getDependencyEntries() {
    return this.instanceChain
      .keyBy('name')
      .mapValues(v => {
        const {
          dependencies = {},
          devDependencies = {},
          optionalDependencies = {},
          peerDependencies = {},
        } = v
        const deps = { dependencies, devDependencies, optionalDependencies, peerDependencies }
        const entries = type => keys(deps[type]).map(dep => [dep, type, deps[type][dep]])

        return flatten(
          keys(deps)
            .map(type => entries(type))
            .filter(i => i.length > 0)
        )
      })
      .value()
  },
})

async function preparePackageFolder(project) {
  await project.fsx.mkdirpAsync(project.resolve('packages', this.name))

  await project.fsx.copyAsync(
    project.resolve(this.baseRelativePath),
    project.resolve('packages', this.name, 'package.json')
  )

  //await project.fsx.copyAsync(project.resolve(this.relativeDirname), project.resolve("packages", this.name, "src"))
}

export function instanceMethods(options = {}, context = {}) {
  const base = runtimeModel.instanceMethods.call(this, options, context)
  const { project } = context

  return Object.assign({}, base, {
    checkPublishedVersions() {
      const cwd = project.resolve(this.relativeDirname)

      const published = require('child_process')
        .execSync('npm dist-tag ls', {
          cwd,
        })
        .toString()
        .trim()
        .split('\n')
        .filter(line => line.match(/latest/i))
        .map(line =>
          line
            .split(':')
            .pop()
            .trim()
        )
        .join('\n')

      const current = this.version

      return {
        published,
        current,
        outdated: current !== published,
      }
    },

    cleanManifest() {
      const pkg = project.readJsonSync(project.resolve(this.baseRelativePath))

      delete pkg.repository
      delete pkg.homepage
      delete pkg.website
      delete pkg.bugs

      project.writeFileSync(project.resolve(this.baseRelativePath), JSON.stringify(pkg, null, 2))
    },

    remove(key) {
      const pkg = this.readPackage()
      key = typeof key === 'string' ? key.split('.') : key
      const objKey = key.slice(0, key.length - 1)
      const obj = get(pkg, objKey)

      if (obj) {
        delete obj[key.pop()]
        set(pkg, objKey, obj)
      }

      this.updatePackage(pkg)

      return this
    },

    setVal(key, value) {
      const pkg = this.readPackage()
      set(pkg, key, value)

      this.updatePackage(pkg)
      return this
    },

    // prettier-ignore
    updatePackage(data = {}) {
      return project.fsx.writeFileSync(
        project.resolve(this.baseRelativePath),
        JSON.stringify(data, null, 2),
        "utf8"
      )
    },

    readPackage() {
      return project.fsx.readJsonSync(project.resolve(this.baseRelativePath))
    },

    compiler(options = {}) {
      const projectName = this.name
      const { project } = context

      const sourceRoot = project.join(this.relativeDirname)
      const outputPath = project.resolve('packages', this.name)

      const currentVersion = this.version
      const packageSettings = this.skypager || {}

      const {
        baseCompiler = project.get('argv.baseCompiler', 'node'),
        entryPoints = this.entryPoints
          ? mapValues(this.entryPoints, v => (v.match(/.js$/) ? project.resolve(sourceRoot, v) : v))
          : { index: project.resolve(sourceRoot, 'index.js') },
      } = options

      const { externals, aliases } = this
      let { copy = [] } = this

      if (copy.length > 0) {
        copy = copy.map(v => ({
          from: v,
          to: outputPath,
        }))
      }

      return project
        .compiler(baseCompiler, {
          assetManifest: true,
          cacheHelper: false,
          postProcessors() {},
          ...options,
        })
        .configure(cfg => {
          return cfg
            .entry(entryPoints)
            .modules(project.resolve(this.relativeDirname))
            .modules(project.resolve('packages'))
            .externals(project.resolve(this.relativeDirname, 'node_modules'))
            .externals(project.resolve(this.relativeDirname, 'package.json'))
            .externals(project.resolve('packages', this.name, 'package.json'))
            .externals(project.resolve('package.json'))
            .externals(project.resolve('node_modules'))
            .alias('skypager-runtime/lib', project.join('src', 'runtime'))
            .alias('lodash', project.join('node_modules/lodash'))
            .output({
              path: project.resolve('packages', this.name),
              libraryTarget: 'umd',
            })
            .when(externals, c => c.externals(externals))
            .when(aliases, c => c.alias(aliases))
            .when(copy.length > 0, c => c.copy(copy))
            .when(typeof options.cfg === 'function', options.cfg)
            .plugin('webpack.DefinePlugin', {
              [`process.env.${this.name.replace(/\-/g, '_').toUpperCase()}`]: JSON.stringify(
                this.name
              ),
              __PACKAGE__: JSON.stringify({
                ...packageSettings,
                version: currentVersion,
                sha: project.gitInfo.sha,
                branch: project.gitInfo.branch,
              }),
            })
        })
    },

    preparePackage() {
      return preparePackageFolder.call(this, context.project)
    },

    async compilerConfigs(opts = {}) {
      return await this.runCompilers({
        ...opts,
        configOnly: true,
      })
    },

    async buildPackage(opts = {}) {
      const { print } = project.cli

      print(
        `Building package ${this.name} ${this.version} ${
          this.compilers ? 'with custom configs' : ''
        }`
      )

      let results = []

      try {
        if (this.compilers) {
          results = await this.runCompilers.call(this, opts)
        } else {
          results.push(
            await this.buildStandardPackage({
              statsName: 'package',
              ...opts,
            })
          )
        }

        print(
          `Finished ${results.length} compilers. ${results.filter(f => f.wasSuccessful).length}/${
            results.length
          }`
        )

        results.forEach(c => {
          c.printStats()
        })
      } catch (error) {
        print(`FATAL Error while building`)
        print(error.message)
        throw error
      }
    },

    async runCompilers(opts = {}) {
      const { project } = context
      let compilers = Object.assign({}, this.compilers)
      const results = []

      if (project.argv.only && compilers[project.argv.only]) {
        compilers = {
          [project.argv.only]: compilers[project.argv.only],
        }
      }

      const { relativeDirname } = this

      if (compilers.package) {
        const pkgCompiler = await this.buildStandardPackage({
          ...project.argv,
          ...compilers.package,
          statsName: 'package',
          ...opts,
        })

        results.push(pkgCompiler)
      }

      if (compilers.bundle) {
        const bundleCompiler = await this.buildBundlePackage.call(this, {
          ...project.argv,
          ...compilers.bundle,
          statsName: 'bundle',
          baseCompiler: 'web',
          ...opts,
        })

        results.push(bundleCompiler)
      }

      if (compilers.electronRenderer) {
        const electronRendererCompiler = await this.buildStandardPackage.call(this, {
          ...project.argv,
          statsName: 'electronRenderer',
          ...compilers.electronRenderer,
          target: 'electron-renderer',
          ...opts,
          cfg(c) {
            return c.copy([
              {
                from: project.resolve(relativeDirname, 'jquery.min.js'),
              },
              {
                from: project.resolve(relativeDirname, 'tether.min.js'),
              },
              {
                from: project.resolve(relativeDirname, 'welcome.html'),
              },
            ])
          },
        })

        results.push(electronRendererCompiler)
      }

      if (compilers.electronMain) {
        const electronMainCompiler = await this.buildStandardPackage.call(this, {
          ...project.argv,
          statsName: 'electronMain',
          ...compilers.electronMain,
          target: 'electron-main',
          entryPoints: {
            main: 'main.js',
          },
          cfg(c) {
            return c.copy([
              {
                from: project.resolve(relativeDirname, 'index.js'),
              },
              {
                from: project.resolve(relativeDirname, 'entry.js'),
              },
            ])
          },
          ...opts,
        })

        results.push(electronMainCompiler)
      }

      if (compilers.minifiedBundle) {
        const minifiedBundlerCompiler = await this.buildBundlePackage.call(this, {
          ...project.argv,
          statsName: 'minified',
          baseCompiler: 'web',
          ...compilers.minifiedBundle,
          ...opts,
        })

        results.push(minifiedBundlerCompiler)
      }

      return results
    },

    async buildBundlePackage(opts = {}) {
      const outputPath = project.resolve('packages', this.name)
      const define = opts.define || {}
      const version = this.version || project.get('manifest.version')

      const externals = {
        ...(this.externals || {}),
        ...opts.externals,
      }

      const compiler = this.compiler({
        assetManifest: false,
        cfg(c) {
          return c
            .entry(opts.entryPoints)
            .output({ libraryTarget: 'umd', path: outputPath, filename: '[name].js' })
            .plugin('webpack.DefinePlugin', {
              __PACKAGE__: JSON.stringify({
                version,
                sha: project.gitInfo.sha,
                branch: project.gitInfo.branch,
              }),
              'process.env.SKYPAGER_RELEASE': JSON.stringify(project.get('manifest.version')),
              ...mapValues(define, (v, k) => JSON.stringify(v)),
            })

            .when(typeof opts.uglify !== 'undefined', c => {
              return c.plugin('webpack.optimize.UglifyJsPlugin', opts.uglify)
            })

            .when(opts.minify, c =>
              c
                .plugin('webpack.optimize.UglifyJsPlugin', {
                  compress: {
                    warnings: false,
                  },
                  comments: false,
                  mangle: true,
                  minimize: true,
                })
                .output({ filename: '[name].min.js' })
            )
        },
        compilerWillMount(webpackConfig) {
          webpackConfig.target = opts.target || 'web'
          webpackConfig.entry = opts.entryPoints || { index: 'index.web.js' }

          if (webpackConfig.target !== 'web') {
            webpackConfig.node = {
              ...(webpackConfig.node || {}),
              __dirname: false,
              __filename: false,
            }
          }

          delete webpackConfig.externals

          webpackConfig.externals = [externals]

          return webpackConfig
        },
      })

      if (opts.configOnly) {
        return compiler.getConfig()
      }

      await compiler.run()

      if (!compiler.wasSuccessful) {
        compiler.printStats({ errors: true, warnings: true, colors: true })
      }

      await persistBuildResults(this, compiler, {
        statsName: 'bundle',
      })

      return compiler
    },

    async buildStandardPackage(opts = {}) {
      await this.preparePackage.call(this)

      const name = this.name

      const compiler = this.compiler({
        ...opts,
        compilerWillMount(webpackConfig) {
          webpackConfig.target = opts.target ? opts.target : 'node'

          if (webpackConfig.target.startsWith('electron')) {
            webpackConfig.node = { __dirname: false, __filename: false, ...webpackConfig.node }
          }

          return webpackConfig
        },
      })

      if (opts.configOnly) {
        return compiler.getConfig()
      }

      await compiler.run()

      if (
        !compiler.wasSuccessful &&
        compiler.missingDependencies &&
        compiler.missingDependencies.length > 0
      ) {
        console.log(compiler.compilerOptions.resolve.modules)
      } else if (compiler.wasSuccessful) {
        compiler.printStats()
      }

      await persistBuildResults(this, compiler, { statsName: 'package', ...opts })

      if (project.argv.watch) {
        compiler.watch({}, () => {
          project.cli.clear()
          compiler.printStats()
        })
      }

      return compiler
    },
  })
}

function persistBuildResults(pkg, compiler, options) {
  const { project } = compiler
  const buildStats = require(process.cwd() + '/build-status.json')

  buildStats.gitInfo = project.gitInfo
  buildStats.failed = buildStats.failed || {}

  const current = buildStats.packages || {}
  const manifest = project.fsx.readJsonSync(project.resolve(compiler.outputPath, 'package.json'))

  current[pkg.name] = {
    ...(current[pkg.name] || {}),
    version: manifest.version,
    name: pkg.name,
    [options.statsName || 'package']: {
      success: compiler.wasSuccessful,
      assets: mapValues(compiler.assetModulesByChunkName, (abs, chunk) =>
        relative(compiler.outputPath, abs)
      ),
    },
  }

  const stats = compiler.stats.toJson({
    sources: false,
    modules: true,
    source: false,
    reasons: true,
    timings: true,
  })

  project.fsx.writeFileSync(
    compiler.outputPath + `/${options.statsName || 'package'}.stats.json`,
    JSON.stringify(stats, null, 2),
    'utf8'
  )

  if (!compiler.wasSuccessful) {
    if (!buildStats.failed[pkg.name]) {
      buildStats.failed[pkg.name] = {}
    }

    buildStats.failed[pkg.name][options.statsName || 'package'] = {
      warnings: compiler.rawWarnings.length,
      errors: compiler.errors.length,
    }

    Object.assign(current[pkg.name], {
      success: false,
      [options.statsName || 'package']: {
        warnings: compiler.rawWarnings.length,
        errors: compiler.errors.length,
        hash: compiler.hash,
      },
    })
  } else {
    if (buildStats.failed[pkg.name]) {
      delete buildStats.failed[pkg.name][options.statsName || 'package']
    }
  }

  buildStats.packages = {
    ...(buildStats.packages || {}),
    ...current,
  }

  buildStats.failed = pickBy(buildStats.failed, (v = {}) => Object.keys(v).length > 0)

  // if any of the packages builds are not successful, then the package itself isnt
  buildStats.packages = mapValues(buildStats.packages, (pkgInfo, name) => {
    mapValues(pkgInfo, (v, key) => {
      if (typeof v === 'object' && v.success === false) {
        pkgInfo.success = false
      }
    })

    return pkgInfo
  })

  project.fsx.writeFileSync(
    process.cwd() + '/build-status.json',
    JSON.stringify(buildStats, null, 2),
    'utf8'
  )
}
