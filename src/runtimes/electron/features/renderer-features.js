const featuresContext = require.context(
  './renderer',
  true,
  /(browser-window|ipc-helpers|storage|vm-bindings|state-sync).*\.js/
)

function attach(runtime) {
  runtime.features.add(featuresContext)
  runtime.electron = require('electron')
  runtime.hideGetter('BrowserWindow', () => runtime.electron.BrowserWindow)
  runtime.hideGetter('electronMain', () => runtime.electron.remote.getGlobal("skypagerMain"))
}

module.exports = { attach }