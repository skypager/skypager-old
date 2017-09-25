import { getModuleFolders } from "../utils/config-values"
import { join } from "path"

export const params = {}

export const configure = (options = {}, context = {}) => {
  const { project, compiler } = context

  options = {
    ...project.argv,
    ...options,
  }

  if (project.options.in) {
    options.in = project.options.in
  }
  if (typeof project.options.out === "object") {
    options.out = project.options.out
  }

  const moduleFolders = getModuleFolders(options, context)

  const {
    babelConfig = options.babelRc || project.babelRc,
    loaderOptions = {},
    provideProject,
    provideSourcemapSupport,
    provideSkypager,
    outputFilename = "[name].js",
    chunkFilename = "[name].js",
    libraryTarget = options.universal ? "umd" : "commonjs2",
  } = options

  return (
    compiler.api
      .context(project.realCwd)
      .target("node")
      .output({
        path: project.paths.output,
        libraryTarget,
        chunkFilename,
        filename: outputFilename,
      })
      .loader("skypager-babel", ".js", {
        include: [...project.getOption("sourcePaths", [project.paths.source]), ...(options.sourcePaths || [])],
        exclude: [...project.getOption("excludePaths", [project.paths.output]), /node_modules/],
        query: {
          cacheDirectory: project.env !== "production",
          ...babelConfig,
        },
        ...(loaderOptions.babel || {}),
      })
      .loader("json", ".json", { exclude: /node_modules/ })
      .loader("yaml", ".yml", { loader: "json!yaml", exclude: /node_modules/ })
      .modules(project.paths.source)
      .node({ __dirname: false, __filename: false, process: false })
      .plugin("webpack.NamedModulesPlugin")
      // don't parse
      .skip(project.join("bin"))
      .when(() => options.externalizeDependencies !== false, cfg => cfg.externals(project.paths.manifest))
      .when(
        () => options.chunkVendors === true,
        cfg => cfg.plugin("webpack.optimize.CommonsChunkPlugin", { name: "vendor", minChunks: 2 }),
      )
      .when(
        () => options.markdown,
        cfg =>
          cfg.loader("skypager-document", [".md"], {
            loader: "skypager-document",
            exclude: /node_modules/,
            include: [project.realCwd],
            query: typeof options.markdown === "object" ? options.markdown : {},
          }),
      )
      .when(() => typeof options.in === "object", cfg => cfg.entry(options.in))
      .when(() => typeof options.out === "object", cfg => cfg.output(options.out))
      // options
      .when(
        () => moduleFolders.length > 0,
        config => moduleFolders.reduce((config, folder) => config.modules(folder), config),
      )
      .when(
        () => provideProject,
        config =>
          config.plugin("webpack.ProvidePlugin", {
            project: "skypager/current",
          }),
      )
      .when(
        () => provideSkypager,
        config =>
          config.alias("skypager", join(__dirname, "../..")).plugin("webpack.ProvidePlugin", {
            Skypager: "skypager",
          }),
      )
      .when(
        () => provideSourcemapSupport,
        config =>
          config.sourcemap("source-map").plugin("webpack.BannerPlugin", {
            banner: `try { require("source-map-support").install(); } catch(error) { }`,
            raw: true,
          }),
      )
  )
}
