import skypager, { Runtime } from "skypager-runtime"
import Page, { attach, registerHelper as register } from "./helper"

Runtime.initializers.register("universal/page-helper", function() {
  return initializer
})

Runtime.features.register("page-helper", () => require("./feature"))

export default Page
export { Page, attach }

register()

export function initializer(next) {
  const runtime = this
  if (!runtime.page) attach(runtime)
  if (!runtime.enabledFeatures["page-helper"]) runtime.feature("page-helper").enable()

  next && next.call && next.call(runtime)
}
