import { runtime } from './globals'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Link, BrowserRouter as Router } from 'react-router-dom'
import App from './app'
import MenuItems from './menu-items'

let renderVersion = (global.renderVersion = 0)

const renderApp = (Component, props = {}) =>
  render(
    <AppContainer key={Math.random() + renderVersion}>
      <Router>
        <App
          showSidebar
          sidebarProps={{ vertical: true, inverted: true }}
          menuItems={<MenuItems runtime={runtime} Link={Link} />}
          runtime={runtime}
        />
      </Router>
    </AppContainer>,
    document.getElementById('app')
  )

if (module.hot) {
  module.hot.accept('./app', () => {
    runtime.state.set('loaded', true)
    renderApp(require('./app').App, { loaded: true })
  })
}

runtime
  .use(SkypageDocumentType)
  .startApp()
  .then(() => renderApp(App))
  .then(() => sleep(1000))
  .then(() => {
    runtime.setState({ loaded: true })
  })
/*
  .then(() =>
    System.import('components/Editor').then(({ default: Editor }) => {
      runtime.Editor = Editor
    })
  )
  .then(() => renderApp(App))
  .then(() => sleep(1000))
  .then(() => runtime.state.set('loaded', true))
  */

global.renderApp = renderApp
global.App = App

const sleep = (ms = 0) => new Promise(res => setTimeout(res, ms))
