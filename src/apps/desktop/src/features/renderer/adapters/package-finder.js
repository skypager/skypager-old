export const createGetter = 'packageFinder'

export const featureMethods = [
  'attemptResolve',
  'findNearest',
  'findByName',
  'findPackageFoldersIn',
  'find',
  'findPackageLocations',
  'runMethod',
]

export const featureMixinOptions = {
  partial: [],
  insertOptions: false,
}

export async function attemptResolve(...args) {
  return this.runMethod('attemptResolve', ...args)
}

export async function findNearest(...args) {
  return this.runMethod('findNearest', ...args)
}

export async function findByName(...args) {
  return this.runMethod('findByName', ...args)
}

export async function findPackageFoldersIn(...args) {
  return this.runMethod('findPackageFoldersIn', ...args)
}

export async function find(...args) {
  return this.runMethod('find', ...args)
}

export async function findPackageLocations(...args) {
  return this.runMethod('findPackageLocations', ...args)
}

function runMethod(method, ...args) {
  return this.runtime.ipcUtils.ask('PACKAGE_FINDER_ADAPTER', {
    method,
    args,
  })
}
