import { runtime } from './globals'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './app'

let renderVersion = (global.renderVersion = 0)

require('date-input-polyfill')

const renderApp = (Component, props = {}) =>
  render(
    <AppContainer key={Math.random() + renderVersion}>
      <Router>
        <Component runtime={runtime} />
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
