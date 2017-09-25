import { Events } from "skywalker"
import router from "runtime/utils/router"
import md5File from "md5-file"
import { watch } from "chokidar"
import pathMatcher from "runtime/utils/path-matcher"
import { relative } from "path"
import Promise from "bluebird"

import * as config from "./config"
import * as actions from "./actions"
import * as computedProperties from "./computed"

export const createGetter = "fileManager"

export function featureWasEnabled() {
  const { runtime } = this

  actions.attach(this)
  computedProperties.attach(this)

  runtime.state.set("fileManagerActive", false)

  if (runtime.argv.fileManager) {
    this.startAsync().then(() => {})
  }

  runtime.on("fileManagerWillStart", fm => {
    if (runtime.activateDocumentWatcher) {
      runtime.debug("listen to file manager")
      runtime.activateDocumentWatcher(fm)
    }
  })
}

export const featureMethods = [
  "start",
  "startAsync",
  "activationEventWasFired",
  "getWalker",
  "getRouter",
  "getDirectoryRouter",
  "getFileIds",
  "getDirectoryIds",
  "hashFile",
  "hashFiles",
  "readContents",
  "lazyMemoryFileSystem",
  "createMemoryFileSystem",
  "syncMemoryFileSystem",
  "findByExtension",
  "findByMimeType",
  "route",
  "getRoutes",
  "whenActivated",
  "file",
  "directory",
  "getFileReader",
  "exportTree",
  "toFileId",
  "getBaseFolder",
]

export async function exportTree(options = {}, context = {}) {
  if (typeof options === "string") options = { rootNode: options }
  if (typeof context === "string") {
    options.destination = context
    context = this.context
  }

  const { rootNode = "", destination } = options

  if (!destination) {
    throw new Error(`Must specify a destination`)
  }

  const tree = await this.runtime.select("files/tree", { rootNode, ...options })

  return tree
}

export function getFileReader() {
  return this.tryGet("fileReader", this.runtime.fsx.readFileAsync)
}

export function directory(options = {}) {
  if (typeof options === "string") options = { id: options }
  const { id } = options
  const f = this.directories.get(id)

  if (!f) {
    return this.directories.values().find(f => f.path === id)
  }

  return f
}

export function file(options = {}) {
  if (typeof options === "string") options = { id: options }

  const { id } = options
  const f = this.files.get(id)

  if (!f) {
    return this.files.values().find(f => f.path === skypager.resolve(id))
  }

  return f
}

export function activationEventWasFired() {
  const f = this
  const { timeout = 30 * 1000 } = this.options

  const ok = resolve => () => resolve(f)
  const notOk = (reject, err) => f => reject(err)

  if (this.status === "ready") {
    return this
  }

  return new Promise((resolve, reject) => {
    f.once("fileManagerWasActivated", () => ok(resolve)())
    f.once("fileManagerDidFail", err => notOk(reject, err)())
  })
    .timeout(timeout)
    .catch(error => {
      return f
    })
}

export async function whenActivated() {
  if (this.status === "ready") {
    return this
  }

  if (this.status === "created") {
    this.status = "starting"
    await this.startAsync()
  } else if (this.status === "starting") {
    await this.activationEventWasFired().catch(e => e)
  }

  return this
}

export const configFeatures = config.configFeatures
export const configReducers = config.configReducers

export function mapConfigKeys(value, key) {
  return key
}

export function observables(options = {}, context = {}) {
  const { runtime = this.runtime || this } = context

  return {
    files: ["map", {}],
    asts: ["map", {}],
    packages: ["map", {}],
    errors: ["map", {}],
    compiled: ["map", {}],
    directories: ["map", {}],
    status: "created",
    routeRules: ["map", {}],
  }
}

export function route(pattern, handler) {
  const { runtime } = this

  if (!this.routeRules.has(pattern)) {
    this.routeRules.set(pattern, [])
  }

  const handlers = runtime.convertToJS(this.routeRules.get(pattern))

  if (typeof handler === "function") {
    handlers.push(handler.bind(this))
    this.routeRules.set(pattern, handlers)
  }

  return this
}

export function getRoutes() {
  return this.runtime.convertToJS(this.routeRules)
}

export function findByExtension(extension) {
  return this.files.values().filter(file => file.extension === extension.replace(/^\./, ""))
}

export function findByMimeType(test) {
  const { runtime } = this

  return this.files
    .values()
    .filter(file => file.mime && file.mime.mimeType && file.mime.mimeType.toLowerCase().endsWith(test))
}

