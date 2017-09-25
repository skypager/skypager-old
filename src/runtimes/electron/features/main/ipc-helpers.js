export const hostMethods = ["listenToIPC"]

export const featureMethods = ["createStream", "createResponder", "ask", "tell"]

export const createGetter = ["ipcUtils"]

export function featureWasEnabled(options = {}) {}

export function ask(topic, payload = {}, includeFn) {
  const controllers = this.runtime.windowManager.chain
    .get("controllersByName")
    .pickBy(
      (controller, name) => (typeof includeFn === "function" ? includeFn(controller, name) : true)
    )
    .values()
    .value()

  return Promise.all(
    controllers.map(w =>
      w.responder
        .ask(topic, payload)
        .then(resp => resp)
        .catch(err => ({ browserWindowId: w.id, topic, payload, error: err }))
    )
  )
}

export function tell(topic, payload = {}, includeFn) {
  const controllers = this.runtime.windowManager.chain
    .get("controllersByName")
    .pickBy(
      (controller, name) => (typeof includeFn === "function" ? includeFn(controller, name) : true)
    )
    .values()
    .value()

  return Promise.all(
    controllers.map(w =>
      w.responder
        .tell(topic, payload)
        .then(resp => resp)
        .catch(err => ({ browserWindowId: w.id, topic, payload, error: err }))
    )
  )
}

export function listenToIPC(topic, handler, includeFn) {
  topic = topic || `ipc-main`
  handler = handler || this.lodash.identity

  const controllers = this.windowManager.chain
    .get("controllersByName")
    .pickBy(
      (controller, name) => (typeof includeFn === "function" ? includeFn(controller, name) : true)
    )
    .values()
    .value()

  return controllers.map(win => {
    win.responder.registerTopic(topic, function(payload = {}) {
      return Promise.resolve(handler.call(this, { topic, payload })).catch(error => ({
        error,
        topic,
        payload
      }))
    })
  })
}

export function createStream(options = {}) {
  const { objectMode = false, channel = "main" } = options
  let { browserWindow } = options

  const IPCStream = require("./stream")

  if (!browserWindow) {
    throw new Error("A Browser Window must be present")
  }

  return new IPCStream(channel, browserWindow, {
    objectMode
  })
}

export function createResponder(options = {}, context = {}) {
  const { runtime } = this
  const { ipcMain } = runtime.electron
  const IPCResponder = require("./responder")

  const { browserWindow } = options

  if (!browserWindow) {
    throw new Error("A Browser Window must be present")
  }

  if (browserWindow) {
    return new IPCResponder(
      browserWindow.webContents.send.bind(browserWindow.webContents),
      ipcMain.on.bind(ipcMain)
    )
  }
}
