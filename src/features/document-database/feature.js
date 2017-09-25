import router from "runtime/utils/router"
import * as config from "./config"
import pathMatcher from "runtime/utils/path-matcher"

export const createGetter = "docsDB"

export const featureMethods = [
  "doc",
  "start",
  "receiveFileUpdate",
  "receiveDirectoryUpdate",
  "receiveStatusUpdate",
  "addFile",
  "removeFile",
  "updateFile",
  "addDirectory",
  "updateDirectory",
  "removeDirectory",
  "updateStatus",
  "selectMatches",
  "matchPaths",
  "getAvailable",
  "getRouter",
  "applyRoute"
]

export const CREATED = "CREATED"
export const STARTING = "STARTING"
export const FAILED = "FAILED"
export const READY = "READY"

export const STATUSES = {
  CREATED,
  READY,
  FAILED,
  STARTING
}

export const configFeatures = config.configFeatures
export const configReducers = config.configReducers

export function getRouter() {
  return this.docsRouter
}

export function applyRoute(pattern, o = {}, c = {}) {
  o = {
    pattern,
    ...(c || {}),
    ...(o || {})
  }

  let results = this.docsRouter.get(o.pattern).map(({ result, path } = {}) => ({
    path,
    ...result
  }))

  if (o.include) {
    results = results.filter(result => pathMatcher(o.include, result.path))
  }

  if (o.exclude) {
    results = results.filter(result => !pathMatcher(o.exclude, result.path))
  }

  return results
}

export function matchPaths(options = {}) {
  const { rules = options.rules || options } = options
  return this.fileIds.filter(fileId => pathMatcher(rules, fileId))
}

export function selectMatches(options = {}) {
  const { convertToJS } = this.runtime
  const paths = this.matchPaths(options)
  return paths.map(key => convertToJS(this.files.get(key)))
}

export function getAvailable() {
  return this.documents.keys()
}

export function doc(documentId) {
  if (this.documents.has(documentId)) {
    return this.documents.get(documentId)
  }
}

export function featureWasEnabled(config = {}) {
  const { runtime } = this
  runtime.selectors.add(require.context("./selectors", true, /\.js$/))

  if (runtime.servers) {
    runtime.servers.add(require.context("./servers", true, /.*\/index\.js$/))
  }

  router(this, { hidden: true, routerProperty: "docsRouter" })
}

export async function addFile(options = {}, context = {}) {
  this.emit("willAddFile", options)

  const { update = {} } = options
  const { newValue: file, name: fileId } = update

  if (this.documents.has(fileId)) {
    this.documents.set(fileId, { ...this.documents.get(fileId), id: fileId, file })
  } else {
    this.documents.set(fileId, { id: fileId, file })
  }

  return this
}

export async function updateFile(options = {}, context = {}) {
  this.emit("willUpdateFile", options)
  return this
}

export async function removeFile(options = {}, context = {}) {
  this.emit("willRemoveFile", options)
  return this
}

export async function updateDirectory(options = {}, context = {}) {
  const { newValue, oldValue, name } = options
  this.emit("willUpdateDirectory", options)
  return this
}

export async function addDirectory(options = {}, context = {}) {
  const { newValue, name } = options
  this.emit("willAddDirectory", { newValue, name })
  return this
}

export async function removeDirectory(options = {}, context = {}) {
  this.emit("willRemoveDirectory", options)
  return this
}

export async function updateStatus(options = {}, context = {}) {
  this.emit("willUpdateStatus", options)
  return this
}

export function receiveFileUpdate(options = {}, context = {}) {
  const { type, update } = options
  const { runtime } = this

  this.emit("receivedUpdate", { updateType: "file", ...options })

  const catcher = eventName => ({ message = "", stack = [] } = {}) =>
    runtime.error(`docsDB error while ${eventName}`, { message, stack })

  const noOp = t => t

  switch (type) {
    case "add":
      this.addFile(options).catch(catcher("addFile")).then(noOp)
      break
    case "update":
      this.updateFile(options).catch(catcher("updateFile")).then(noOp)
      break
    case "remove":
      this.removeFile(options).catch(catcher("removeFile")).then(noOp)
      break
    default:
      runtime.debug("docsDB received directory update", { type, name: update.name })
  }
}

export function receiveStatusUpdate(options = {}, context = {}) {
  const { type, update = {} } = options
  const { runtime } = this

  this.emit("receivedUpdate", { updateType: "status", ...options })

  switch (type) {
    case "add":
      break
    case "update":
      break
    case "remove":
      break
    default:
      runtime.debug(`docsDb received status update`, {
        type,
        name: update.name,
        newValue: update.newValue,
        oldValue: update.oldValue
      })
  }
}

export function receiveDirectoryUpdate(options = {}, context = {}) {
  const { type, update } = options
  const { runtime } = this

  this.emit("receivedUpdate", { updateType: "directory", ...options })

  const catcher = eventName => ({ message = "", stack = [] } = {}) =>
    runtime.error(`docsDB error while ${eventName}`, { message, stack })

  const noOp = t => t

  switch (type) {
    case "add":
      this.addDirectory(options).catch(catcher("addDirectory")).then(noOp)
      break
    case "update":
      this.updateDirectory(options).catch(catcher("updateDirectory")).then(noOp)
      break
    case "remove":
      this.removeDirectory(options).catch(catcher("removeDirectory")).then(noOp)
      break
    default:
      runtime.debug("docsDB received directory update", { type, name: update.name })
  }
}

export async function start(options = {}) {
  const { runtime } = this
  const { fileManager } = runtime

  if (this.status === READY) {
    await fileManager.startAsync()
    return this
  } else if (this.status === STARTING) {
    await fileManager.activationEventWasFired()
    return this
  }

  this.status = STARTING

  const {
    RECEIVED_DIRECTORY_UPDATE,
    RECEIVED_STATUS_UPDATE,
    RECEIVED_FILE_UPDATE
  } = fileManager.lifeCycleHooks

  fileManager.on(RECEIVED_FILE_UPDATE, (type, update) => {
    this.receiveFileUpdate({ type, update, fileManager })
  })

  fileManager.on(RECEIVED_DIRECTORY_UPDATE, (type, update) => {
    this.receiveDirectoryUpdate({ type, update, fileManager })
  })

  fileManager.on(RECEIVED_STATUS_UPDATE, (type, update) => {
    this.receiveStatusUpdate({ type, update, fileManager })
  })

  await fileManager.startAsync()

  this.status = READY

  return this
}

export function observables(options = {}, context = {}) {
  return {
    routes: ["map", {}],
    documents: ["map", {}],
    status: CREATED
  }
}
