import { resolve } from "path"
import isEmpty from "lodash/isEmpty"
import reduce from "lodash/reduce"
import mapValues from "lodash/mapValues"
import { stringify } from "querystring"
import omit from "lodash/omit"
import pickBy from "lodash/pickBy"

const resolveEntries = (paths, context) => paths.map(path => (path.charAt(0) === "." ? resolve(context, path) : path))

export default function entryReducer(state) {
  const { project } = this
  const { helper, entry, registry, context = this.result("compiler.project.cwd", process.cwd()) } = state

  const final = {}

  if (!isEmpty(registry)) {
    Object.assign(
      final,
      mapValues(registry, (config, name) => {
        const query = stringify(pickBy(omit(config, "origin"), v => typeof v !== "undefined"))
        const resource = config.origin || name || project.paths.manifest
        return [`skypager-context-generator?${query}!${resource}`]
      }),
    )
  }

  if (!isEmpty(helper)) {
    mapValues(helper, (data, name) => {
      const model = project
        .model("Helper", data)
        .chain.get("instances")
        .mapValues((v, id) => project.resolve(v.baseRelativePath))
        .value()

      Object.assign(final, model)
    })
  }

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
