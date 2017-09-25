export function program(p) {
  return p
    .command("desktop")
    .description("launch a skypager desktop app session")
    .option("--electron-path <path>", "the path to the electron module")
    .option("--entry-path <path>", "the path to the electron entry or main script")
    .option("--interactive", "launch a REPL")
}

export async function validate() {
  return true
}

export function shouldExit() {
  return false
}

export function checkRuntime(runtime) {
  try {
    return !!runtime.packageFinder.attemptResolve(`electron`)
  } catch (error) {
    return false
  }
}

export async function run(options = {}) {
  const { runtime } = this

  options = {
    ...runtime.argv,
    ...options,
    ...this.argv,
  }

  const {
    electronPath = __non_webpack_require__("electron"),
    entryPath = __non_webpack_require__.resolve("skypager-runtimes-electron/entry.js"),
  } = options

  runtime.debug(`Launching electron app`, {
    electronPath,
    entryPath,
    cwd: runtime.cwd,
  })

  const flags = [entryPath]

  if (this.argv.interactive) {
    flags.push("--repl")
  }

  try {
    const proc = require("child_process").spawn(electronPath, flags, {
      cwd: runtime.cwd,
      stdio: "inherit",
      env: {
        ...process.env,
      },
    })

    proc.on("close", code => process.exit(code))
  } catch (error) {}

  return this
}

export async function displayHelp() {
  console.log("RUN HELP")
}
