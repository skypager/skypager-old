export function domRenderer(options = {}, context = {}) {
  const { runtime } = this
  const { isValidElement, createElement } = runtime.React

  let render

  try {
    render = require("react-dom").render
  } catch (error) {}

  const {
    component = isValidElement(options) || typeof options === "function"
      ? options
      : (p = {}) =>
          createElement("pre", {}, JSON.stringify({ invalidElement: true, options }, null, 2)),
    el = "app"
  } = options

  const containerNode = document.getElementById(el) || document.body

  return function(props = {}, ...args) {
    props = { runtime, ...props }
    const element = isValidElement(component) ? component : createElement(component, props, ...args)
    return render(element, containerNode)
  }
}

export const featureMethods = ["domRenderer"]
