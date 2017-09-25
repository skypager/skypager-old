import skypager, { Runtime } from "skypager-runtime"
import Repl, { attach, registerHelper as register } from "./helper"
import * as feature from "./feature"

export { feature, Repl, attach }

export default Repl

register()
skypager.features.register("node/repl-helper", () => feature)

export function initializer(next) {
  Repl.attach(this)
  skypager.feature("node/repl-helper").enable()
}
