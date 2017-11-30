import { React, Component, types, skypager, ReactRouterDOM } from './globals'
import Home from './pages/Home/Home'
import PackageBrowser from './pages/PackageBrowser/PackageBrowser'
import PackageDetails from './pages/PackageDetails/PackageDetails'
import Console from './pages/Console/Console'
import FileManager from './pages/FileManager/FileManager'
import TopMenuAppLayout from 'layouts/TopMenuAppLayout'

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
    const { runtime } = this.props

    const main = runtime.electronMain
    await main.fileManager.startAsync()

    this.setState({ fileManagerStarted: true })

    main.on('stateDidChange', () => {
      this.setState({ mainStateVersion: main.stateVersion })
    })

    runtime.on('stateDidChange', () => {
      this.setState({ stateVersion: runtime.stateVersion })
    })
  }

  renderLeftSidebar() {
    return <div>HI Left</div>
  }

  renderRightSidebar() {
    return <div>HI Right</div>
  }

  renderBottomSidebar() {
    return <div>HI Bottom</div>
  }

  renderTopSidebar() {
    return <div>HI Top</div>
  }

  render() {
    const { runtime } = this.props
    const { showRightSidebar, showLeftSidebar, menuItems = [] } = runtime.currentState
    const { layoutProps = {} } = runtime.currentState

    return (
      <Router>
        <TopMenuAppLayout
          subscriptions={['layoutProps', 'loading', 'sidebarIsVisible']}
          loading={!!runtime.state.get('loading')}
          menuItems={menuItems}
          showRight={showRightSidebar}
          showLeft={showLeftSidebar}
          left={this.renderLeftSidebar()}
          right={this.renderRightSidebar()}
          {...layoutProps}
        >
          <Route exact path="/" component={Home} />
          <Route exact path="/package-browser" component={PackageBrowser} />
          <Route path="/package-browser/:packageId" component={PackageDetails} />
          <Route path="/console" component={Console} />
          <Route path="/file-manager" component={FileManager} />
        </TopMenuAppLayout>
      </Router>
    )
  }
}

export default App

export const start = () => skypager.renderApp(App)
