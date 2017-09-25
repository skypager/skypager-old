import { join } from "path"

export const isTerminal = true

export function replWillLaunch() {
  if (this.options.clearOutput !== false) {
    clearOutput()
  }
}

export function replDidLaunch() {
  const { repl } = this

  this.loadExtension("history", join(__dirname, "..", ".history"))

  repl.displayPrompt()
}

export function displayBanner() {
  const { print, randomBanner } = this.cli
  const title = this.tryResult("banner", this.tryGet("runtime.currentPackage.name", "skypager"))

  const base = this.runtime.has("homeFolder")
    ? this.runtime.homeFolder.homedir
    : process.env.HOME || process.env.USERDIR || this.runtime.resolve(this.runtime.cwd, "..")

  randomBanner(title.replace(/-.*$/g, ""), { font: this.get("options.bannerFont", "Slant") }, 2)
  print("\n\n")
  print(`CWD: ${this.runtime.cwd.replace(base, "~")}`, 2)

  if (this.runtime.currentPackage) {
    print(
      `Current Project: ${this.runtime.currentPackage.name}@${this.runtime.currentPackage.version}`,
      2
    )
  }

  if (this.runtime.gitInfo) {
    print(
      [`Branch: ${this.runtime.gitInfo.branch}`, `SHA: ${this.runtime.gitInfo.abbreviatedSha}`],
      2
    )
  }

  print("\n\n\n\n\n", 2, 2, 2)
}

export function replWasCreated(repl) {
  const terminal = this

  terminal.loadCommand("clear-screen", { repl })
  terminal.loadCommand("runner", { repl })
}

export function input(options = {}, context = {}) {
  return process.stdin
}

export function output(options = {}, context = {}) {
  return process.stdout
}

export function clearOutput() {
  return process.stdout.write("\x1bc")
}

export function buildContext(base = {}, helperContext = {}) {
  const { runtime } = this

  const fns = [
    "client",
    "command",
    "document",
    "documentType",
    "feature",
    "page",
    "project",
    "projectType",
    "select",
    "selectChain",
    "repl",
    "server",
    "service",
    "webpack"
  ]

  const fnInterface = fns.reduce((memo, fn) => {
    if (runtime.has(fn) && typeof runtime[fn] === "function") {
      memo[fn] = runtime.get(fn).bind(runtime)
    }

    return memo
  }, {})

  const _replServer = this.repl

  return {
    runtime: runtime,
    skypager: runtime,
    _replInstance: this,
    _replServer,
    ...runtime.slice(
      "pathUtils",
      "lodash",
      "stringUtils",
      "urlUtils",
      "proc",
      "mobx",
      "packageFinder",
      "fileManager",
      "Helper",
      "Runtime",
      "selectors"
    ),
    ...runtime.slice(
      "bundlers",
      "clients",
      "commands",
      "documents",
      "documentType",
      "features",
      "pages",
      "projects",
      "projectTypes",
      "servers",
      "services",
      "webpacks",
      "selectors"
    ),
    ...fnInterface,
    ...base
  }
}

export function replOptions(options = {}, context = {}) {
  const { cli } = this
  const { blue, cyan, grey, white } = cli.colors

  return {
    prompt: [blue.bold("Sk"), cyan.bold("yp"), white("age"), grey("r"), grey.dim(">: ")].join("")
  }
}
