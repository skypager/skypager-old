export function featureWasEnabled() {
  const { runtime } = this

  if (runtime.commands) {
    runtime.commands.register("serve", () => require("./commands/serve"))
  } else {
    runtime.whenReady(() => {
      runtime.commands.register("serve", () => require("./commands/serve"))
    })
  }
}
