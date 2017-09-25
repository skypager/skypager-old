export const hostMethods = [
  "getCommandPhrase",
  "getCommandBase",
  "getIsRunningCli",
  "getMatchingCommand",
  "lazyCliHandler",
  "getDefaultCliHandler",
  "findAllCommands",
  "getCli"
]

/*
  used to create a commandPhrase getter on the runtime
*/
export function getCommandPhrase(options = {}, context = {}) {
  const { runtime = this } = context
  const parts = this.get("argv._", [])
  return parts.length > 0 ? parts.join(" ") : ""
}

/*
  used to create a commandBase getter on the runtime
*/
export function getCommandBase(options = {}, context = {}) {
  const { runtime = this } = context
  const base = runtime.get("argv._[0]")
  return !base && runtime.argv.help ? "help" : base
}

/*
  used to create a cli getter on the runtime
*/
export function getCli() {
  return require("./cli").default
}

export function getIsRunningCli() {
  if (this.argv.cli === true) return true

  const executable = process && process.argv && process.argv[1]
  const name = executable && executable.split("/").pop()

  return name && (name === "sky" || name.startsWith("sky-") || name.startsWith("skypager"))
}

export const getisRunningCli = getIsRunningCli

/*
  used to create a matchingCommand getter on the runtime
*/
export function getMatchingCommand(options = {}, context = {}) {
  const { runtime = this } = context

  return runtime.commands ? runtime.commands.matchCommand(runtime, runtime.commands) : undefined
}

/*
  used to create a cliHandler getter on the runtime
*/
export function lazyCliHandler(options = {}, context = {}) {
  const { runtime = this } = context

  if (!runtime.isRunningCli) return
  if (!runtime.commandBase) return runtime.defaultCliHandler
  if (runtime.commandBase && !runtime.matchingCommand)
    return runtime.command("help", { invalid: true })

  return runtime.matchingCommand
}

/*
  used to create a defaultCliHandler getter on the runtime
*/
export function getDefaultCliHandler(options = {}, context = {}) {
  const { runtime = this } = context
  const { defaultCommand = "help" } = options
  return runtime.command(defaultCommand)
}

export function findAllCommands() {
  return this.get("commands.available", [])
    .map(id => this.command(id))
    .filter(cmd => cmd.checkRuntime.call(cmd, this))
}
