export const createGetter = "reactRenderers"

export const featureMethods = ["lazyDom", "lazyUniversal", "lazyServer"]

export function lazyDom() {
  return this.runtime.feature("react/dom")
}
export function lazyServer() {
  return this.runtime.feature("react/universal")
}
export function lazyUniversal() {
  return this.runtime.feature("react/universal")
}

export function featureWasEnabled() {
  const { runtime } = this

  if (!runtime.has("ReactDOM")) {
    runtime.hide("ReactDOM", {}, true)
  }

  if (runtime.isBrowser) {
    try {
      runtime.hide("ReactDOM", require("react-dom"), true)
      runtime.feature("react/dom").enable()
    } catch (error) {}
  }

  try {
    const { renderToStaticMarkup, renderToString } = require("react-dom/server")

    runtime.set("ReactDOM.renderToString", renderToString)
    runtime.set("ReactDOM.renderToStaticMarkup", renderToStaticMarkup)
    runtime.feature("react/universal").enable()
  } catch (error) {}
}
