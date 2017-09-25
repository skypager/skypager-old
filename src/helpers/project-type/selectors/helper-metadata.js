module.exports = function(chain, options = {}) {
  const project = this
  const Helper = project.model("Helper", options)

  return chain.plant({
    instances: Helper.instances,
    helpers: project.chain
      .get("allHelpers")
      .keyBy(h => h.registryName())
      .mapValues(h => ({
        providerTypes: h.providerTypes,
        optionTypes: h.optionTypes,
        contextTypes: h.contextTypes,
        available: (h.registry && h.registry.available) || [],
      }))
      .value(),
  })
}
