import create from "skywalker"
import testPath from "runtime/utils/path-matcher"

export const createGetter = "skywalker"

export const featureMethods = ["walk", "watcher", "walker"]

export async function walk(...args) {
  const i = walker.call(this, ...args)
  const fileMap = await new Promise((resolve, reject) => i.start((err, file) => (err ? reject(err) : resolve(file))))

  return fileMap
}

export function watcher(...args) {
  return cb => walker.call(this, ...args).watch("gaze", cb)
}

export function readIgnoreFiles(baseFolder) {
  const { runtime } = this
  const { uniq } = runtime.lodash

  baseFolder = typeof baseFolder === "string" ? baseFolder : runtime.cwd

  const checkFiles = [runtime.resolve(baseFolder, ".gitignore"), runtime.resolve(baseFolder, ".skypagerignore")]
  const files = runtime.fsx.existingSync(...checkFiles)
  const contents = files.map(file => runtime.fsx.readFileSync(file))

  const patterns = uniq(
    contents
      .map(buffer => buffer.toString())
      .reduce((memo, chunk) => (memo = memo.concat(chunk)), "")
      .split("\n")
      .map(t => t.trim())
      .filter(f => f && f.length > 1 && !f.startsWith("#")),
  )

  return patterns.map(pattern => (pattern.endsWith("/") ? `${pattern}**` : pattern))
}

export function walker(...args) {
  const feature = this
  const { runtime } = this

  let baseFolder, options, configure

  if (typeof args[0] === "string") {
    baseFolder = args[0]
    options = args[1]
    configure = args[2]
  } else if (typeof args[0] === "object") {
    options = args[0]
    baseFolder = options.baseFolder || options.cwd || runtime.cwd
    configure = options.configure || args[1]
  }

  if (typeof options === "function") {
    configure = options
    options = {}
  }

  baseFolder = baseFolder || runtime.cwd

  options = {
    ignoreNodeModules: true,
    ignoreOutput: true,
    ignoreLogs: true,
    ignoreTemp: true,
    exclude: [],
    include: [],
    ...options,
  }

  const { ignoreNodeModules, ignoreOutput, ignoreTemp, ignoreLogs, exclude = [], include = [] } = options

  let walker = create(baseFolder)
    .emitErrors(options.emitErrors === true)
    .ignoreDotFiles(true)
    .directoryFilter(/\/\w+\//, function(next, done) {
      const { path, filename, dirname } = this._

      if (ignoreNodeModules && path.match(/node_modules/)) {
        done(null, false)
      } else if (ignoreLogs && filename.match(/log/i)) {
        done(null, false)
      } else if (ignoreOutput && path.match(/\/(lib|dist|public|packages|legacy|hold|public)/)) {
        done(null, false)
      } else if (ignoreTemp && filename.match(/^\.?(tmp|temp)/i)) {
        done(null, false)
      } else {
        next()
      }
    })

  if (ignoreNodeModules) {
    walker.ignoreDirectories(/node_modules/)
  }

  if (ignoreOutput) {
    walker.ignoreDirectories(/\/?(lib|dist|public|packages|pkg|build|public)\/?/)
  }

  if (ignoreLogs) {
    walker.ignoreDirectories(/logs?/)
  }

  if (ignoreTemp) {
    walker.ignoreDirectories(/(temp|tmp|.tmp)?/)
  }

  if (typeof configure === "function") {
    walker = configure.call(this, walker)
  }

  return walker
}
