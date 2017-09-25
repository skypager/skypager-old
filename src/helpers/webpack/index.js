import skypager from "skypager"
import Webpack, { attach as attachWebpack, registerHelper as registerWebpack } from "./helper"
//import Compiler, { attach as attachCompiler, registerHelper as registerCompiler } from './compiler'
import * as feature from "./feature"

// skypager.features.register("webpack", () => feature)
// skypager.features.register("legacy/compiler", () => feature)

//export { Webpack, Compiler, feature }
export { Webpack, feature }

export function attach(runtime) {
  if (runtime.commands && runtime.commands.register) {
    runtime.commands.register("webpack", () => require("./commands/webpack"))
  }

  // Compiler.attach(runtime)
  Webpack.attach(runtime)

  return runtime
}

registerWebpack()
// registerCompiler()

export default Webpack
