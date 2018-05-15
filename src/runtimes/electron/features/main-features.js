const electron = require('electron')

const featuresContext = require.context(
  './main',
  true,
  /(auto-updater|displays|ipc-helpers|window-manager|storage|state-sync|vm-bindings).*/
)

function attach(runtime) {
  global.skypagerMain = global.skypagerMain || runtime

  runtime.features.add(featuresContext)

  runtime.hideGetter('electron', () => electron)
  runtime.hideGetter('app', () => electron.app)
  runtime.hideGetter('BrowserWindow', () => electron.BrowserWindow)
  runtime.hideGetter('ipcMain', () => electron.ipcMain)
}

module.exports = { attach }