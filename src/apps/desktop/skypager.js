function registerHelpers() {
  const { webpacks } = skypager

  webpacks.register('renderer', () => require('./src/webpacks/renderer.js'))
  webpacks.register('main', () => require('./src/webpacks/main.js'))

  return webpacks
}

registerHelpers().then(() => {
    skypager.setState({ helpersRegistered: true })
}).catch((e) => {
    skypager.setState({ error: e })
})
