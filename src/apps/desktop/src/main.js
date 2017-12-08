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
    height: 700,
    width: 700,
    center: true,
    show: !!skypager.argv.debug,
  })

  const win = mainWindow.getWindow()
  win.loadURL(url)
  win.show()

  /**
    TODO This will not work in a packaged electron app running in a CWD without a .git
          Need to make fileManager fallback to skywalker.projectWalker
  */
  skypager.fileManager.startAsync()

  skypager
    .use('skypage')
    .use('adapters')
    .use('application-menu')

  skypager.debug(`Loading URL: ${url}`)

  skypager.listenToIPC('APP_EVENTS', ({ payload }) => {
    const { event } = payload

    if (event === 'appDidMount') {
      win.show()
    }
  })

  if (skypager.argv.interactive || skypager.argv.repl) {
    skypager.repl('interactive').launch()
  }
})
