export const createGetter = "lerna"

export const featureMethods = [
  "updatedPackages",
  "updatedPackageNames",
  "readConfig",
  "listPackagesByVersion",
  "listAllPackages"
]

export function isSupported() {
  return typeof this.lodash.attempt(() => __non_webpack_require__.resolve("lerna")) === "string"
}

export async function updatedPackages() {
  const { mapValues, keyBy, omitBy, isEmpty } = this.lodash
  const { packageManager } = this.runtime

  await packageManager.startAsync()
  const names = await this.updatedPackageNames().then(names => keyBy(names, v => v))

  return omitBy(mapValues(names, name => packageManager.findByName(name)), v => isEmpty(v))
}

export async function readConfig() {
  const lernaPath = await skypager.fsx.findUp("lerna.json")
  return await skypager.fsx.readJsonAsync(lernaPath)
}

export async function listAllPackages() {
  const lernaOutput = await this.runtime.select("process/output", {
    command: "lerna ls",
    format: "lines",
    outputOnly: true
  })

  return this.runtime.chain
    .plant(lernaOutput)
    .filter(line => line.trim().match(/v[0-9].*\.[0-9].*\.[0-9]$/))
    .map(line => line.split(" ").filter(v => v.length))
    .fromPairs()
    .keys()
    .value()
}

export async function listPackagesByVersion() {
  const lernaOutput = await this.runtime.select("process/output", {
    command: "lerna ls",
    format: "lines",
    outputOnly: true
  })

  return this.runtime.chain
    .plant(lernaOutput)
    .filter(line => line.trim().match(/v[0-9].*\.[0-9].*\.[0-9]$/))
    .map(line => line.split(" ").filter(v => v.length))
    .fromPairs()
    .mapValues(v => v.replace(/^v/, ""))
    .value()
}

export async function updatedPackageNames() {
  const lernaOutput = await this.runtime.select("process/output", {
    command: "lerna updated",
    format: "lines",
    outputOnly: true
  })

  return lernaOutput.filter(line => line.startsWith("-")).map(line => line.replace("- ", "").trim())
}
