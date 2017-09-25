export const hostMethods = ["getStorage"]

export function getStorage() {
  const { promisifyAll } = require("bluebird")
  const promisified = promisifyAll(require("electron-json-storage"))

  return {
    get: (...args) => promisified.getAsync(...args),
    set: (...args) => promisified.setAsync(...args),
    keys: (...args) => promisified.keysAsync(...args),
    has: (...args) => promisified.hasAsync(...args),
    clear: (...args) => promisified.clearAsync(...args),
    remove: (...args) => promisified.removeAsync(...args),
  }
}
