export const hostMethods = ["listenToIPC"]

export const featureMethods = ["createStream", "createResponder", "ask", "tell"]

export const createGetter = ["ipcUtils"]

export function featureWasEnabled() {
  this.lazy("responder", () => this.createResponder.call(this))
}

export function ask(topic, payload) {
  topic = topic || `ipc-${this.runtime.uuid}`
  return this.responder.ask(topic, payload)
}

export function tell(topic, payload) {
  topic = topic || `ipc-${this.runtime.uuid}`
  return this.responder.tell(topic, payload)
}

export function listenToIPC(topic, handler, meta = {}) {
  topic = topic || `ipc-${this.uuid}`
  handler = handler || this.lodash.identity

  this.ipcUtils.responder.registerTopic(topic, function(payload = {}) {
    return Promise.resolve(handler.call(this, { topic, payload, meta })).catch(error => ({
      error,
      topic,
      payload,
      meta
    }))
  })

  return this
}

export function createStream(options = {}) {
  const { runtime } = this
  const {
    objectMode = false,
    channel = `ipc-stream-${runtime.get("browserWindow.id", runtime.uuid)}`
  } = options

  const IPCStream = require("./stream")

  return new IPCStream(channel, {
    objectMode
  })
}

export function createResponder() {
  const IPCResponder = require("./responder")
  const { runtime } = this
  const { ipcRenderer } = runtime.electron

  return new IPCResponder(ipcRenderer.send.bind(ipcRenderer), ipcRenderer.on.bind(ipcRenderer))
}
