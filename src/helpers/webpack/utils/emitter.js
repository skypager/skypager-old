import { EventEmitter } from "fbemitter"

export function attachEmitter(project) {
  project.hide("emitter", new EventEmitter())
  project.hide("on", project.emitter.addListener.bind(project.emitter))
  project.hide("once", project.emitter.once.bind(project.emitter))
  project.hide("off", project.emitter.removeCurrentListener.bind(project.emitter))
  project.hide("emit", project.emitter.emit.bind(project.emitter))
  project.hide("trigger", project.emitter.emit.bind(project.emitter))
}

export default attachEmitter
