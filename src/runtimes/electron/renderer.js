const skypager = require("skypager-runtimes-react")

skypager.parseArgv = function parseArgv(opts = {}) {
  window.__args__ = {}

  if (window.location.hash) {
    var hash = window.location.hash.slice(1).replace("/", "")
    try {
      window.__args__ = Object.freeze(JSON.parse(decodeURIComponent(hash)))
    } catch (error) {}
  }

  return skypager.lodash.defaultsDeep(skypager.argv, window.__args__, opts)
}

skypager.parseArgv()

module.exports = skypager

global.skypager = global.skypagerRenderer = skypager

skypager.features.add(
  require.context(
    "./features/renderer",
    true,
    /(browser-window|ipc-helpers|storage|vm-bindings|state-sync).*\.js/
  )
)

skypager.vm.runInThisContext(`
skypager.electron = require('electron')
skypager.BrowserWindow = skypager.electron.BrowserWindow
skypager.feature('browser-window').enable()
skypager.feature('ipc-helpers').enable()
skypager.feature('storage').enable()
skypager.feature('vm-bindings').enable()
skypager.feature("state-sync").enable()
skypager.getter('electronMain', function() { return skypager.electron.remote.getGlobal("skypagerMain") })
skypager.feature('history').enable()
skypager.feature('routing').enable()
skypager.feature('navigation').enable()
`)

const renderApp = skypager.reactRenderers.create({ type: "dom" })

skypager.renderApp = (props = {}) => (global.rootEl = renderApp(props))

if (skypager.get("syncable.state.set")) {
  skypager.syncable.state.set("ready", true)
}

skypager.use(next => {
  if (skypager.argv.injectScripts) {
    Promise.all(skypager.argv.injectScripts.map(url => skypager.assetLoader.injectScript(url)))
      .then(() => {
        skypager.debug("Finished injecting scripts")
        next()
      })
      .catch(error => {
        skypager.error("Error while injecting scripts")
        next(error)
      })
  } else {
    next()
  }
})
