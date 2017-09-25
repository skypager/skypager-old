import skypager, { Runtime } from "skypager-runtime"
import Client, { attach, registerHelper as register } from "./helper"

Runtime.initializers.register("universal/client-helper", function() {
  return initializer
})

Runtime.features.register("client-helper", () => require("./feature"))

register()

export default Client

export { Client, attach }

export function initializer(next) {
  const runtime = this
  if (!runtime.client) attach(runtime)
  if (!runtime.enabledFeatures["client-helper"]) runtime.feature("client-helper").enable()

  next && next.call && next.call(runtime)
}
