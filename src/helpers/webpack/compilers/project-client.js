import { getModuleFolders } from "../utils/config-values"
import { join } from "path"

export const configure = (options = {}, context = {}) => {
  const { project, compiler } = context

  const moduleFolders = getModuleFolders(options, context)

  const { babelConfig = {}, loaderOptions = {} } = options

  const urlLoader = ({ limit = 8192, prefix = "" }) => ({
    loader: `url-loader?name=${prefix}[name].[ext]&limit=${limit}`,
    include: [project.realCwd],
    exclude: [/node_modules/, project.paths.output],
  })

  return (
    compiler.api
      .context(project.realCwd)
      .target("web")
      .modules(project.paths.source)
      .output({
        path: project.paths.output,
        libraryTarget: "umd",
        filename: "[name].js",
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
      .loader("json", ".json", {
        exclude: /node_modules/,
      })
      .loader("yaml", ".yml", {
        loader: "json!yaml",
        exclude: /node_modules/,
      })
      .loader("skypager-document", ".md", {
        loader: "skypager-document",
        exclude: /node_modules/,
        include: [project.realCwd],
      })
      .loader("file", [".eot", ".svg", ".ttf", ".woff", ".woff2"], urlLoader("fonts/"))
      .loader("svg", [".svg"], urlLoader("images/"))
      .loader("images", [".jpg", ".png", ".gif"], urlLoader("images/"))
      // options
      .when(
        () => moduleFolders.length > 0,
        config => moduleFolders.reduce((config, folder) => config.modules(folder), config),
      )
  )
}
