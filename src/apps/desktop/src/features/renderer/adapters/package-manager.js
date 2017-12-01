export const createGetter = 'packageManager'

export const featureMethods = [
  'find',
  'findBy',
  'findByName',
  'findDependentsOf',
  'pickAll',
  'pickAllBy',
  'selectModifiedPackages',
  'findNodeModules',
  'walkUp',

  'showDependenciesMap',
  'showVersionMap',
  'showLatestMap',
  'showTarballUrls',

  'start',
  'runMethod',
]

export const featureMixinOptions = {
  partial: [],
  insertOptions: false,
}

export async function start(...args) {
  return this.runMethod('startAsync', ...args)
}

export async function find(...args) {
  return this.runMethod('find', ...args)
}
export async function findBy(...args) {
  return this.runMethod('findBy', ...args)
}
export async function findByName(...args) {
  return this.runMethod('findByName', ...args)
}
export async function findDependentsOf(...args) {
  return this.runMethod('findDependentsOf', ...args)
}
export async function pickAll(...args) {
  return this.runMethod('pickAll', ...args)
}
export async function pickAllBy(...args) {
  return this.runMethod('pickAllBy', ...args)
}
export async function selectModifiedPackages(...args) {
  return this.runMethod('selectModifiedPackages', ...args)
}
export async function findNodeModules(...args) {
  return this.runMethod('findNodeModules', ...args)
}
export async function walkUp(...args) {
  return this.runMethod('walkUp', ...args)
}
export async function showDependenciesMap(...args) {
  return this.runMethod('depdendenciesMap', ...args)
}
export async function showVersionMap(...args) {
  return this.runMethod('versionMap', ...args)
}
export async function showLatestMap(...args) {
  return this.runMethod('latestMap', ...args)
}
export async function showTarballUrls(...args) {
  return this.runMethod('tarballUrls', ...args)
}

function runMethod(method, ...args) {
  return this.runtime.ipcUtils.ask('PACKAGE_MANAGER_ADAPTER', {
    method,
    args,
  })
}
