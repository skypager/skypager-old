if (typeof window !== "undefined" && typeof global === "undefined") {
  window.global = window
}

global.lodash = global._ = require("lodash")

const { skypager = require("skypager-runtime") } = global

if (skypager.isElectronRenderer) {
  module.exports = require(skypager.pathUtils.join(__dirname, "renderer.js"))
} else if (skypager.isElectron) {
  module.exports = require(skypager.pathUtils.join(__dirname, "main.js"))
} else {
  module.exports = skypager
}
