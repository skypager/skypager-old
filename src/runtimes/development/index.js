import skypager from "skypager-runtimes-node"
import * as historyServer from "servers/history"
import * as developmentServer from "servers/development"
import * as initializer from "./initializer"

skypager.selectors.add(require.context("./selectors", true, /\.js$/))
skypager.features.add(require.context("./features", true, /\.js$/))

module.exports = skypager

skypager.use(initializer)
skypager.hide("runtimeProvider", "development", true)
skypager.hide("runtimeModule", module.id, true)
skypager.hide("runtimePackageInfo", __PACKAGE__, true)

skypager.servers.register("history", () => historyServer)
skypager.servers.register("development", () => developmentServer)
