export function program(p) {
  return p
    .command("serve")
    .description("start one of the project servers")
    .option("--profile", "which server do you want to use")
    .option("--port <port>", "which port to listen on")
    .option("--hostname <hostname>", "which hostname to listen on")
    .option("--socket <path>", "path to a socket file")
}

export async function validate() {}

export async function run(options = {}) {
  const { runtime } = this
  const {
    profile = guessProfile(runtime),
    port = process.env.PORT || 3000,
    hostname = process.env.HOSTNAME || "0.0.0.0"
  } = options

  if (!this.argv.silent) {
    //runtime.logging.enableConsoleOutput()
  }

  try {
    runtime.debug(`Starting server with ${profile}`, { argv: this.argv, port, hostname })
    const server = skypager.server(profile, { ...skypager.argv, ...options, port, hostname })
    await server.start()
    runtime.debug(`Server has started`)
  } catch (error) {
    runtime.error(`Error starting the server`, { error })
  }
}

function guessProfile(runtime) {
  const { argv } = runtime
  const { profile = argv._ && argv._.length && argv._[0] } = argv

  return runtime.servers.available.indexOf(profile) >= 0
    ? profile
    : skypager.isProduction ? "history" : "development"
}
