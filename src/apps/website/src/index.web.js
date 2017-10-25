import { runtime } from './globals'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Link, BrowserRouter as Router } from 'react-router-dom'
import SidebarLayout from 'layouts/SidebarLayout'
import App from './app'
import MenuItems from './menu-items'

let renderVersion = (global.renderVersion = 0)

require('date-input-polyfill')

const renderApp = (Component, props = {}) =>
  render(
    <AppContainer key={Math.random() + renderVersion}>
      <Router>
        <Component
          menuItems={<MenuItems runtime={runtime} Link={Link} />}
          sidebarProps={{
            fixed: 'left',
            inverted: true,
            vertical: true,
            width: 'thin',
            visible: true,
          }}
          showSidebar
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
  .startApp()
  .then(() => renderApp(App))
  .then(() => sleep(1000))
  .then(() => runtime.state.set('loaded', true))

global.renderApp = renderApp
global.App = App

const sleep = (ms = 0) => new Promise(res => setTimeout(res, ms))
