const runtime = require("skypager-runtime")
const { Helper } = runtime
const { padEnd } = runtime.lodash

const mapContext = req =>
  req.keys().reduce(
    (memo, key) => ({
      ...memo,
      [key.replace(/\.\//, "").replace(/\.js$/, "")]: req(key).default || req(key)
    }),
    {}
  )

export const INITIALIZING = "INITIALIZING"
export const RUNNING = "RUNNING"
export const PREPARING = "PREPARING"
export const FAILED = "FAILED"
export const COMPLETED = "COMPLETED"
export const VALIDATING = "VALIDATING"

export const states = { VALIDATING, PREPARING, COMPLETED, INITIALIZING, RUNNING, FAILED }

export class Command extends Helper {
  static isCacheable = false

  static states = states

  static isHostSupported(host) {
    return true
  }

  initialize() {
    this.lazy("params", this.normalizer.bind(this), true)

    this.runtime.makeObservable(
      {
        status: INITIALIZING,
        results: [],
        errors: [],
        warnings: []
      },
      this
    )

    this.checkCommandRequirements()
  }

  get commandState() {
    return this.runtime.convertToJS(this.status)
  }

  get isInitializing() {
    return this.commandState === INITIALIZING
  }

  get isFailed() {
    return this.commandState === FAILED
  }

  get isRunning() {
    return this.commandState === RUNNING
  }

  get isPreparing() {
    return this.commandState === PREPARING
  }

  get isComplete() {
    return this.commandState === COMPLETED
  }

  get hasResults() {
    return this.runtime.convertToJS(this.results).length > 0
  }

  get shouldExit() {
    return this.tryResult("shouldExit", () => this.isComplete || this.isFailed)
  }

  get exitCode() {
    return this.isFailed ? 1 : 0
  }

  error(...args) {
    this.runtime.error && this.runtime.error(...args)
  }

  debug(...args) {
    this.runtime.error && this.runtime.debug(...args)
  }
  info(...args) {
    this.runtime.error && this.runtime.info(...args)
  }
  warn(...args) {
    this.runtime.error && this.runtime.warn(...args)
  }
  log(...args) {
    this.runtime.error && this.runtime.log(...args)
  }

  get cli() {
    const cli = this.runtime.cli
    return cli.default ? cli.default : cli
  }

  get colors() {
    return this.cli.colors
  }

  print(...args) {
    return this.cli.print(...args)
  }

  icon(...args) {
    return this.cli.icon(...args)
  }

  /*

  */
  randomBanner(...args) {
    return this.cli.randomBanner(...args)
  }

  /**
    - Isometric4
    - Big
    - Larry 3D
    - AMC Slider
    - Crawford
    - Stop
  styledBanner(phrase) {

  }
  */

  clear() {
    const { clear, noClear } = this.runtime.argv

    if (clear !== false && !noClear && !process.env.NO_CLEAR) {
      return this.cli.clear()
    }
  }

  get preparationHooks() {
    return this.at(
      "options.prepare",
      "options.before",
      "provider.prepare",
      "provider.before"
    ).filter(f => typeof f === "function")
  }

  set completed(val) {
    this.status = val ? COMPLETED : this.status
    return this
  }

  abort(message) {
    this.status = FAILED
    this.addError({ aborted: true, message })

    return this
  }

  async prepare(options = {}, context = {}) {
    const { preparationHooks = [] } = this

    options = { ...this.options, ...options }
    context = { ...this.context, ...context }

    this.status = PREPARING

    const ops = preparationHooks.map(fn => fn.call(this, options, context))

    return await Promise.all(ops)
  }

  get bannerTitle() {
    return (
      this.tryResult(
        "bannerTitle",
        () => this.runtime.get("options.bannerTitle") || this.runtime.get("options.title")
      ) || "Skypager"
    )
  }

  get bannerFont() {
    return this.tryResult("bannerFont", () => this.runtime.get("options.bannerFont", "Slant"))
  }

  async run(params = {}) {
    params = this.params = {
      ...this.params,
      ...this.normalizer.call(this, params)
    }

    if (this.shouldClearTerminal) {
      this.clear()
    }

    if (this.shouldDisplayBanner) {
      this.cli.randomBanner(this.bannerFont, {
        font: this.bannerFont
      })
    }

    if (params.help) {
      return this.displayHelp()
    }

    const isValid = await this.validate()

    if (isValid) {
      try {
        await this.prepare()
      } catch (error) {
        this.status = FAILED
        this.results.push({
          status: FAILED,
          step: PREPARING,
          message: error.message,
          stack: error.stack
        })
        this.error(`command: ${this.name} prepare failed`, { error })
        this.fireHook("prepareDidFail", error, this)
        throw error
      }
    } else {
      this.status = FAILED
      this.addError({ step: VALIDATING })
    }

    this.status = RUNNING

    this.fireHook("willRun", params)

    try {
      const result = await this.runner.call(this, params, this.context)
      this.fireHook("runDidFinish", result, this)
      this.status = COMPLETED
    } catch (error) {
      this.error(`command: ${this.name} failed`, {
        error: { message: error.message, stack: error.stack },
        params
      })
      this.fireHook("runDidFail", error, this, params)
      this.status = FAILED
      this.addError({ message: error.message })
    }

    return this
  }

  async validate() {
    try {
      const result = await this.validator.call(this)
      return result !== false
    } catch (error) {
      this.addError({ error, step: VALIDATING })
      return false
    }
  }

  checkCommandRequirements() {
    const { runtime } = this
    const { runner } = this
    const { isFunction } = runtime.lodash

    if (!isFunction(runner))
      throw new Helper.ProviderError(`${this.name} failed: a runner function is required`)
  }

  // A command can mark itself as being unavailable to a given runtime by returning false
  checkRuntime(runtime) {
    if (typeof this.runtimeChecker !== "function") return true

    return this.runtimeChecker.call(this, runtime)
  }

  get shouldDisplayBanner() {
    return !!(this.tryResult("displayBanner") || this.tryResult("banner"))
  }

  /**
    Commands can opt to clear the terminal before running
  */
  get shouldClearTerminal() {
    return !!(
      this.tryResult("clearTerminal") ||
      this.tryResult("shouldClearTerminal") ||
      this.tryResult("shouldClear")
    )
  }

  /**
    Commands can shut off the console logger
  */
  get shouldSilenceConsole() {
    return this.shouldSilenceConsoleLogger
  }

  get shouldSilenceConsoleLogger() {
    return !!(
      this.tryResult("silent") ||
      this.tryResult("shouldSilenceConsole") ||
      this.tryResult("silenceConsole") ||
      this.tryResult("shouldSilence")
    )
  }

  get checkCommandPhrase() {
    return this.tryGet("checkCommandPhrase")
  }

  get commandBase() {
    return this.tryGet("commandBase", this.name)
  }

  get runtimeChecker() {
    return this.at("options.checkRuntime", "provider.checkRuntime")
      .filter(f => typeof f !== "undefined")
      .map(f => (typeof f === "string" ? r => r.result(f) : f))
      .find(f => typeof f === "function")
  }

  get definition() {
    return this.at(
      "options.program",
      "provider.program",
      "options.definition",
      "provider.definition",
      "options.define",
      "provider.define"
    ).find(f => typeof f === "function")
  }

  get runner() {
    return this.at(
      "options.execute",
      "options.run",
      "provider.execute",
      "provider.run",
      "provider.default",
      "provider"
    ).find(f => typeof f === "function")
  }

  get normalizer() {
    const { defaultsDeep: defaults } = this.runtime.lodash
    const normalizer = this.tryGet("normalize")
    const argv = this.runtime.argv

    return typeof normalizer === "function"
      ? (options = {}) => defaults(normalizer.call(this, options), argv)
      : (options = {}) => defaults(options, argv)
  }

  get validator() {
    return (
      this.at("options.validate", "provider.validate").find(f => typeof f === "function") ||
      (() => true)
    )
  }

  displayHelp() {
    const handler = this.tryGet("displayHelp")

    this.status = COMPLETED

    return typeof handler === "function" ? handler.call(this) : this.displayDefaultHelp()
  }

  addWarning(obj) {
    this.warnings.push(obj)
    return this
  }

  addError(obj) {
    this.errors.push(obj)
    return this
  }

  addResult(obj) {
    this.results.push(obj)
    return this
  }

  displayDefaultHelp() {
    const { print, colors, clear, randomBanner } = this.cli
    const { padStart } = this.runtime.lodash

    const {
      description = this.tryGet("description"),
      usage = this.tryGet("usage"),
      command = this.tryGet("command", this.tryGet("name")),
      options = [],
      examples = []
    } = this.config

    clear()
    randomBanner(this.runtime.displayName, { font: "Isometric4" })
    print(`${colors.bold.green(command)}: ${description}`, 4, 1, 0)
    print(colors.bold.underline("Available Options:"), 4, 1, 1)

    options.forEach(([flag, description] = []) => {
      print(formatOption(flag, description, this.cli), 6, 0, 0)
    })

    print("", 2, 2)
  }

  get transformConfigKeys() {
    return Command.transformConfigKeys.bind(this)
  }

  static configFeatures() {
    return mapContext(require.context("./config/features", false, /\.js$/))
  }

  static configReducers() {
    return mapContext(require.context("./config/reducers", false, /\.js$/))
  }

  static transformConfigKeys(value, key) {
    if (key === "option") {
      return "options"
    }
    return key
  }

  static matchCommand(runtime, commands) {
    const match = Command.findAllCommands(runtime, commands).find(
      cmd =>
        cmd.checkCommandPhrase
          ? cmd.checkCommandPhrase.call(cmd, runtime.commandPhrase, runtime.params)
          : runtime.commandBase && cmd.commandBase.startsWith(runtime.commandBase)
    )

    return match
  }

  static findAllCommands(runtime, commands) {
    return (commands || runtime.commands).available
      .filter(v => v)
      .map(id => runtime.command(id))
      .filter(c => c.checkRuntime.call(c, runtime))
  }

  static didCreateHelper(runtime, command) {
    if (command.definition) {
      const cfg = command.configurator()
      const result = command.definition(cfg) || cfg

      try {
        command.configure(() => result)
      } catch (error) {
        console.log("err", err.message, command.name)
      }
    }

    return command
  }

  static attach(host, options = {}) {
    const resp = Helper.attach(host, Command, {
      registry: Helper.createContextRegistry("commands", {
        context: require.context("../../commands", true, /\.js$/)
      }),
      ...options
    })

    const reg = host[options.registryProp || "commands"]

    reg.findAllCommands = (h = host) => Command.findAllCommands(h, host.get("commands"))
    reg.matchCommand = (h = host) => Command.matchCommand(h, host.get("commands"))

    return resp
  }
}

export const registerHelper = () => {
  if (Helper.registry.available.indexOf("command") === -1) {
    Helper.registerHelper("command", () => Command)
  }
}

export default Command

export const attach = Command.attach

function formatOption(flag, description, cli) {
  const parts = flag.split(" ")
  const main = parts.shift()
  const param = `${cli.colors.bold.cyan(main)} ${parts.join(" ")}`

  return [padEnd(param, 40).slice(0, 40), description].join("\t\t")
}
