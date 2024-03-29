import pathMatcher from 'runtime/utils/path-matcher'
import { router, applyRoute } from 'runtime/utils/router'
import md5File from 'md5-file'
import * as computedProperties from './file-manager/computed'
import * as actions from './file-manager/actions'
import Promise from 'bluebird'
import Memory from 'memory-fs'
export { walkUp, walkUpSync } from './package-manager'

export const createGetter = 'fileManager'

export function observables(options = {}) {
  return {
    status: CREATED,
  }
}

export const featureMethods = [
  // A Mobx Observable Map of file metadata
  'getFiles',

  'getLifeCycleHooks',

  'getStatuses',

  // A Mobx Observable Map of directory metadata
  'getDirectories',

  // A Mobx Observable Map of Git Tree Status
  'getStatusMap',

  // Loads all of the files
  'start',

  // Loads all of the files
  'startAsync',

  // Get access to the git wrapper
  'getGit',

  // A Utility for testing a path with a rule or set of rules
  'getPathMatcher',

  'applyRouteMetadata',

  'matchRoute',

  'matchPaths',

  'matchPatterns',

  'selectMatches',

  // Read an md5 hash of a file
  'hashFile',

  // Read the md5 hash of all files within a given tree
  'hashFiles',

  // Read the content of all files within a given subtree
  'readContent',

  // Access to all of the observable file paths
  'getFileIds',
  'getFilePaths',

  // Access to all of the observable directory paths
  'getDirectoryIds',

  // Access to all of the observable directory objects
  'getDirectoryObjects',

  // Access to all of the observable file objects
  'getFileObjects',

  // Access to all of the observable file paths with a modified git status
  'getModifiedFiles',

  // Access to all of the observable directory paths with modified files in them
  'getModifiedDirectories',

  // Access to chained wrappers of our observables
  'getChains',

  // A Promise which will resolve immediately, or whenever the filemanager is active.
  // Will attempt to activate the file manager if it wasn't already done
  'whenActivated',

  // A Promise which will resolve immediately, or whenever the filemanager is active
  'activationEventWasFired',

  // Sync the memory file system
  'syncMemoryFileSystem',

  'wrapMemoryFileSystem',

  'file',

  'getPackages',

  'getPackageManager',

  'walkUp',

  'walkUpSync',

  'loadDocument',
]

export const hostMethods = ['requireContext']
export const hostMixinOptions = {
  partial: [],
  injectOptions: false,
}

export function requireContext(rule, options = {}) {
  const {
    requireFn = __non_webpack_require__,
    keyBy = 'name',
    mapValues = 'path',
    formatId,
  } = options

  if (!this.fileManager) {
    throw new Error(`The Require Context feature depends on the file-manager feature.`)
  }

  if (this.fileManager.status !== READY) {
    throw new Error(`Please wait until the fileManager is ready to use this feature`)
  }

  return this.chain
    .invoke('fileManager.selectMatches', rule)
    .keyBy(keyBy)
    .mapKeys((v, k) => (formatId ? formatId(k, v) : k))
    .mapValues(mapValues)
    .thru(map => {
      const req = key => requireFn(map[key])

      return Object.assign(req, {
        resolve(key) {
          return map[key]
        },
        keys() {
          return Object.keys(map)
        },
      })
    })
    .value()
}

export async function loadDocument(options = {}) {
  const { runtime } = this

  if (typeof options === 'string') {
    options = { id: options }
  }

  const file = this.file(options)

  if (!file.content) {
    const content = await runtime.fsx.readFileAsync(file.path)
    this.updateFileContent(file.relative, content.toString())
  }

  return runtime.document(file.relative, { provider: file, ...options })
}

