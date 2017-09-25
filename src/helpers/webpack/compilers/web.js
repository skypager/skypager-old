import { getModuleFolders } from "../utils/config-values"
import defaults from "lodash/defaultsDeep"
import get from "lodash/get"
import isArray from "lodash/isArray"
import isObject from "lodash/isObject"
import { join } from "path"

export function assetManifest(options = {}, context = {}) {
  return {
    output: "asset-manifest.json",
    writeToDisk: true,
  }
}

export function configure(options = {}, context = {}) {
  const { project, compiler } = context

  options = defaults(options, {
    babelConfig: get(options, "babelRc", project.babelRc),
    hot: project.get("argv.hot", false),
    fontLoader: "url",
    imageLoader: "file",
    sourcePaths: project.get("sourcePaths", [...project.paths.source]).map(p => project.resolve(p)),
    excludePaths: project.get("excludePaths", [
      project.paths.output,
      project.paths.bundles,
      project.paths.public,
      project.paths.logs,
    ]),
    htmlOptions: {},
    html: project.argv.disableHtmlPlugin || options.disableHtmlPlugin ? false : [],
    dlls: [],
    disableDllPlugin: !!project.argv.disableDllPlugin,
    publicPath: project.get("argv.publicPath", "/"),
    outputPath: project.paths.public,
    htmlTemplatePath: join(__dirname, "html-templates", "html-webpack-template.js"),
    svgLoader: "raw",
  })

  const moduleFolders = getModuleFolders(options, context)

  const {
    svgLoader,
    htmlTemplatePath,
    outputPath,
    publicPath,
    htmlOptions,
    disableDllPlugin,
    disableHtmlPlugin,
  } = options

  let { html, dlls } = options

  if (disableHtmlPlugin) {
    html = false
  }
  if (disableDllPlugin) {
    dlls = false
  }

  if (!disableHtmlPlugin) {
    htmlOptions.project = project
  }

  if (html && !isArray(html) && isObject(html)) {
    html = [
      {
        ...htmlOptions,
        ...html,
      },
    ]
  }

  if (!disableHtmlPlugin && isArray(html) && html.length === 0) {
    html.push({
      filename: "index.html",
      template: htmlTemplatePath,
      ...htmlOptions,
    })
  }

  if (disableHtmlPlugin || html === false) {
    html = []
  }

  const loaderOptions = defaults(options.loaderOptions, {
    fonts: {},
    images: {},
    babel: {},
  })

  const { hot, reactHMRE, babelConfig = project.babelRc } = options

  if (hot && reactHMRE !== false) {
    Object.assign(babelConfig, {
      presets: [...(babelConfig.presets || []), "react-hmre"],
    })
  }

  const config = compiler.api
    .context(project.realCwd)
    .target("web")
    .output({
      path: outputPath,
      publicPath,
    })
    .loader("fonts", [".eot", ".ttf", ".woff", ".woff2"], {
      loader: "url",
      query: {
        name: project.isProduction ? "[name].[hash:6].[ext]" : "[name].[ext]",
        limit: 8192,
        ...loaderOptions.fonts,
      },
      include: [...project.sourcePaths, project.join("node_modules")],
    })
    .loader("svg", [".svg"], {
      loader: svgLoader,
      include: [project.join("src")],
    })
    .loader("images", [".jpg", ".png", ".gif"], {
      loader: "file",
      query: {
        name: project.isProduction ? "[name].[hash:6].[ext]" : "[name].[ext]",
        ...loaderOptions.images,
      },
    })
    .loader("skypager-document", [".md"], {
      include: [project.realCwd],
      exclude: [/node_modules/],
    })
    .loader("skypager-babel", ".js", {
      include: options.sourcePaths,
      exclude: [...options.excludePaths, /node_modules/],
      query: {
        cacheDirectory: project.get("argv.cacheBabel", project.env !== "production"),
        ...babelConfig,
      },
      ...loaderOptions.babel,
    })
    .when(
      () => moduleFolders.length > 0,
      config => moduleFolders.reduce((config, folder) => config.modules(folder), config),
    )
    .when(() => hot, cfg => cfg.plugin("webpack.HotModuleReplacementPlugin"))
    .when(!disableHtmlPlugin && html.length > 0, cfg =>
      html.reduce(
        (memo, opts) =>
          cfg.plugin("html-webpack-plugin", {
            ...htmlOptions,
            ...opts,
          }),
        cfg,
      ),
    )

  return config
}
