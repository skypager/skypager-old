import fsx from "fs-extra-promise"
import findUp from "find-up"

export const hostMethods = [
  "lazyFsx",
  "lazyFs",
  "join",
  "resolve",
  "relative",
  "getDirname",
  "lazyCurrentPackage",
  "lazyManifestPath",
  "lazyParentManifestPath",
  "lazyParentPackage"
]

export function lazyManifestPath() {
  return this.tryResult("manifestPath", () => findUp.sync("package.json", { cwd: this.cwd }))
}

export function lazyParentManifestPath() {
  return this.tryResult("manifestPath", () => findUp.sync("package.json", { cwd: this.join("..") }))
}

export function getDirname() {
  return require("path").basename(this.cwd)
}

export function lazyCurrentPackage() {
  return this.tryResult("pkg", () => this.fsx.readJsonSync(this.manifestPath))
}

export function lazyParentPackage() {
  return this.tryResult("parentPkg", () => this.fsx.readJsonSync(this.parentManifestPath))
}

export function join(...args) {
  const { baseFolder = this.cwd } = this.argv
  const { join } = this.pathUtils
  return join(baseFolder, ...args.filter(f => typeof f === "string"))
}

export function resolve(...args) {
  const { baseFolder = this.cwd } = this.argv
  const { resolve } = this.pathUtils
  return resolve(baseFolder, ...args.filter(f => typeof f === "string"))
}

export function relative(...args) {
  const { baseFolder = this.cwd } = this.argv
  const { relative } = this.pathUtils
  return relative(baseFolder, this.resolve(...args))
}

export function lazyFs() {
  return this.fsx
}

export function lazyFsx() {
  const { pick } = this.lodash

  const methods = [
    "outputJson",
    "writeFile",
    "readFile",
    "readdir",
    "readJson",
    "writeJson",
    "outputFile",
    "exists",
    "mkdirp",
    "copy",
    "move",
    "mkdtemp",
    "remove",
    "ensure",
    "ensureDir",
    "ensureFile",
    "ensureLink",
    "ensureSymlink",
    "isDirectory",
    "emptyDir",
    "rmdir",
    "unlink",
    "stat"
  ]

  methods.push(...methods.map(name => `${name}Sync`))
  methods.push(...methods.map(name => `${name}Async`))

  const selected = pick(fsx, methods)

  selected.findUpAsync = findUp
  selected.findUp = findUp
  selected.findUpSync = findUp.sync
  selected.existingSync = (...paths) => paths.filter(fsx.existsSync)
  selected.existingAsync = selected.existing = (...paths) =>
    Promise.all(paths.map(p => fsx.existsAsync(p).then(r => r && p))).then(results =>
      results.filter(p => p)
    )

  const mimeTypes = require("mime").types
  selected.mimeTypes = () => mimeTypes
  selected.mimeType = ext => mimeTypes[ext.replace(".", "")]

  return selected
}
