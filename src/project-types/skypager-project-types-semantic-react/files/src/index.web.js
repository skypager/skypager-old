import { runtime } from './globals'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './app.js'

let renderVersion = (global.renderVersion = 0)

require('date-input-polyfill')

const sleep = (ms = 0) =>
  new Promise((resolve, reject) => setTimeout(resolve, ms))

const renderApp = (Component, props = {}) =>
  render(
    <AppContainer key={Math.random() + renderVersion}>
      <Component runtime={runtime} />
    </AppContainer>,
    document.getElementById('app')
  )

if (module.hot) {
  module.hot.accept('./app.js', () => {
    runtime.state.set('loaded', true)
    renderApp(require('./app.js').App, { loaded: true })
  })
}

runtime
  .startApp()
  .then(() => renderApp(App))
  .then(() => sleep(200))
  .then(() => runtime.state.set('loaded', true))

global.renderApp = renderApp
global.App = App
