const loaderUtils = require("loader-utils")
const assign = require("object-assign")

const DefaultOptions = {}

module.exports = function(source) {
  this.cacheable()
  const callback = this.async()

  // merge params and default config
  const query = loaderUtils.parseQuery(this.query)
  const configKey = query.config || "skypager"
  const options = assign({}, DefaultOptions, query, this.options[configKey] || {})

  callback(null, JSON.stringify({ source, query, options, keys: Object.keys(this) }, null, 2))
}
