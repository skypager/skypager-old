try {
  require('babel-register')
} catch (error) {}

const skypager = __non_webpack_require__('skypager-runtimes-electron')
const dev = skypager.argv.dev
const url = skypager.get(
  'argv.url',
  dev ? `http://localhost:3000/index.html` : `file://${__dirname}/index.html`
)

skypager.features.add(require.context('./features/main', true, /.js$/))

skypager.whenStarted(() => {
  const { windowManager } = skypager

  const mainWindow = windowManager.browserWindow({
    name: 'main',
    windowName: 'main',
    height: 900,
    width: 1200,
    show: skypager.argv.autoShow !== false && process.env.SKYPAGER_DEV,
  })

  const win = mainWindow.getWindow()

  skypager
    .use('skypage')
    .use('adapters')
    .use('application-menu')

  skypager.debug(`Loading URL: ${url}`)

  win.loadURL(url)

  skypager.fileManager.startAsync()

  win.once('ready-to-show', () => win.show())

  if (skypager.argv.interactive || skypager.argv.repl) {
    skypager.repl('interactive').launch()
  }
})
