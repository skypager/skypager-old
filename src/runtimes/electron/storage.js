const Promise = require("bluebird")
const promisified = Promise.promisifyAll(require("electron-json-storage"))

module.exports = {
  get: (...args) => promisified.getAsync(...args),
  set: (...args) => promisified.setAsync(...args),
  keys: (...args) => promisified.keysAsync(...args),
  has: (...args) => promisified.hasAsync(...args),
  clear: (...args) => promisified.clearAsync(...args),
  remove: (...args) => promisified.removeAsync(...args),
}
