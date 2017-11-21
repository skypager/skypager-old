import { skypager, ReactDOM } from './globals'
import { start } from './app'

skypager.features.add(require.context('./features/renderer', false, /\.js$/))

skypager.setState({
  menuItems: [
    {
      content: 'Home',
      icon: 'home',
      link: '/',
    },
    {
      content: 'Packages',
      icon: 'file outline',
      link: '/package-browser',
    },
    {
      content: 'Console',
      icon: 'code',
      link: '/console',
    },
  ],
})

skypager.renderApp = Component =>
  ReactDOM.render(<Component runtime={skypager} />, document.getElementById('app'))

module.exports = skypager

skypager.hideGetter('mainEnvironment', () => {
  const { os = {} } = skypager.electronMain
  const { environment = {} } = os

  return skypager.lodash.mapValues(environment, v => {
    if (v === 'true') {
      return true
    }
    if (v === 'false') {
      return false
    }
    return v
  })
})

start()
