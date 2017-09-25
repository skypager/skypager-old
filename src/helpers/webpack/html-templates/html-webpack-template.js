const base = require("./standard")

module.exports = async function(params = {}) {
  /* eslint-disable */
  const { compilation, webpack: stats, webpackConfig, htmlWebpackPlugin: { options, files } } = params

  const {
    project,
    headScripts = [],
    stylesheets = [],
    dllScripts = [],
    htmlClass,
    bodyClass,
    bodyId,
    chunks = [],
    headTop = "",
    headBottom = "",
    bodyTop = "",
    bodyBottom = "",
    initialState = null,
    containerId = "app",
    components,
    component,
    componentProps = {},
    renderMethod = "render",
  } = options
  /* eslint-enable */

  const { publicPath = "/" } = files

  let content = ""

  if (component && components && components.available.indexOf(component) >= 0) {
    content = components[renderMethod](component, componentProps)
  }

  return base({
    headScripts,
    stylesheets,
    publicPath,
    content,
    files,
    project,
    dllScripts,
    htmlClass,
    bodyClass,
    bodyId,
    chunks,
    headTop,
    headBottom,
    bodyTop,
    bodyBottom,
    initialState,
    containerId,
    ...params,
  })
}
