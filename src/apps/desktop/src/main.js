const skypager = require('skypager-runtimes-electron')
const url = skypager.get('argv.url', `file://${__dirname}/index.html`)

skypager.debug(
  `Skypager Desktop Editor App Main Entry Point Reached. Waiting for skypager to start`
)

skypager.whenStarted(() => {
  const { windowManager } = skypager

  const mainWindow = windowManager.browserWindow({
    name: 'main',
    windowName: 'main',
    height: 900,
    width: 1200,
    show: false,
  })

  const win = mainWindow.getWindow()

  skypager.debug(`Loading URL: ${url}`)
  win.loadURL(url)

  win.once('ready-to-show', () => win.show())
})
