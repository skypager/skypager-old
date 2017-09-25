import defaults from "lodash/defaultsDeep"

export default function html(existing, cfg) {
  if (!arguments.length) {
    return
  }

  const { project } = this

  if (!existing) {
    existing = []
  }

  if (typeof cfg === "object") {
    return [...existing, defaults({}, cfg, this.get("htmlOptions"), project.getOption("htmlOptions"))]
  } else {
    return existing
  }
}
