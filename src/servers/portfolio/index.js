export function attach(runtime) {
  runtime.features.register("servers/portfolio", () => require("./feature"))
  runtime.commands.register("portfolio", () => require("./command"))
  runtime.feature("servers/portfolio").enable()
}
