const runtime = (module.exports = window.runtime = skypager)

runtime.state.set('menuItems', [
  {
    icon: 'home',
    name: 'home',
    content: 'Home',
    onClick: () => runtime.navTo('/'),
  },
  {
    icon: 'cloud',
    name: 'runtimes',
    content: 'Runtimes',
    onClick: () => runtime.navTo('/runtimes'),
  },
])

// Placeholder.  Navigate is overridden by react-router-dom when rendered with react
runtime.navigate = link => (window.location = link)

runtime.startApp = () =>
  runtime
    .use(require('./docs').bind(runtime))
    .start()
    .then(() => {
      return runtime
    })

runtime.navTo = link => {
  runtime.state.set('sidebarIsVisible', false)
  runtime.navigate(link)
}

// runtime.assets = require('../assets')(runtime)
