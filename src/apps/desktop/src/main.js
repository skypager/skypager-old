const { windowManager } = skypager

const mainWindow = windowManager.browserWindow({
  name: 'main',
  windowName: 'main',
  height: 900,
  width: 1200,
})

skypager.debug('Main Window', { mainWindow: mainWindow.windowId })
