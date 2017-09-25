import { resolve as resolvePath, parse } from "path"
import uniq from "lodash/uniq"

export default function resolveLoader(state) {
  const { loaderModules } = state

  const res = {}

  if (loaderModules) {
    res.modules = uniq(
      loaderModules.map(folder => {
        const { dir } = parse(folder)

        // e.g. "./lib" => `${context}/lib`
        if (dir) {
          return resolvePath(process.cwd(), folder)
        }

        // e.g. "node_modules"
        return folder
      }),
    )
  }

  return res
}
