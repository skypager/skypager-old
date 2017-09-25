import skypager from "skypager-runtime"
import Command, { attach, registerHelper as register } from "./helper"
import * as feature from "./feature"

export { feature, Command, attach }

export default Command

register()

skypager.features.register("node/command-helper", () => feature)

export function initializer(next) {
  Command.attach(this)
  skypager.feature("node/command-helper").enable()
}
