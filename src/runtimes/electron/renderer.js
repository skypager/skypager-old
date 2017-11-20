const skypager = require('skypager-runtimes-web')

skypager.parseArgv = function parseArgv(opts = {}) {
  window.__args__ = {}

  if (window.location.hash) {
    var hash = window.location.hash.slice(1).replace('/', '')
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
    './features/renderer',
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
`)

if (skypager.get('syncable.state.set')) {
  skypager.syncable.state.set('ready', true)
}

const { injectScripts = [] } = skypager.argv

Promise.all(injectScripts.map(scriptPath => skypager.assetLoader.injectScript(scriptPath)))
  .then(() => {
    console.log('Injected Scripts', injectScripts)
  })
  .catch(error => {
    console.error('Error while injecting scripts', error, injectScripts)
  })
