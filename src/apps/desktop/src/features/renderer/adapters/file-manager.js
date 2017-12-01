export const createGetter = 'fileManager'

export const featureMethods = [
  'selectMatches',
  'matchPaths',
  'hashFiles',
  'readContent',
  'hashFile',
  'file',
  'directory',
  'fileObjects',
  'directoryObjects',
  'start',
  'runMethod',
]

export const featureMixinOptions = {
  partial: [],
  insertOptions: false,
}

export function runMethod(method, ...args) {
  return this.runtime.ipcUtils.ask('FILE_MANAGER_ADAPTER', {
    method,
    args,
  })
}

export async function start(...args) {
  return this.runMethod('startAsync', ...args)
}

export async function fileObjects(...args) {
  return this.runMethod('fileObjects', ...args)
}

export async function directoryObjects(...args) {
  return this.runMethod('directoryObjects', ...args)
}

export async function selectMatches(...args) {
  return this.runMethod('selectMatches', ...args)
}

export async function matchPaths(...args) {
  return this.runMethod('matchPaths', ...args)
}

export async function hashFiles(...args) {
  return this.runMethod('hashFiles', ...args)
}

export async function readContent(...args) {
  return this.runMethod('readContent', ...args)
}

export async function hashFile(...args) {
  return this.runMethod('hashFile', ...args)
}

export async function file(...args) {
  return this.runMethod('file', ...args)
}

export async function directory(...args) {
  return this.runMethod('directory', ...args)
}
