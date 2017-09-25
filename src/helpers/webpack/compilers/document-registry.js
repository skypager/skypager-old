import * as base from "./base"
import mapValues from "lodash/mapValues"

export const externalizeAll = true

export function configure(options = {}, context = {}) {
  const { project } = context
  const builder = base.configure.call(this, options, context)

  return builder
    .target("node")
    .output({ libraryTarget: "umd" })
    .loader("docs", [".md", ".js", ".json", ".yml"], {
      loader: "skypager-document",
      include: project.sourcePaths,
      exclude: [/node_modules/, project.paths.output, project.paths.public],
    })
    .loader("fonts", [".eot", ".ttf", ".woff", ".woff2"], assetLoader())
    .loader("svg", [".svg"], assetLoader())
    .loader("images", [".jpg", ".png", ".gif"], assetLoader())
}

export const assetLoader = ({ type = "file", prefix = "", emit = false, hash = "", limit = 8192 } = {}) =>
  type === "file"
    ? `file-loader?emitFile=${emit}&name=${prefix}[name]${hash}.[ext]`
    : `url-loader?limit=${limit}&name=${prefix}[name]${hash}.[ext]`
