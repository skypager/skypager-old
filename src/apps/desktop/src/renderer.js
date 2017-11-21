import { skypager, ReactDOM } from './globals'
import { start } from './app'

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

start()
