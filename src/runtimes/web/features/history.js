import * as history from "history"

export const hostMethods = ["lazyHistory", "startHistory"]

export function lazyRoutes() {
  return
}

// NOTE: Need to find a way to detect if push state is running
export function lazyHistory() {
  const runtime = this
  const options = this.get("argv.history", {})

  let { type = runtime.historyType } = options

  if (!type) {
    if (runtime.isElectronRenderer) {
      type = "hash"
    } else if (runtime.isBrowser) {
      type = "browser"
    } else {
      type = "memory"
    }
  }

  switch (type) {
    case "browser":
      return history.createBrowserHistory(options)
    case "memory":
      return history.createMemoryHistory(options)
    case "hash":
    default:
      return history.createHashHistory()
  }
}

export function featureWasEnabled() {}

export function startHistory() {
  const runtime = this

  const unlisten = runtime.history.listen((location, action) => {
    const oldLocation = runtime.location || {}

    runtime.location = location
    runtime.historyAction = action

    const params = {
      location,
      action,
      ...location
    }

    if (oldLocation.pathname !== params.pathname) {
      this.fireHook("locationDidChange", params)
      runtime.fireHook("historyLocationDidChange", params)
    }
  })

  this.hide("unlisten", unlisten.bind(this))

  this.state.set("historyIsActive", true)

  return this
}
