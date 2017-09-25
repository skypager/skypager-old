export function attach(runtime) {
  runtime.features.register("servers/graphql", () => require("./feature"))
  runtime.feature("servers/graphql").enable()
  return runtime.apolloServer
}
