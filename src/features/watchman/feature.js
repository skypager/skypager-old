export const createGetter = "watchman"

export const featureMethods = [
  "cmd",
  "subscribe",
  "setupWatch",
  "checkCapabilities",
  "getWatchman",
  "lazyClient"
]

export function featureWasEnabled(options = {}) {
  const { has } = this.lodash

  this.checkCapabilities(options)
    .then(response => {
      if (has(response, "warning")) {
        this.runtime.warn(response.warning)
      }

      this.status = "READY"
    })
    .catch(error => {
      this.error = error
      this.status = "FAILED"
      this.client.end()
    })
}

export const featureMixinOptions = {
  insertOptions: false,
  injectOptions: false,
  partial: []
}

export async function cmd(...args) {
  return this.client.command(args, (err, resp) => {
    return new Promise((resolve, reject) => {
      err ? reject(err) : resolve(resp)
    })
  })
}

/**

Valid Expression Terms:

allof
anyof
dirname & idirname
empty
exists
match & imatch
name & iname
not
pcre & ipcre
since
size
suffix
type
*/

export async function subscribe(options = {}) {
  if (!this.watch) {
    await this.setupWatch({ path: this.runtime.cwd, ...options })
  }

  if (this.subscription && !options.fresh) {
    return this.subscription
  }

  const {
    relativePath = this.relativePath,
    fields = ["name", "size", "mtime_ms", "exists", "type"],
    extensions = [
      ".md",
      ".yml",
      ".json",
      ".js",
      ".coffee",
      ".ts",
      ".mjs",
      ".pdf",
      ".png",
      ".gif",
      ".jpg",
      ".css",
      ".scss",
      ".less",
      ".ttf",
      ".woff",
      ".eot",
      ".svg",
      ".woff2"
    ],
    patterns = [],
    globs = []
  } = { ...this.options, ...options }

  const all = options.all === true
  const any = !all

  const {
    subscriptionName = this.runtime.get("currentPackage.name", this.runtime.cwd.split("/").pop())
  } = { ...this.options, ...options }

  const subOptions = {
    fields,
    expression: [
      any ? "anyof" : "allof",
      ...extensions.map(ext => ["imatch", ext, "basename"]),
      ...[...globs, ...patterns].map(e => ["imatch", e, "wholename"])
    ]
  }

  const subscription = this.cmd("subscribe", this.watch, subscriptionName, subOptions)
  this.hide("subscription", subscription)

  this.client.on("subscription", resp => {
    if (resp.subscription !== subscriptionName) return

    this.emit("receivedFileNotification", resp, {
      subOptions,
      name: subscriptionName,
      extensions,
      patterns,
      globs,
      fields,
      relativePath
    })

    this.runtime.debug(`received watchman notification`, { resp })
  })

  return await subscription
}

export async function setupWatch(options = {}) {
  if (typeof options === "string") {
    options = { path: options }
  }

  const { path = this.runtime.cwd } = options

  const response = await new Promise((resolve, reject) => {
    this.client.command(["watch-project", path], (err, resp) => {
      err ? reject(err) : resolve(resp)
    })
  }).catch(error => {
    this.runtime.error("Error while enabling watcher")
    return { error }
  })

  if (response.warning) {
    this.runtime.warn(response.warning)
  }

  if (response.watch) {
    this.hide("watch", response.watch)
  }

  if (response.relative_path) {
    this.relativePath = response.relative_path
    this.relative_path = response.relative_path
  }

  return response
}

export async function checkCapabilities(options = {}) {
  const { optional = [], required = ["relative_root"] } = options

  return await new Promise((resolve, reject) => {
    this.client.capabilityCheck({ optional, required }, (err, resp) => {
      err ? reject(err) : resolve(resp)
    })
  })
}

export function isSupported() {
  const { attempt, isError } = this.lodash

  return this.runtime.has("packageFinder")
    ? this.runtime.packageFinder.attemptResolve("fb-watchman")
    : !isError(attempt(() => __non_webpack_require__.resolve("fb-watchman")))
}

export function getWatchman() {
  return __non_webpack_require__("fb-watchman")
}

export function lazyClient(options = {}) {
  const { Client = this.watchman.Client } = options

  const client = new Client()

  return client
}
