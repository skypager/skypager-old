if (typeof global === "undefined" && typeof window !== "undefined") {
  window.global = window
}

const runtime = require("./runtime")

module.exports = global.skypager = global.SkypagerRuntime = runtime.createSingleton()
