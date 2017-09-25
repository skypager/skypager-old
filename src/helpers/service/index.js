import skypager from "skypager-runtime"
import Service, { attach, registerHelper as register } from "./helper"
import * as feature from "./feature"

skypager.features.register("service-helper", () => feature)

export { Service, attach, feature }

register()

export default Service
