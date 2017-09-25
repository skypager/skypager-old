if (typeof window !== "undefined" && typeof global === "undefined") {
  window.global = window
}

const skypager = require("./index")

module.exports = skypager

skypager.hide("runtimeProvider", "web", true)
skypager.hide("runtimeModule", module.id, true)
