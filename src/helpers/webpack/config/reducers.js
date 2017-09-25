import { stringify } from "querystring"
import Plugin from "./plugin"
import skypager from "skypager-runtime"

const { isEmpty, reduce, mapValues, omit, pickBy, castArray, uniq } = skypager.lodash
const path = skypager.pathUtils

const toArray = exts =>
  reduce(
    exts,
    (acc, loaders, ext) => {
      const test = new RegExp(`${ext.replace(".", "\\.")}$`)

      return [
        ...acc,
        ...loaders.map(loader => ({
          test,
          ...loader,
        })),
      ]
    },
    [],
  )

const resolveEntries = (paths, context) =>
  paths.map(path => (path.charAt(0) === "." ? path.resolve(context, path) : path))

export function cache(state) {
  const { env } = state

  if (env) {
    return ["development", "test"].indexOf(env) !== -1
  }
}
export function devtool(state) {
  const { sourcemap } = state

  return sourcemap
}

export function entry(state) {
  const { project } = this
  const { entry, context = runtime.cwd } = state

  const final = {}

  if (entry) {
    Object.assign(
      final,
      reduce(
        entry,
        (acc, entries, name) => ({
          ...acc,
          [name]: resolveEntries(entries, context),
        }),
        {},
      ),
    )
  }

  if (!isEmpty(final)) {
    return final
  }
}
export function externals(state) {
  const { externals } = state
  const { externalizeAll = this.get("project.argv.externalizeAll") } = this.options

  return externalizeAll ? [/^[a-z\-0-9]+$/] : externals
}
export function module(state) {
  const { loader, preLoader, target, skip } = state

  const base = {
    loaders: toArray(loader),
    preLoaders: toArray(preLoader),
    noParse: skip.reduce((memo, list) => memo.concat(castArray(list)), []),
  }

  if (target.match(/node$/) || target.match(/electron-main/)) {
    base.exprContextRegExp = /$^/
    base.exprContextCritical = false
  }

  return base
}
export function node(state) {
  const { node, target } = state

  if (target === "node") {
    return {
      __filename: false,
      __dirname: false,
      ...node,
    }
  }
}
export function output(state) {
  const { output, target } = state

  if (output) {
    return {
      chunkFilename: "[name].[hash:4]-[chunkhash:4].js",
      devtoolModuleFilenameTemplate: "[absolute-resource-path]",
      filename: "[name].js",
      libraryTarget: target === "web" ? "var" : "commonjs2",
      publicPath: "/",
      ...output,
    }
  }
}
export function plugins(state) {
  const { project } = this
  const { plugin, inject, helper, html, copy } = state

  const tersePlugins = reduce(
    plugin,
    (acc, args, name) => [...acc, typeof args === "function" ? { apply: args } : new Plugin(name, ...args)],
    [],
  )

  if (!isEmpty(helper)) {
    mapValues(helper, (data, name) => {
      const model = project
        .model("Helper", data)
        .chain.get("instances")
        .mapValues(v => ({
          ...v.moduleInfo(),
          id: v.id,
          name,
          baseRelativePath: v.baseRelativePath,
        }))
        .value()

      inject[name] = model
    })
  }

  const definePlugins = []
  const htmlPlugins = []
  const copyPlugins = []

  if (!isEmpty(html)) {
    htmlPlugins.push(
      ...html.map(
        config =>
          new Plugin("html-webpack-plugin", {
            project,
            ...config,
          }),
      ),
    )
  }

  if (!isEmpty(inject)) {
    mapValues(inject, (data, key) =>
      definePlugins.push(
        new Plugin("webpack.DefinePlugin", {
          [key]: JSON.stringify(data),
        }),
      ),
    )
  }

  if (!isEmpty(copy)) {
    copyPlugins.push(new Plugin("copy-webpack-plugin", copy))
  }

  return [...tersePlugins, ...definePlugins, ...htmlPlugins, ...copyPlugins]
}
export function resolve(state) {
  const { alias, modules } = state

  const resolve = {}

  if (alias) {
    resolve.alias = alias
  }

  if (modules) {
    resolve.modules = modules.map(folder => {
      const { dir } = path.parse(folder)

      // e.g. "./lib" => `${context}/lib`
      if (dir) {
        return path.resolve(this.runtime ? this.runtime.cwd : process.cwd(), folder)
      }

      // e.g. "node_modules"
      return folder
    })
  }

  return resolve
}
export function resolveLoader(state) {
  const { loaderModules } = state

  const resolveLoader = {}

  if (loaderModules) {
    resolveLoader.modules = uniq(
      loaderModules.map(folder => {
        const { dir } = path.parse(folder)

        // e.g. "./lib" => `${context}/lib`
        if (dir) {
          return path.resolve(process.cwd(), folder)
        }

        // e.g. "node_modules"
        return folder
      }),
    )
  }

  return resolveLoader
}
export function target(state) {
  const { target } = state

  return target
}
