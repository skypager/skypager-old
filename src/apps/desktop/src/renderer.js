import { skypager, ReactDOM } from './globals'
import { start } from './app'
import { AppContainer } from 'react-hot-loader'

skypager.features.add(require.context('./features/renderer', false, /\.js$/))

skypager.use('layouts')

skypager.setState({
  sidebarIsVisible: false,
  menuItems: [
    {
      content: 'Home',
      icon: 'home',
      onClick: () => {
        runtime.navigate(`/`)
        runtime.setState({ sidebarIsVisible: false })
      },
    },
    {
      content: 'Packages',
      icon: 'folder outline',
      onClick: () => {
        runtime.navigate(`/package-browser`)
        runtime.setState({ sidebarIsVisible: false })
      },
    },
    {
      content: 'File Manager',
      icon: 'file outline',
      onClick: () => {
        runtime.navigate(`/file-manager`)
        runtime.setState({ sidebarIsVisible: false })
      },
    },
    {
      content: 'Console',
      icon: 'code',
      onClick: () => {
        runtime.navigate(`/console`)
        runtime.setState({ sidebarIsVisible: false })
      },
    },
  ],
})

skypager.renderApp = Component =>
  ReactDOM.render(
    <AppContainer>
      <Component runtime={skypager} />
    </AppContainer>,
    document.getElementById('app')
  )

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

if (module.hot) {
  if (module.hot) {
    module.hot.accept('./app.js', () => {
      skypager.state.set('loaded', true)
      skypager.renderApp(require('./app.js').App)
    })
  }
}

start()
