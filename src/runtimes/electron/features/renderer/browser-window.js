export const hostMethods = ["lazyNativeBrowserWindow", "lazyBrowserWindow", "lazyPositioner"]

export function lazyNativeBrowserWindow() {
  return this.electron.remote.getCurrentWindow()
}

export function lazyBrowserWindow() {
  const { nativeBrowserWindow } = this

  // TODO wrap / decorate

  return nativeBrowserWindow
}

export function lazyPositioner() {
  const Positioner = require("./positioner")
  return new Positioner(this.browserWindow)
}
