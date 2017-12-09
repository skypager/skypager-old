import { resolve as resolvePath, parse } from "path"

export default function resolve(state) {
  const { alias, modules } = state

  const res = {}

  if (alias) {
    res.alias = alias
  }

  if (modules) {
    res.modules = modules.map(folder => {
      const { dir } = parse(folder)

      // e.g. "./lib" => `${context}/lib`
      if (dir) {
        return resolvePath(this.project ? this.project.cwd : process.cwd(), folder)
      }

      // e.g. "node_modules"
      return folder
    })
  }

  return res
}
