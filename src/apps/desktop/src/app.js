import { React, Component, types, skypager, ReactRouterDOM } from './globals'
import Home from './pages/Home/Home'

const { MemoryRouter: Router } = ReactRouterDOM

export class App extends Component {
  static childContextTypes = {
    runtime: types.object,
    main: types.shape({
      setState: types.func,
      currentState: types.object,
    }).isRequired,
  }

  static propTypes = {
    runtime: types.shape({
      setState: types.func,
      currentState: types.object,
    }).isRequired,
  }

  getChildContext() {
    return {
      runtime: this.props.runtime,
      main: this.props.runtime.electronMain,
    }
  }

  async componentWillMount() {
    const main = this.props.runtime.electronMain
    await main.fileManager.startAsync()
    this.setState({ fileManagerStarted: true })

    main.on('stateDidChange', () => {
      this.setState({ stateVersion: main.stateVersion })
    })
  }

  render() {
    const main = this.props.runtime.electronMain

    return (
      <Router>
        <Route path="/" component={Home} />
      </Router>
    )
  }
}

export default App

export const start = () => skypager.renderApp(App)
