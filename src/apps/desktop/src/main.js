try {
  require('babel-register')
} catch (error) {}

const skypager = __non_webpack_require__('skypager-runtimes-electron')
const dev = skypager.argv.dev
const url = skypager.get(
  'argv.url',
  dev ? `file://${__dirname}/dev.html` : `file://${__dirname}/index.html`
)

skypager.features.add(require.context('./features/main', false, /.js$/))

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
    show: process.env.SKYPAGER_DEV,
  })

  const win = mainWindow.getWindow()

  skypager.debug(`Loading URL: ${url}`)
  win.loadURL(url)

  win.once('ready-to-show', () => win.show())

  if (skypager.argv.interactive || skypager.argv.repl) {
    skypager.repl('interactive').launch()
  }
})