export function file(options = {}) {
  const { runtime } = this

  if (typeof options === 'string') {
    options = { id: options }
  }

  const { id } = options
  const foundById = this.files.get(id)

  if (foundById) {
    return foundById
  }

  const foundByPath = this.files.get(runtime.relative(id))

  if (foundByPath) {
    return foundByPath
  }
}
/**
  @param {Boolean} autoStart
*/
export function featureWasEnabled(options = {}) {
  this.hide('memoryFileSystem', new Memory(), false)
  this.hideGetter('fs', () => this.memoryFileSystem)

  this.hide('actions', actions)
  this.hide('computedProperties', computedProperties)

  actions.attach.call(this)
  computedProperties.attach.call(this)

  const { autoStart = false } = {
    ...this.options,
    ...options,
  }

  if (autoStart || this.runtime.argv.startFileManager) {
    this.startAsync()
      .then(() => {
        if (this.packageManager && this.runtime.argv.startPackageManager) {
          return this.packageManager
            .startAsync()
            .then(() => {
              this.emit('packageManagerDidStart', this.packageManager)
            })
            .catch(error => {
              this.emit('packageManagerDidFail', error, this.packageManager)
            })
        }
      })
      .catch(error => {
        this.error = error
        this.emit(DID_FAIL, error)
        this.status = FAILED
        this.runtime.error(`File Manager Failed to start`, { message: error.message })
      })
  }
}

export async function syncMemoryFileSystem(options = {}) {
  const { runtime, memoryFileSystem: fs } = this
  const { fileObjects, directoryObjects } = this
  const { dirname } = this.runtime.pathUtils

  if (options.content) {
    await this.updateContent(options)
  }

  this.chain
    .plant(directoryObjects)
    .uniqBy(d => d.path)
    .sortBy(d => d.path.length)
    .forEach(d => {
      if (!fs.existsSync(d.path)) {
        fs.mkdirpSync(d.path)
      }

      return d
    })
    .plant(fileObjects)
    .forEach(f => {
      fs.mkdirpSync(dirname(f.path))

      if (!fs.existsSync(f.path)) {
        try {
          fs.writeFileSync(f.path, (f.content || '').toString())
        } catch (error) {
          runtime.error('Error syncing file', { path: f.path, message: error.message })
        }
      }

      return f
    })
    .value()

  return this.wrapMemoryFileSystem()
}

export const getPathMatcher = () => pathMatcher

export function getChains() {
  const fileManager = this

  return {
    patterns(...args) {
      const fileIds = fileManager.matchPatterns(...args)
      return fileManager.chain
        .plant(fileIds)
        .keyBy(v => v)
        .mapValues(v => fileManager.file(v))
    },

    route(route, options = {}) {
      return fileManager.chain.invoke('applyRouteMetadata', route, options)
    },

    get files() {
      return fileManager.chain.get('fileObjects')
    },
    get directories() {
      return fileManager.chain.get('directoryObjects')
    },
  }
}

export function applyRouteMetadata(route, options = {}) {
  const { meta: staticMeta = {} } = options
  const { mapValues } = this.lodash

  const results = this.chain
    .invoke('matchRoute', route, options)
    .keyBy('subject')
    .mapValues('result')
    .value()

  return mapValues(results, (metadata, fileId) => {
    if (options.directories) {
      const directory = this.directories.get(fileId)
      const { meta = {} } = directory

      this.directories.set(fileId, {
        ...directory,
        meta: {
          ...meta,
          ...staticMeta,
          ...metadata,
        },
      })

      return this.directories.get(fileId)
    } else {
      const file = this.files.get(fileId)
      const { meta = {} } = file

      this.files.set(fileId, {
        ...file,
        meta: {
          ...meta,
          ...staticMeta,
          ...metadata,
        },
      })

      return this.files.get(fileId)
    }
  })
}

export function matchRoute(route, options = {}) {
  const subjects = options.directories ? this.directoryIds : this.fileIds

  return applyRoute(route, subjects, {
    discard: true,
    ...options,
  })
}

export function matchPatterns(options = {}) {
  const { exclude = [], rules = options.rules || options.include || options || [] } = options

  const { castArray } = this.lodash
  const { makeRe } = this.runtime.feature('matcher')

  const excludePatterns = castArray(exclude).map(p => (typeof p === 'string' ? makeRe(p) : p))
  const includePatterns = castArray(rules).map(p => (typeof p === 'string' ? makeRe(p) : p))

  return this.matchPaths({
    ...options,
    rules: includePatterns,
    exclude: excludePatterns,
  })
}

