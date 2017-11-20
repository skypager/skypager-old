import { skypager, ReactDOM } from './globals'
import { start } from './app'

skypager.renderApp = Component =>
  ReactDOM.render(<Component runtime={skypager} />, document.getElementById('app'))

module.exports = skypager

start()
