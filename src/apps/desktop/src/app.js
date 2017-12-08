import { React, Component, types, skypager, ReactRouterDOM } from './globals'
import Home from './pages/Home/Home'
import PackageBrowser from './pages/PackageBrowser/PackageBrowser'
import PackageDetails from './pages/PackageDetails/PackageDetails'
import Console from './pages/Console/Console'
import FileManager from './pages/FileManager/FileManager'
import MultiDrawerLayout from 'layouts/MultiDrawerLayout'

const { Route, Switch, MemoryRouter: Router } = ReactRouterDOM

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

  state = {
    drawers: {
      showLeft: false,
      showRight: false,
      showBottom: false,
      showTop: false,
      top: 'Console',
    },
  }

  getChildContext() {
    return {
      runtime: this.props.runtime,
      main: this.props.runtime.electronMain,
    }
  }

  async componentWillMount() {
    const { runtime } = this.props

    runtime.ipcUtils.tell('APP_EVENTS', {
      event: 'appWillMount',
    })
    runtime.on('stateDidChange', () => {
      this.setState({ stateVersion: runtime.stateVersion })
    })
  }

  componentDidMount() {
    const { runtime } = this.props

    setTimeout(() => {
      runtime.ipcUtils.tell('APP_EVENTS', {
        event: 'appDidMount',
      })

      runtime.__performedInitialResize = true
    }, 2000)
  }

  render() {
    return (
      <Router>
        <div style={{ height: '100%', width: '100%', margin: 0, padding: 0, overflow: 'hidden' }}>
          <MultiDrawerLayout {...this.state.drawers}>
            <Route exact path="/" component={Home} />
            <Route exact path="/package-browser" component={PackageBrowser} />
            <Route path="/package-browser/:packageId" component={PackageDetails} />
            <Route path="/console" component={Console} />
            <Route path="/file-manager" component={FileManager} />
          </MultiDrawerLayout>
        </div>
      </Router>
    )
  }
}

export default App

export const start = () => skypager.renderApp(App)
