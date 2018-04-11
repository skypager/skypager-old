if (typeof global === 'undefined' && typeof window !== 'undefined') {
  window.global = window
}

if (typeof process === 'undefined') {
  global.process = { env: {} }
}

require('./bundle-dependencies')
module.exports = global.skypager = require('./index')
