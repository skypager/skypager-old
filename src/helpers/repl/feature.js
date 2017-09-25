export function featureWasEnabled() {
  const { runtime } = this

  runtime.whenReady(() => {
    runtime.commands && runtime.commands.register("console", () => require("commands/console"))
  })
}
