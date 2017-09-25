module.exports = {
  parseHash,
  decorateWindow,
}

function parseHash() {
  window.__args__ = {}

  if (window.location.hash) {
    var hash = window.location.hash.slice(1).replace("/", "")
    try {
      window.__args__ = Object.freeze(JSON.parse(decodeURIComponent(hash)))
    } catch (error) {}
  }

  return window.__args__
}

function decorateWindow(context = {}) {
  const __args__ = parseHash()

  const { dialog, BrowserWindow } = require("electron").remote
  const { ipcRenderer } = require("electron")
  const IPCResponder = require("./responder")
  const IPCStream = require("./stream")
  const Positioner = require("./positioner")

  const responder = new IPCResponder(ipcRenderer.send.bind(ipcRenderer), ipcRenderer.on.bind(ipcRenderer))

  function getBrowserWindow(windowId = context.windowId) {
    return require("electron").remote.getCurrentWindow()
  }

  return Object.assign(context, {
    storage: require("./storage"),

    BrowserWindow,

    get positioner() {
      return new Positioner(getBrowserWindow())
    },

    //streamCommandOutput,

    electronDialog: dialog,

    onPanelMessage(handler, channel) {
      if (typeof handler === "string" && typeof channel === "function") {
        return responder.registerTopic(handler, payload => Promise.resolve(channel(payload)))
      } else if (typeof handler === "function" && typeof channel === "string") {
        return responder.registerTopic(channel, payload => Promise.resolve(handler(payload)))
      }
    },

    resizeBrowserWindow(...args) {
      return context.getCurrentPanel().resize(...args)
    },

    moveBrowserWindow(...args) {
      return context.positioner.move(...args)
    },

    ipcRenderer,

    ipc: ipcRenderer,

    responder,

    parseHash,

    electronRuntime: require("electron").remote.getGlobal("SkypagerRuntime"),

    appInstance: require("electron").remote.getGlobal("AppInstance"),

    getCurrentPanel() {
      try {
        return getBrowserWindow().getPanel()
      } catch (error) {
        return context.findPanelByCacheKey()
      }
    },

    findPanelByCacheKey() {
      return __args__.panelCacheKey
        ? context.electronRuntime.cache.get(__args__.panelCacheKey) ||
            context.appInstance.allPanels(p => p.panelId === __args__.panelId)
        : context.appInstance.allPanels.find(p => p.panelId === __args__.panelId)
    },

    ipcStream: new IPCStream(__args__.panelId, {
      objectMode: false,
    }),
  })
}
