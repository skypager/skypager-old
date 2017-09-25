export const createGetter = "syncable"

export const featureMethods = [
  "receiveRendererMessage",
  "broadcast",
  "broadcast2",
  "message",
  "listenToRenderer",
  "start",
  "stop"
]

export function featureWasEnabled() {
  this.hide("state", this.runtime.mobx.observable.map([]))

  this.start()
}

export function stop() {
  if (typeof this.stateObserver === "function") {
    this.stateObserver()
  }

  return this
}

export function start() {
  this.hide(
    "stateObserver",
    this.state.observe(({ type, name, newValue, ...update } = {}) => {
      if (!name.startsWith("renderers/")) {
        this.broadcast({ [name]: newValue })
      } else {
      }
    })
  )

  return this
}

// This is weird since we need to have a browser window handle to set up the ipc channels..
export function listenToRenderer(options = {}) {
  //this.runtime.listenToIPC("RENDERER_SYNC", o => this.receiveRendererMessage(o.payload, o.meta))
}

export async function receiveRendererMessage(options = {}) {
  const { browserWindow, currentState, uuid } = options
  const key = `renderers/${browserWindow}`

  this.state.set(key, {
    ...(this.state.get(key) || {}),
    browserWindow,
    uuid,
    ...currentState
  })

  return { key }
}

export function broadcast2(options = {}) {
  return this.runtime.windowManager.allWindows.map(browserWindow =>
    browserWindow.webContents.send("SET_SYNCABLE_STATE", options)
  )
}

export async function broadcast(options = {}) {
  return Promise.resolve(this.runtime.ipcUtils.tell(`STATE_SYNC`, options))
}

export async function message(options = {}) {
  const { id } = options
  return Promise.resolve(
    this.runtime.ipcUtils.tell(`STATE_SYNC_${id}`, this.runtime.lodash.omit(options, "id"))
  )
}
