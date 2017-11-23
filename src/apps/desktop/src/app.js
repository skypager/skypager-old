import { React, Component, types, skypager, ReactRouterDOM } from './globals'
import Home from './pages/Home/Home'
import PackageBrowser from './pages/PackageBrowser/PackageBrowser'
import Console from './pages/Console/Console'
import FileManager from './pages/FileManager/FileManager'
import SidebarLayout from 'layouts/SidebarLayout'

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
    const { runtime } = this.props
    const { sidebarIsVisible, menuItems = [] } = runtime.currentState

    return (
      <Router>
        <SidebarLayout visible={!!sidebarIsVisible} sidebarWidth="thin" menuItems={menuItems}>
          <Route exact path="/" component={Home} />
          <Route path="/package-browser" component={PackageBrowser} />
          <Route path="/console" component={Console} />
          <Route path="/file-manager" component={FileManager} />
        </SidebarLayout>
      </Router>
    )
  }
}

export default App

export const start = () => skypager.renderApp(App)
