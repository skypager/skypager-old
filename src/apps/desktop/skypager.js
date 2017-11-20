async function registerHelpers() {
  skypager.webpacks.register('renderer', () => require('./src/webpacks/renderer.js'))
  skypager.webpacks.register('main', () => require('./src/webpacks/main.js'))
}

registerHelpers().then(() => {
    skypager.setState({ helpersRegistered: true })
}).catch((e) => {
    skypager.setState({ error: e })
})
