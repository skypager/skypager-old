import Project, { registerHelper as register } from "./helper"
import * as feature from "./feature"
import ProjectType from "skypager-helpers-project-type"

export { Project, feature }

register()

export default Project

export function attach(runtime) {
  ProjectType.attach(runtime)
  Project.attach(runtime)

  return runtime
}
