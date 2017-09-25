import { join } from "path"
import { configure as base } from "./node"

export function configure(options = {}, context = {}) {
  const { project } = context
  const builder = base.call(this, { ...this.options, ...options }, { ...this.context, ...context })

  const pathToChai = project.existsSync(project.resolve("node_modules", "chai"))
    ? project.join("node_modules", "chai")
    : join(__dirname, "..", "node_modules", "chai")

  const { target = "node" } = options

  return builder
    .sourcemap("source-map")
    .node({ __dirname: false, __filename: false, process: false })
    .externals(project.join("node_modules"))
    .when(project.fsx.existsSync(project.join("..", "node_modules")), c =>
      c.externals(project.join("..", "node_modules")),
    )
    .when(project.fsx.existsSync(project.join("..", "..", "node_modules")), c =>
      c.externals(project.join("..", "..", "node_modules")),
    )
    .target(target)
    .loader("json", [".json"])
    .plugin("webpack.DefinePlugin", {
      "process.env.NODE_ENV": JSON.stringify("test"),
      __TEST__: true,
      __PROD__: false,
    })
    .plugin("webpack.BannerPlugin", {
      raw: true,
      entryOnly: false,
      banner: `
        global.chai = require("${options.pathToChai || pathToChai}");
        global.sinon = require('sinon');
        global.should = chai.should();
        global.expect = chai.expect();
        global.chai.use(require('sinon-chai'))
      `,
    })
}
