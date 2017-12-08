import { skypager, ReactDOM } from './globals'
import { start } from './app'
import { AppContainer } from 'react-hot-loader'

const featuresContext = require.context('./features/renderer', true, /\.js$/)

skypager.features.add(featuresContext)

console.log(featuresContext.keys)

skypager
  .use('local-keybindings')
  .use('layouts')
  .use('drawers')
  .use('navigation')
  .use('adapters/ipc')
  .use('adapters/selectors')
  .use('adapters/file-manager')
  .use('adapters/package-finder')
  .use('adapters/package-manager')

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

const removeSplashEl = () => {
  if (typeof document !== 'undefined') {
    const splashEl = document.querySelector('#splash')
    splashEl.parentNode.removeChild(splashEl)
  }
}

skypager.renderApp = Component => {
  if (!skypager.__performedInitialResize) {
    const { height, width } = skypager.electronMain.feature('displays').displaySize

    skypager.browserWindow.hide()
    skypager.browserWindow.setSize(Math.floor(width * 0.8), Math.floor(height * 0.8))
    skypager.browserWindow.center()
    removeSplashEl()
  }

  const el = ReactDOM.render(
    <AppContainer>
      <Component runtime={skypager} />
    </AppContainer>,
    document.getElementById('app')
  )

  return el
}

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
