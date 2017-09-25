import skypager from "skypager-runtimes-react/skypager-react"

skypager.set("framework.version", __PACKAGE__.version)
skypager.set("framework.dirname", __dirname)
skypager.set("framework.buildStatus", __BUILD_STATUS__)

module.exports = skypager
