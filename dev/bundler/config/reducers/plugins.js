import isEmpty from "lodash/isEmpty"
import reduce from "lodash/reduce"
import mapValues from "lodash/mapValues"

import Plugin from "../utils/Plugin"

export default function plugins(state) {
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
