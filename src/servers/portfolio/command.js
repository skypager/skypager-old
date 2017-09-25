export function program(p) {
  return p
    .command("portfolio")
    .description("control the portfolio server")
    .option("--port", "which port to listen on")
}

export async function validate() {
  return true
}

export async function prepare() {
  return true
}

export async function run() {
  this.print("The portfolio server is starting")
  await this.runtime.portfolioServer.start().then(() => ({}))
  this.print("The portfolio server is started")
  return this
}
