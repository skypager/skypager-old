import { Runtime } from "skypager-runtime"
import ProjectType, { attach, registerHelper as register } from "./helper"

Runtime.initializers.register("universal/project-type-helper", function() {
  return initializer
})

Runtime.features.register("project-type-helper", () => require("./feature"))

export default ProjectType

export { ProjectType, attach }

export function initializer(next) {
  const runtime = this
  if (!runtime.ProjectType) attach(runtime)
  if (!runtime.enabledFeatures["project-type-helper"]) runtime.feature("project-type-helper").enable()

  next && next.call && next.call(runtime)
}

register()
