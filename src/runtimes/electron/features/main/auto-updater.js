export const createGetter = ["autoUpdater"]

export const featureMethods = ["setup", "checkForUpdates", "downloadUpdate"]

export async function checkForUpdates() {
  return false
}

export async function downloadUpdate() {
  return this
}

export function setup(host, options = {}) {
  const { platform, arch } = require("os")
  const { format } = require("url")
  const { runtime } = this

  const {
    hostname = `downloads.skypager.io`,
    tag = `${platform()}_${arch()}`,
    protocol = "https",
    version = runtime.electron.app.getVersion(),
    repository = "skypager/skypager-desktop",
    port = 443,
  } = options

  const pathname = [repository, "update", tag, version].join("/")

  const url = format({ protocol, port, hostname, pathname })

  runtime.electron.autoUpdater.setFeedURL(url)

  return autoUpdater
}