export async function readContents(basePath) {
  const fileManager = this
  const { fileIds = [] } = fileManager

  const results = await Promise.all(
    (basePath ? fileIds.filter(k => k && k.startsWith(basePath)) : fileIds).map(fileId =>
      fileManager.files.get(fileId).readContent().then(() => fileManager.files.get(fileId)),
    ),
  )

  return results
}

export async function hashFiles(basePath) {
  const fileManager = this
  const { fileIds = [] } = fileManager
  basePath = basePath || fileManager.baseFolder

  const results = await Promise.all(
    (basePath ? fileIds.filter(k => k && k.startsWith(basePath)) : fileIds).map(fileId => fileManager.hashFile(fileId)),
  )

  return results
}

export function hashFile(key) {
  const fileManager = this

  return new Promise((resolve, reject) => {
    const { path } = fileManager.files.get(key)
    md5File(path, (err, hash) => (err ? reject(err) : resolve({ id: key, hash })))
  }).then(({ id, hash } = {}) => {
    fileManager.updateFileHash(id, hash)
    return hash
  })
}

export function getFileIds() {
  return this.files().keys()
}

export function getDirectoryIds() {
  return this.directories().keys()
}

export function getRouter() {
  return router(this, { pathsGetter: "fileIds" })
}

export function getDirectoryRouter() {
  return router(this, {
    routerProperty: "directoryRouter",
    pathsGetter: "directoryIds",
  })
}

export function startAsync(options = {}) {
  return new Promise((resolve, reject) => {
    this.start(options, (err, ...args) => (err ? reject(err) : resolve({ args })))
  })
}

export function start(options = {}, cb) {
  const fileManager = this
  const { walker, runtime } = this
  const { debug, error } = runtime.logger
  const { relative } = runtime.pathUtils
  const { isEmpty } = runtime.lodash

  debug("Starting file manager")

  runtime.emit("fileManagerWillStart", fileManager, walker)

  this.once("fileManagerWasActivated", () => {
    debug("Filemanager was activated")
    if (fileManager.get("config.memory")) {
      debug("File manager set to use memory file system")
      runtime.feature("memory-filesystem").enable()
    }
  })

  const { ignoreInitial = true, ignore = [], ignoreStandard = true } = options

  if (!isEmpty(fileManager.config.ignore)) {
    ignore.push(...fileManager.config.ignore)
  }

  return walker.watch(
    (watchHelpers, done) => {
      const watcher = watch(watchHelpers.filename, {
        ignoreInitial,
        ignored(path) {
          const rel = relative(runtime.cwd, path)

          if (!isEmpty(ignore) && pathMatcher(ignore, rel)) {
            return true
          }

          return !!(
            ignoreStandard &&
            pathMatcher(
              [
                /node_modules/,
                /^lib\/?/,
                /^packages\//,
                /^dist\/?/,
                /public\/?/,
                /\.git/,
                /\.min\.\w+/,
                /^\.?(tmp|log)/,
              ],
              rel,
            )
          )

          if (
            rel.match(/node_modules/) ||
            rel.match(/^lib\/?/) ||
            rel.match(/^dist\/?/) ||
            rel.match(/public\/?/) ||
            rel.match(/\.git/) ||
            rel.match(/\.min\.\w+/) ||
            rel.match(/^\.?(tmp|log)/)
          ) {
            return true
          }
        },
      })

      this.hide("watcher", watcher)

      watcher.on("add", function(filePath, stats) {
        watchHelpers.onCreated(filePath)
        fileManager.emit("watcherEvent", "add", filePath, stats)
      })

      watcher.on("addDir", function(filePath, stats) {
        watchHelpers.onCreated(filePath)
        fileManager.emit("watcherEvent", "addDir", filePath, stats)
      })

      watcher.on("change", function(filePath, stats, ...args) {
        watchHelpers.onChanged(filePath)
        fileManager.emit("watcherEvent", "change", filePath, stats)
      })

      watcher.on("unlink", function(filePath) {
        watchHelpers.onRemoved(filePath)
        fileManager.emit("watcherEvent", "unlink", filePath)
      })

      watcher.on("unlinkDir", function(filePath) {
        watchHelpers.onRemoved(filePath)
        fileManager.emit("watcherEvent", "unlinkDir", filePath)
      })

      watcher.on("ready", function() {
        fileManager.emit("watcherEvent", "ready")

        done(null, function() {
          fileManager.emit("watcherEvent", "closed")
          watcher.close()
        })
      })
    },
    (err, tree) => {
      if (err) {
        cb.call(fileManager, err)
        fileManager.status = "failed"
        fileManager.lastError = err
        fileManager.emit("fileManagerDidFail", err)
        error(`Error while starting fileManager`, { message: err.message })
      } else {
        fileManager.stop = () => {
          tree.unwatch && tree.unwatch()
          fileManager.status = "stopped"
          fileManager.runtime.emit("fileManagerWasDeactivated", fileManager, tree)
          fileManager.runtime.state.set("fileManagerActive", false)
        }

        fileManager.hide("watcherTree", tree, true)
        fileManager.status = "ready"
        fileManager.runtime.state.set("fileManagerActive", true)
        fileManager.runtime.emit("fileManagerWasActivated", fileManager, tree)
        cb && cb.call && cb.call(fileManager, null, fileManager, tree)
        debug("File manager has been activated")
      }
    },
  )
}