export function matchPaths(options = {}) {
  const { castArray } = this.lodash
  let { exclude = [], rules = options.rules || options.include || options || [] } = options

  exclude = castArray(exclude)
  rules = castArray(rules)

  return options.fullPath
    ? this.fileObjects
        .filter(
          file =>
            (!rules.length || pathMatcher(rules, file.path)) &&
            (!exclude.length || !pathMatcher(exclude, file.path))
        )
        .map(result => result.relative)
    : this.fileIds.filter(
        fileId =>
          (!rules.length || pathMatcher(rules, fileId)) &&
          (!exclude.length || !pathMatcher(exclude, fileId))
      )
}

export function selectMatches(options = {}) {
  const { convertToJS } = this.runtime
  const paths = this.matchPaths(options)
  return paths.map(key => convertToJS(this.files.get(key)))
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

export async function hashFiles(options = {}) {
  const { include = [], exclude = [] } = options

  const results = await Promise.all(
    this.files
      .values()
      .map(p => p.path)
      .filter(path => pathMatcher(include, path))
      .filter(path => exclude.length === 0 || !pathMatcher(exclude, path))
      .map(path => this.hashFile(this.runtime.relative(path)))
  )

  return results
}

export function getPackages() {
  return this.get('packageManager.manifests')
}

export function getPackageManager() {
  return this.runtime.feature('package-manager')
}

export async function readContent(options = {}) {
  const { include = [], exclude = [] } = options

  const toFileId = path => this.runtime.relative(path)

  const results = await Promise.all(
    this.chain
      .get('fileObjects')
      .map(p => p.path)
      .filter(path => pathMatcher(include, path))
      .filter(path => exclude.length === 0 || !pathMatcher(exclude, path))
      .thru(paths => {
        this.fireHook(WILL_READ_FILES, paths)
        return paths
      })
      .map(path =>
        this.runtime.fsx
          .readFileAsync(path)
          .then(buf => buf.toString())
          .then(content => [toFileId(path), content])
          .then(entry => {
            const [fileId, content] = entry
            this.fireHook(RECEIVED_FILE_CONTENT, fileId, content, this.files.get(fileId))
            this.updateFileContent(fileId, content)

            return options.hash ? this.hashFile(fileId).then(() => entry) : entry
          })
      )
  )

  return options.object ? this.runtime.lodash.fromPairs(results) : results
}

export function getGit() {
  return this.runtime.git
}

export function getFiles() {
  return this.result('runtime.files', () => {
    throw new Error(`the file manager depends on the fs-adapter feature`)
  })
}

export function getDirectories() {
  return this.result('runtime.directories', () => {
    throw new Error(`the file manager depends on the fs-adapter feature`)
  })
}

export function getStatusMap() {
  return this.result('runtime.fileStatusMap', () => {
    throw new Error(`the file manager depends on the fs-adapter feature`)
  })
}

export function getFilePaths() {
  return this.result('runtime.fileObjects', () => {
    throw new Error(`the file manager depends on the fs-adapter feature`)
  }).map(file => file.path)
}

export function getFileIds() {
  return this.result('runtime.fileIds', () => {
    throw new Error(`the file manager depends on the fs-adapter feature`)
  })
}

export function getDirectoryIds() {
  return this.result('runtime.directoryIds', () => {
    throw new Error(`the file manager depends on the fs-adapter feature`)
  })
}

export function getDirectoryObjects(options = {}) {
  return this.result('runtime.directoryObjects', () => {
    throw new Error(`the file manager depends on the fs-adapter feature`)
  })
}

export function getFileObjects(options = {}) {
  return this.result('runtime.fileObjects', () => {
    throw new Error(`the file manager depends on the fs-adapter feature`)
  })
}

export function getModifiedFiles(options = {}) {
  const { markers = ['M', '??', 'D'] } = options

  return this.chain
    .get('statusMap', {})
    .omitBy(marker => markers.indexOf(marker) === -1)
    .keys()
    .value()
}

export function getModifiedDirectories(options = {}) {
  const { dirname } = this.runtime.pathUtils

  return this.chain
    .get('modifiedFiles')
    .map(path => dirname(path))
    .uniq()
    .value()
}

export function lazyMemoryFileSystem(options = {}) {
  return new Memory()
}

export function start(...args) {
  let cb, options

  if (typeof args[0] === 'function') {
    cb = args[0]
  } else if (typeof args[1] === 'function') {
    cb = args[1]
  }

  if (typeof args[0] === 'undefined' || typeof args[0] === 'object') {
    options = args[0] || {}
  }

  const promise = this.startAsync(options || {})

  if (typeof cb === 'function') {
    Promise.resolve(promise)
      .then(() => {
        cb && typeof cb.call === 'function' && cb.call(this, null, this)
      })
      .catch(e => {
        cb && typeof cb.call === 'function' && cb.call(this, e, this)
      })
  } else {
    return Promise.resolve(promise)
      .then(() => this)
      .catch(e => this)
  }
}

export async function startAsync(options = {}) {
  if (this.has('git') && this.get('git.files')) {
    return await startGitMode.call(this, options).catch(error => {
      this.fireHook(DID_FAIL, error)
      this.status = FAILED
      this.error = error
      throw error
    })
  } else {
    const error = new Error(`FileManager depends on git`)
    this.error = error
    this.fireHook(DID_FAIL, error)
    this.status = FAILED
    // We can use something besides git; I have a normal walker / skywalker feature
    // which is just a lot slower than git ls-files; it should be updated to behave similarly
    throw error
  }
}

export async function startGitMode(options = {}) {
  const { files: gitFiles, directories: gitDirectories, statusMap: gitStatusMap } = this.git

  if (this.status === STARTING) {
    await this.activationEventWasFired(options)
    return this
  } else if (this.status === READY) {
    if (!options.wait) {
      await this.git.run({ others: true, cached: true, ...options, clear: !!options.clear })
    }

    return this
  } else if (this.status === CREATED) {
    this.fireHook(WILL_START, options)
    this.status = STARTING

    try {
      await this.git.run({ others: true, cached: true, ...options, clear: !!options.clear })
    } catch (error) {
      this.error = error
      this.fireHook(DID_FAIL, error)
      this.status = FAILED
      return this
    }
  }

  try {
    const filesObserver = gitFiles.observe(update => {
      //this.runtime.debug("received file update", update.type, update.name)

      if (update.type === 'add') {
        this.fireHook(RECEIVED_FILE_ADD, update.name, update, this)
      } else if (update.type === 'remove') {
        this.fireHook(RECEIVED_FILE_REMOVE, update.name, update, this)
      } else if (update.type === 'update' || update.type === 'change') {
        this.fireHook(RECEIVED_FILE_UPDATE, update.name, update, this)
      } else {
        this.fireHook(RECEIVED_FILE_NOTIFICATION, update.type, update, this)
      }
    })

    const directoriesObserver = gitDirectories.observe(update => {
      this.fireHook(RECEIVED_DIRECTORY_UPDATE, update.type, update, this)
    })

    const statusObserver = gitStatusMap.observe(update => {
      this.fireHook(RECEIVED_STATUS_UPDATE, update.type, update, this)
    })

    this.hide('filesObserver', filesObserver, true)
    this.hide('statusObserver', statusObserver, true)
    this.hide('directoriesObserver', directoriesObserver, true)
  } catch (error) {
    this.fireHook(DID_FAIL, error)
    this.status = FAILED
    return this
  }

  this.status = READY

  this.fireHook(
    WAS_ACTIVATED,
    this.pick(
      'filesObserver',
      'statusObserver',
      'directoriesObserver',
      'files',
      'directories',
      'statusMap'
    )
  )

  return this
}
/**

*/
export function activationEventWasFired(options = {}) {
  const f = this
  const { timeout = 30 * 1000 } = options

  const ok = resolve => () => resolve(f)
  const notOk = (reject, err) => f => reject(err)

  if (this.status === FAILED || this.status === READY) {
    return Promise.resolve(this)
  }

  return new Promise((resolve, reject) => {
    f.once(WAS_ACTIVATED, () => ok(resolve)())
    f.once(DID_FAIL, err => notOk(reject, err)())
  })
    .timeout(timeout)
    .catch(error => f)
    .then(() => f)
}

/**
  Returns a Promise which will resolve if, or when the file manager is activated
*/
export async function whenActivated(options = {}) {
  if (this.status === READY) {
    return this
  }

  if (this.status === CREATED) {
    this.status = STARTING
    await this.startAsync(options)
  } else if (this.status === STARTING) {
    await this.activationEventWasFired(options).catch(e => e)
  }

  return this
}

export function wrapMemoryFileSystem() {
  const { promisify } = require('bluebird')
  const { runtime, memoryFileSystem: memfs } = this

  runtime.hide(
    'fsm',
    {
      exists: memfs.exists.bind(memfs),
      mkdir: memfs.mkdir.bind(memfs),
      mkdirp: memfs.mkdirp.bind(memfs),
      readFile: memfs.readFile.bind(memfs),
      readdir: memfs.readdir.bind(memfs),
      readlink: memfs.readlink.bind(memfs),
      rmdir: memfs.rmdir.bind(memfs),
      stat: memfs.stat.bind(memfs),
      unlink: memfs.unlink.bind(memfs),
      writeFile: memfs.writeFile.bind(memfs),

      existsAsync: promisify(memfs.exists.bind(memfs)),
      mkdirAsync: promisify(memfs.mkdir.bind(memfs)),
      mkdirpAsync: promisify(memfs.mkdirp.bind(memfs)),
      readFileAsync: promisify(memfs.readFile.bind(memfs)),
      readdirAsync: promisify(memfs.readdir.bind(memfs)),
      readlinkAsync: promisify(memfs.readlink.bind(memfs)),
      rmdirAsync: promisify(memfs.rmdir.bind(memfs)),
      statAsync: promisify(memfs.stat.bind(memfs)),
      unlinkAsync: promisify(memfs.unlink.bind(memfs)),
      writeFileAsync: promisify(memfs.writeFile.bind(memfs)),

      existsSync: memfs.existsSync.bind(memfs),
      mkdirSync: memfs.mkdirSync.bind(memfs),
      mkdirpSync: memfs.mkdirpSync.bind(memfs),
      readFileSync: memfs.readFileSync.bind(memfs),
      readdirSync: memfs.readdirSync.bind(memfs),
      readlinkSync: memfs.readlinkSync.bind(memfs),
      rmdirSync: memfs.rmdirSync.bind(memfs),
      statSync: memfs.statSync.bind(memfs),
      unlinkSync: memfs.unlinkSync.bind(memfs),
      writeFileSync: memfs.writeFileSync.bind(memfs),

      readJsonAsync(path) {
        return Promise.resolve(JSON.parse(memfs.readFileSync(path).toString()))
      },

      readJsonSync(path) {
        return JSON.parse(memfs.readFileSync(path).toString())
      },

      readJson(path, cb) {
        try {
          cb(memfs.readFileSync(path))
        } catch (error) {
          cb(error)
        }
      },
    },
    true
  )

  return memfs
}

export const CREATED = 'CREATED'
export const STARTING = 'STARTING'
export const FAILED = 'FAILED'
export const READY = 'READY'

export const STATUSES = {
  CREATED,
  READY,
  FAILED,
  STARTING,
}

export const RECEIVED_FILE_CONTENT = 'willReceiveContent'
export const RECEIVED_FILE_UPDATE = 'didReceiveFileUpdate'
export const RECEIVED_FILE_ADD = 'didReceiveFile'
export const RECEIVED_FILE_REMOVE = 'didRemoveFile'
export const RECEIVED_FILE_NOTIFICATION = 'didReceiveNotification'

export const RECEIVED_DIRECTORY_UPDATE = 'didReceiveDirectoryUpdate'
export const RECEIVED_STATUS_UPDATE = 'didReceiveStatusUpdate'
export const WILL_READ_FILES = 'willReadFiles'
export const DID_FAIL = 'didFail'
export const WAS_ACTIVATED = 'wasActivated'
export const WILL_START = 'willStart'

export const LIFECYCLE_HOOKS = {
  RECEIVED_FILE_CONTENT,
  RECEIVED_FILE_ADD,
  RECEIVED_FILE_REMOVE,
  RECEIVED_FILE_UPDATE,
  RECEIVED_STATUS_UPDATE,
  RECEIVED_FILE_NOTIFICATION,
  RECEIVED_DIRECTORY_UPDATE,
  WILL_READ_FILES,
  DID_FAIL,
  WAS_ACTIVATED,
  WILL_START,
}

export const getStatuses = () => STATUSES

export const getLifeCycleHooks = () => LIFECYCLE_HOOKS
