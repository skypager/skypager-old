import runtime from "skypager-runtime"

const { version } = __PACKAGE__

runtime.set("framework.version", version)

runtime.propUtils.hide(runtime.framework, "dirname", () => __dirname, true)
runtime.propUtils.hide(
  runtime.framework,
  "moduleLocation",
  () => runtime.pathUtils.resolve(__dirname, ".."),
  true
)

runtime.selectors.add(require.context("./selectors", true, /\.js$/))

module.exports = runtime
