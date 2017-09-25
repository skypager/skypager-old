import { getModuleFolders } from "../utils/config-values"
import { join } from "path"

export const params = {}

export const configure = (options = {}, context = {}) => {
  const { project, compiler } = context

  const moduleFolders = getModuleFolders(options, context)

  return compiler.api
    .context(project.realCwd)
    .target("web")
    .output({ path: project.paths.output, libraryTarget: "umd", filename: "[name].js" })
    .when(
      () => moduleFolders.length > 0,
      config => moduleFolders.reduce((config, folder) => config.modules(folder), config),
    )
}
