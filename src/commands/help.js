export function program(p) {
  return p
    .command("help")
    .description("show all available help")
    .option("--website", "open the skypager documentation website")
}

export function checkCommandPhrase(commandPhrase, params = {}) {
  if (!commandPhrase || commandPhrase.length === 0 || commandPhrase.match(/^help/i)) {
    return true
  }
}

export async function run() {
  const { runtime } = this
  const { commandPhrase = "", argv } = runtime

  // looking for help with a subsection
  if (commandPhrase.match(/^help\s\w+/i)) {
    return await displayCommandHelp.call(this)
  } else if (commandPhrase === "help" || commandPhrase === "" || argv.help) {
    return await displayHelp.call(this)
  } else {
    console.log("unknown help")
  }

  return this
}

export async function displayHelp() {
  const { runtime } = this
  const { clear, randomBanner, colors, print } = this.cli
  const { padEnd } = runtime.lodash

  clear()
  randomBanner(this.runtime.displayName, { font: "Slant" })
  print(colors.bold.underline("Available Commands:"), 4, 1, 1)

  const format = (title, desc) => [padEnd(colors.bold.cyan(title), 40).slice(0, 40), desc].join("\t")

  runtime.chain
    .plant(runtime.findAllCommands())
    .sortBy(cmd => cmd.commandBase)
    .reject(cmd => cmd === this)
    .forEach(cmd => {
      const { command = cmd.commandBase, description = cmd.tryGet("description") } = cmd.config
      print(format(command, description), 6, 0, 0)
    })
    .value()

  print("", 2, 2)
}

export async function validate() {}

export function displayCommandHelp() {
  const { runtime } = this
  const { runtime: { commandPhrase } } = this
  const request = commandPhrase.replace(/^help\ /, "")
  const match = runtime.commands.findAllCommands().find(command => command.commandBase === request)

  if (match) {
    return Promise.resolve(match.displayHelp())
  } else {
    return Promise.resolve(this.displayHelp())
  }
}
