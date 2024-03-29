const electron = require('electron')
let skypager

if (process.env.SKYPAGER_DEV) {
  require('skypager-runtimes-node')
  skypager = require('skypager-runtimes-development')
} else {
  skypager = require('skypager-runtimes-node')
}

module.exports = global.skypager = skypager

skypager.electron = electron

try {
  electron.protocol.registerStandardSchemes(['skypager'])
} catch (error) {}

skypager.hideGetter('app', () => electron.app)
skypager.hideGetter('BrowserWindow', () => electron.BrowserWindow)
skypager.hideGetter('ipcMain', () => electron.ipcMain)

skypager.makeObservable({
  appIsReady: electron.app.isReady(),
})

try {
  if (skypager.get('argv._', []).length) {
    const validPaths = skypager.argv._.map(p => skypager.resolve(p)).filter(f =>
      skypager.fsx.existsSync(f)
    )

    skypager.state.set('validPathArgs', validPaths)
  }
} catch (error) {}

skypager.features.add(
  require.context(
    './features/main',
    true,
    /(auto-updater|displays|ipc-helpers|window-manager|storage|state-sync|vm-bindings).*/
  )
)

global.skypagerMain = global.skypager = skypager

skypager.electron.app.on('ready', function() {
  skypager.appIsReady = true

  skypager.feature('window-manager').enable({})
  skypager.feature('ipc-helpers').enable()
  skypager.feature('storage').enable()
  skypager.feature('displays').enable()
  skypager.feature('vm-bindings').enable()
  skypager.feature('state-sync').enable()

  skypager.emit('appIsReady', skypager, skypager.electron.app)

  electron.protocol.registerStringProtocol('skypager', (request, cb) => {
    cb(`skypager.log(${JSON.stringify(request)})`)
  })

  skypager.start().then(() => {
    skypager.setState({ started: true })
  })
})
