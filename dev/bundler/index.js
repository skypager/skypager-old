import skypager, { Runtime } from "skypager-runtime"
import Bundler, { attach, registerHelper as register } from "./helper"

Runtime.features.register("bundler-helper", () => require("./feature"))

Runtime.initializers.register("node/development/bundler-helper", function() {
  return initializer
})

export function initializer(next) {
  const runtime = this

  register()

  if (!runtime.bundler) attach(runtime)
  if (!runtime.enabledFeatures["bundler-helper"]) runtime.feature("bundler-helper").enable()

  next && next.call && next.call(runtime)
}

export { Bundler, attach }

export default Bundler
