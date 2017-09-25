if (typeof global === "undefined" && typeof window !== "undefined") {
  window.global = window
}

if (typeof process === "undefined") {
  global.process = { env: {} }
}

const runtime = require("./runtime")

module.exports = global.skypager = global.skypager || runtime.createSingleton()

global.SkypagerRuntime = module.exports
