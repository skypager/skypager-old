import {
  readJsonAsync as readJson,
  readdirAsync as readdir,
  existsAsync as exists
} from "fs-extra-promise"
import { resolve, basename, join } from "path"
import pathMatcher from "runtime/utils/path-matcher"
import semver from "semver"

const { all } = Promise

export const featureMethods = [
  "findByName",
  "findPackageFoldersIn",
  "getSemver",
  "testPath",
  "find",
  "findPackageLocations",
  "findNearest",
  "attemptResolve",
  "getCachedModuleIds"
]

export const hostMethods = ["getPackageFinder", "findPackages", "findPackage"]

export function getCachedModuleIds() {
  return Object.keys(__non_webpack_require__.cache || {})
}

export function attemptResolve(options = {}) {
  if (typeof options === "string") {
    options = { name: options }
  }

  const { name } = options

  try {
    return __non_webpack_require__.resolve(name)
  } catch (error) {
    return false
  }
}

export function getPackageFinder() {
  return this.feature("package-finder")
}

export async function findPackages(...args) {
  return this.packageFinder.find(...args)
}

export async function findPackage(...args) {
  return this.packageFinder.findByName(...args)
}

export async function findNearest(options = {}) {
  return this.runtime.fsx.findUpAsync("package.json", options)
}

export async function find(options = {}, context = {}) {
  const { runtime } = this
  const { get, flatten, isArray, isFunction, isRegExp, isString } = runtime.lodash

  if (isRegExp(options)) options = { ...context, rules: [...(context.rules || []), options] }
  if (isString(options)) options = { ...context, rules: [...(context.rules || []), options] }
  if (isArray(options)) options = { ...context, rules: [...(context.rules || []), ...options] }
  if (isFunction(options)) options = { ...context, rules: [...(context.rules || []), options] }

  let rules = options.rules || []

  const { rule, moduleFolderName = "node_modules", parse = false, filter } = options

  if (rule) {
    rules.push(rule)
  }

  rules = rules.map(
    rule =>
      isString(rule) && rule.match(/\*|\:|\+/)
        ? val => require("path-to-regexp")(rule).test(val)
        : rule
  )

  const packageStores = await this.findPackageLocations({
    ...options,
    moduleFolderName
  })

  let packagePaths = await Promise.all(
    packageStores.map(baseFolder => this.findPackageFoldersIn(baseFolder))
  )

  if (parse === false) {
    return flatten(packagePaths).filter(p => testPath(basename(p), rules))
  } else if (parse === "matches") {
    packagePaths = flatten(packagePaths).filter(p => testPath(basename(p), rules))
  } else if (parse === true) {
    packagePaths = flatten(packagePaths)
  }

  const packageData = await Promise.all(
    packagePaths.map(p =>
      readJson(join(p, "package.json")).then(data => ({
        ...data,
        file: { path: join(p, "package.json"), dirname: p }
      }))
    )
  )

  const { gt, lt, satisfies, clean } = semver
  let {
    depends,
    version,
    minimum: minimumOpt,
    satisfies: satisfiesOpt,
    maximum: maximumOpt
  } = options

  return packageData.filter(p => {
    if (minimumOpt && !gt(p.version, clean(minimumOpt))) return false
    if (maximumOpt && !lt(p.version, clean(maximumOpt))) return false
    if (satisfiesOpt && !satisfies(p.version, clean(satisfiesOpt))) return false
    if (version && clean(version) !== clean(p.version)) return false

    if (
      depends &&
      !(
        get(p, ["dependencies", depends.toLowerCase()]) ||
        get(p, ["devDependencies", depends.toLowerCase()]) ||
        get(p, ["optionalDependencies", depends.toLowerCase()]) ||
        get(p, ["peerDependencies", depends.toLowerCase()])
      )
    ) {
      return false
    }

    if (!testPath(p.name, rules)) {
      return false
    }

    if (!filter) {
      return true
    }

    if (typeof filter === "function") {
      return !!filter.call(runtime, p, options, context)
    } else if (typeof filter === "string") {
      return !!get(p, filter)
    }

    return true
  })
}

export function testPath(pathToTest, rulesToTestWith) {
  return pathMatcher(rulesToTestWith, pathToTest)
}

export function getSemver() {
  return require("semver")
}

export async function findPackageLocations(options = {}) {
  const { runtime } = this
  const { flatten } = runtime.lodash

  let { testPaths = runtime.vm.runInThisContext(`process.mainModule.paths`) || [] } = options

  const { additionalPaths = [], moduleFolderName = "node_modules" } = options

  if (moduleFolderName !== "node_modules") {
    testPaths = testPaths.map(v => v.replace(/node_modules/, moduleFolderName))
  }

  return allExisting(testPaths || [])
}

export async function findPackageFoldersIn(basePath) {
  const folderNames = await readdir(basePath)
  const manifestPathLocations = folderNames.map(n => join(basePath, n, "package.json"))

  const existing = await allExisting(manifestPathLocations)

  return existing.map(p => resolve(p, ".."))
}

export async function findByName(name, options = {}) {
  const results = await this.find({
    ...options,
    rule: `${name}$`
  })

  return results[0]
}

export const findExistingPaths = (paths = []) => allExisting(paths)

export async function allExisting(paths = []) {
  if (paths.length === 0) return []

  try {
    const results = await Promise.all(paths.map(p => exists(p).then(res => res && p)))

    return results.filter(v => v)
  } catch (error) {
    return []
  }

  return []
}
