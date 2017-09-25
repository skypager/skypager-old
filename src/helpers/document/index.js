import skypager from "skypager-runtime"
import Document, { attach, registerHelper as register } from "./helper"
import * as feature from "./feature"

skypager.features.register("document-helper", () => feature)

export { Document, attach, feature }

register()

export default Document