export function getBaseFolder(options = {}) {
  const found = this.at(
    "options.base",
    "options.baseFolder",
    "options.rootFolder",
    "options.cwd",
    "runtime.options.fileManagerRoot",
    "runtime.cwd",
  ).find(f => f && f.length > 0 && this.runtime.fsx.existsSync(this.runtime.resolve(f)))

  return found || this.runtime.join("src")
}

export function toFileId({ path } = {}) {
  const { baseFolder = this.runtime.join("src") } = this

  if (!path && typeof arguments[0] === "string") {
    path = arguments[0]
  }
  if (!path && typeof arguments[0] === "object" && arguments[0]._) {
    path = arguments[0]._.path
  }

  return relative(baseFolder, path)
}

export function getWalker(options = {}, context = {}) {
  const fileManager = this
  const { runtime, fileReader } = this
  const { extensions = {} } = { ...this.options, ...this.config, ...options }

  const { baseFolder = this.runtime.join("src") } = this

  const walkerOptions = { baseFolder, ...options, ignore: [/node_modules/, /packages/] }

  const fileHandler = (file = {}) => {
    const { path, type, extension, mtime, mime, size } = file._

    const rel = fileManager.toFileId(path)

    if (
      rel.match(/node_modules/) ||
      rel.startsWith(".") ||
      rel.match("lib/") ||
      rel.match(".git/") ||
      rel.match("dist/") ||
      rel.match("public/") ||
      rel.match("legacy/") ||
      rel.match(/^\.?(tmp|log)/) ||
      extension === "zip" ||
      extension === "gz" ||
      extension === "asar" ||
      extension === "7z" ||
      extension === "dmg" ||
      extension === "exe" ||
      extension === "rar" ||
      extension === "tar" ||
      extension === "tgz"
    ) {
    } else {
      fileManager.files.set(rel, {
        ...(fileManager.files.get(rel) || {}),
        path,
        mtime,
        mime,
        size,
        type,
        extension,

        parsed: runtime.pathUtils.parse(path),

        async readContent() {
          const content = await fileReader(path)
          fileManager.updateFileContent(rel, content)
          return content
        },

        async calculateHash() {
          const hash = await fileManager.hashFile(rel)
          fileManager.updateFileHash(rel, hash)
          return hash
        },
      })

      fileManager.emit("receivedFile", rel, file._)
    }
  }

  const directoryHandler = (file = {}) => {
    const { path, mtime, size } = file._
    const rel = relative(baseFolder, path)

    if (
      rel.match(/node_modules/) ||
      rel.startsWith(".") ||
      rel.match(/lib$/) ||
      rel.match(/\.git/) ||
      rel.match(/dist$/) ||
      rel.match(/legacy$/) ||
      rel.match(/public$/) ||
      rel.match(/^\.?(tmp|log)/)
    ) {
    } else {
      fileManager.directories.set(rel, {
        ...fileManager.directories.get(rel),
        key: rel,
        path,
        mtime,
        size,
        parsed: runtime.pathUtils.parse(path),
        async loadTree() {
          return await runtime.select("files/tree", { rootNode: rel })
        },
        get containsDirnameIndex() {
          return fileManager.files.keys().filter(key => key.startsWith(`${rel}/${rel.split("/").pop()}`))
        },
        get containsIndex() {
          return fileManager.files.keys().filter(key => key.startsWith(`${rel}/index`))
        },
        get containsReadme() {
          return fileManager.files.has(`${rel}/package.json`)
        },
        get containsPackage() {
          return fileManager.files.has(`${rel}/package.json`)
        },
      })

      fileManager.emit("receivedDirectory", rel, file._)
    }
  }

  const createHandler = (file = {}) => {
    const { extension, path, ctime, mtime, type, mime, size, isDirectory } = file._
    const key = relative(baseFolder, path)
    const rel = key

    async function readContent() {
      const content = await fileReader(path)
      fileManager.updateFileContent(rel, content)
      return content
    }

    async function calculateHash() {
      const hash = await fileManager.hashFile(rel)
      fileManager.updateFileHash(rel, hash)
      return hash
    }

    !isDirectory
      ? fileManager.files.set(key, { readContent, calculateHash, key, path, mtime, mime, ctime, size, type, extension })
      : fileManager.directories.set(key, {
          ...(fileManager.directories.get(key) || {}),
          path,
          size,
          mtime,
          ctime,
          key,
          type,
        })

    !isDirectory
      ? fileManager.emit("fileWasCreated", relative(baseFolder, path), file._)
      : fileManager.emit("directoryWasCreated", relative(baseFolder, path), file._)
  }

  const changeHandler = (file = {}, ...args) => {
    const { extension, type, path, mime, isDirectory } = file._
    const key = relative(baseFolder, path)
    const rel = key

    async function readContent() {
      const content = await fileReader(path)
      fileManager.updateFileContent(rel, content)
      return content
    }

    async function calculateHash() {
      const hash = await fileManager.hashFile(rel)
      fileManager.updateFileHash(rel, hash)
      return hash
    }

    runtime.fsx.statAsync(path).then(stats => {
      const fileId = runtime.fileManager.toFileId(file._)

      isDirectory
        ? fileManager.emit("directoryDidChange", key, file._, stats)
        : fileManager.emit("fileDidChange", key, file._, stats)

      !isDirectory
        ? fileManager.files.set(key, {
            ...(fileManager.files.get(key) || {}),
            path,
            mtime: typeof stats.mtime === "number" ? stats.mtime : stats.mtime / 1000,
            ctime: typeof stats.ctime === "number" ? stats.ctime : stats.ctime / 1000,
            size: stats.size,
            mime,
            type,
            extension,
            key,
            baseFolder,
            readContent,
            calculateHash,
          })
        : fileManager.directories.set(key, {
            ...(fileManager.directories.get(key) || {}),
            path,
            key,
            baseFolder,
            mtime: typeof stats.mtime === "number" ? stats.mtime : stats.mtime / 1000,
            ctime: typeof stats.ctime === "number" ? stats.ctime : stats.ctime / 1000,
          })
    })
  }

  const removeHandler = (file = {}) => {
    const { path, isDirectory } = file._
    const key = relative(baseFolder, path)

    if (isDirectory) {
      fileManager.directories.delete(key)

      fileManager.files.keys().filter(k => k.startsWith(key)).forEach(k => fileManager.files.delete(k))

      fileManager.directories.keys().filter(k => k.startsWith(key)).forEach(k => fileManager.directories.delete(k))

      fileManager.emit("directoryWasRemoved", key, file._)
    } else {
      fileManager.emit("fileWasRemoved", key, file._)
    }
  }

  return runtime.skywalker.walker(walkerOptions, walker => {
    walker
      .ignoreDotFiles()
      .directoryFilter(/(node_modules|packages|dist|public|lib|tmp|log|.git)/, (next, done) => {
        done(null, false)
      })
      .on("file", fileHandler)
      .on("directory", directoryHandler)
      .extensionFilter("json", function(next, done) {
        if (this._.path.endsWith("package.json")) {
          skypager.fsx
            .readJsonAsync(this._.path)
            .then(data => {
              runtime.fileManager.packages.set(runtime.fileManager.toFileId({ path: this._.path }), data)
              runtime.fileManager.emit("receivedPackage", runtime.fileManager.toFileId(this._), data, this._)

              next()
            })
            .catch(error => {
              /*
              runtime.fileManager.errors.set(runtime.fileManager.toFileId(this._), {
                error: error.message,
                path: this._.path,
              })
              */
              next()
            })
        }
      })
      .on(Events.CREATED, createHandler)
      .on(Events.CHANGED, changeHandler)
      .on(Events.REMOVED, removeHandler)

    /*
    mapValues(extensions, (handlers, extension) => {
      handlers.forEach(fn => (walker = walker.extensionFilter(extension, fn)))
    })
    */

    return walker
  })
}
