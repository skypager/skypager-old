/**
 * @param options.babelRc {Object} - configuration for babel, used by reading a .babelrc
 * @param options.loaderOptions {Object} - configuration for loaders
 * @param options.outputPath {String} - an absolute path for where the assets will be stored
 * @param options.publicPath {String} - a URL or / typically
 * @param options.target {String} - any valid webpack target
 * @param options.library {String} - the name of the library, useful when loaded in a browser
 */
export const configure = (options = {}, context = {}) => {
  const { project, compiler } = context

  const { target = project.argv.target || "web" } = options

  const {
    babelConfig = options.babelRc || project.babelRc,
    loaderOptions = {},
    outputPath = project.paths.public,
    publicPath = "/",
  } = options

  if (options.hot && babelConfig.presets && babelConfig.presets.indexOf("react-hmre") === -1) {
    babelConfig.presets.push("react-hmre")
  }

  const assetLoader = (
    prefix = "",
    {
      emit = true,
      includePaths = [],
      type = options.urlLoader ? "url-loader" : "file-loader",
      limit = 8192,
      hash = project.isProduction ? ".[hash:6]" : "",
    } = loaderOptions.assets || {},
  ) => ({
    include: [project.realCwd].concat(includePaths),
    loader: type === "file"
      ? `file-loader?emitFile=${emit}&name=${prefix}[name]${hash}.[ext]`
      : `url-loader?limit=${limit}&name=${prefix}[name]${hash}.[ext]`,
  })

  const config = compiler.api
    .context(project.realCwd)
    .target(target)
    .externals(project.join("node_modules"))
    .externals(project.resolve(project.parentModule.folder, "node_modules"))
    .node({ __dirname: false, __filename: false, process: false })
    .when(
      () => publicPath,
      cfg =>
        cfg.plugin("webpack.DefinePlugin", {
          __PUBLIC_PATH__: JSON.stringify(publicPath),
        }),
    )
    .when(
      () => !project.isProduction,
      c =>
        c.output({
          path: outputPath,
          publicPath,
          filename: "[name].js",
          libraryTarget: "umd",
          library: options.library || "AssetsBundle",
        }),
    )
    .loader("fonts", [".eot", ".ttf", ".woff", ".woff2"], assetLoader())
    .loader("images", [".jpg", ".png", ".gif"], {
      loader: "file",
      query: {
        name: "[name].[hash:6].[ext]",
        emit: true,
      },
    })
    .registry("assets", {
      pattern: "*.(jpg|png|gif)",
      origin: "./src/index.js",
      registry: true,
      stringify: true,
      ...(options.registryOptions || {}),
    })
    .loader("skypager-babel", ".js", {
      include: [...project.getOption("sourcePaths", [project.paths.source]), ...(options.sourcePaths || [])],
      exclude: [...project.getOption("excludePaths", [project.paths.output, project.paths.public]), /node_modules/],
      query: {
        cacheDirectory: project.env !== "production",
        ...babelConfig,
      },
      ...(loaderOptions.babel || {}),
    })

  return config
}

export function assetManifest(options = {}, context = {}) {
  return {
    output: "asset-manifest.json",
    writeToDisk: true,
  }
}
