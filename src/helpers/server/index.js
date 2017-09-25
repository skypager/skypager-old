import skypager from "skypager-runtime"
import Server, { attach, registerHelper as register } from "./helper"
import * as feature from "./feature"

skypager.features.register("node/server-helper", () => feature)

export { Server, attach, feature }

register()

export default Server
