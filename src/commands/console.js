export function program(p) {
  return p
    .command("console")
    .description("run an interactive console")
    .option("--type <type>", "which type of console")
    .option("--listen <address>", "set up the console to listen on a port")
    .option("--connect <address>", "connect to another console at address")
}

export async function validate() {
  return true
}

export async function run() {
  const { runtime } = this

  runtime.repl("interactive").launch()
}

export function shouldExit() {
  return this.argv.help
}

export const shouldSilenceConsole = true
