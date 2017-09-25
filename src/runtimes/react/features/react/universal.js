export function featureWasEnabled() {
  const { runtime } = this
  const { renderToStaticMarkup, renderToString } = require("react-dom/server")

  runtime.set("ReactDOM.renderToString", renderToString)
  runtime.set("ReactDOM.renderToStaticMarkup", renderToStaticMarkup)
}

export function markupRenderer(options = {}, context = {}) {
  const { runtime = this.runtime } = context || {}
  const { isValidElement, createElement } = runtime.React
  const { renderToStaticMarkup } = runtime.ReactDOM

  const {
    component = isValidElement(options) || typeof options === "function"
      ? options
      : (p = {}) => createElement("pre", {}, JSON.stringify({ invalidElement: true, options }, null, 2)),
  } = options

  return function(props = {}, ...args) {
    const element = isValidElement(component) ? component : createElement(component, props, ...args)
    return renderToStaticMarkup(element)
  }
}

export function stringRenderer(options = {}, context = {}) {
  const { runtime = this.runtime } = context || {}
  const { isValidElement, createElement } = runtime.React

  const { renderToString } = runtime.ReactDOM

  const {
    component = isValidElement(options) || typeof options === "function"
      ? options
      : (p = {}) => createElement("pre", {}, JSON.stringify({ invalidElement: true, options }, null, 2)),
  } = options

  return function(props = {}, ...args) {
    const element = isValidElement(component) ? component : createElement(component, props, ...args)
    return renderToString(element)
  }
}

export const featureMethods = ["markupRenderer", "stringRenderer"]
