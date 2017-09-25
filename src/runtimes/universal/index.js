const skypager = (module.exports = require("skypager-runtime"))

skypager.hide("runtimeProvider", "universal", true)
skypager.hide("runtimeModule", module.id, true)
skypager.hide("runtimePackageInfo", __PACKAGE__, true)
