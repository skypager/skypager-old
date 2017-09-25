import skypager, { Runtime } from "skypager-runtime"
import DocumentType, { attach, registerHelper as register } from "./helper"

Runtime.initializers.register("universal/document-type-helper", function() {
  return initializer
})

Runtime.features.register("document-type-helper", () => require("./feature"))

export default DocumentType
export { DocumentType, attach }

export function initializer(next) {
  const runtime = this
  if (!runtime.documentType) attach(runtime)
  if (!runtime.enabledFeatures["document-type-helper"]) runtime.feature("document-type-helper").enable()

  next && next.call && next.call(runtime)
}

register()
