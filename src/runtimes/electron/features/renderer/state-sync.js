export const createGetter = "syncable"

export function featureWasEnabled() {
  this.hide("state", this.runtime.mobx.observable.map([]))

  this.runtime.listenToIPC("STATE_SYNC", o => {
    return this.receiveSyncBroadcast(o.payload, o.meta)
  })

  this.runtime.listenToIPC(
    `STATE_SYNC_${this.get("runtime.browserWindow.id", this.runtime.uuid)}`,
    o => this.receiveSyncMessage(o.payload, o.meta)
  )

  this.state.observe(({ type, name, newValue, ...update } = {}) => {
    Promise.resolve(this.message())
  })

  this.runtime.electron.ipcRenderer.on("SET_SYNCABLE_STATE", function(sender, message = {}) {
    try {
      this.receiveSyncBroadcast(message, {})
    } catch (error) {}
  })
}

export async function receiveSyncMessage(message = {}, meta = {}) {
  Object.keys(message).forEach(key => {
    this.state.set(key, message[key])
  })

  return {}
}

export async function receiveSyncBroadcast(message = {}, meta = {}) {
  try {
    Object.keys(message).forEach(key => {
      this.state.set(key, message[key])
    })
  } catch (error) {}

  return {}
}

export async function message(options = {}) {
  return this.runtime.ipcUtils.tell(`RENDERER_SYNC`, {
    uuid: this.runtime.uuid,
    browserWindow: this.runtime.get("browserWindow.id"),
    currentState: this.runtime.convertToJS(this.state.toJSON()),
    ...options
  })
}

export const featureMethods = ["receiveSyncMessage", "receiveSyncBroadcast", "message"]
