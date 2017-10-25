import { types, React, Component } from '../globals.js'
import { Route } from 'react-router-dom'
import SidebarLayout from 'layouts/SidebarLayout'
import Home from 'pages/Home'

export class App extends Component {
  static contextTypes = {
    router: types.shape({
      history: types.object,
    }),
  }

  static propTypes = {
    runtime: types.object.isRequired,
  }

  static childContextTypes = {
    runtime: types.object,
  }

  getChildContext() {
    return {
      runtime: this.props.runtime,
    }
  }

  constructor(props = {}, context = {}) {
    super(props, context)

    const { runtime } = this.props

    this.state = {
      loading: !runtime.currentState.loaded,
      sidebarIsVisible: !!runtime.currentState.sidebarIsVisible,
    }
  }

  handleLocationChange = location => this.setState({ location })

  componentWillMount() {
    const { runtime } = this.props
    const { router } = this.context

    runtime.navigate = link => router.history.push(link)

    this.unsubscribe = runtime.state.observe(({ name, newValue }) => {
      if (name === 'loaded' && newValue) {
        this.setState({ loading: false })
      }

      if (name === 'sidebarIsVisible') {
        this.setState({ sidebarIsVisible: !!newValue })
      }
    })
  }

  componentWillUnmount() {
    typeof this.unsubscribe === 'function' && this.unsubscribe()
  }

  render() {
    const menuItems = runtime
      .get('currentState.menuItems', [])
      .map((item, key) => <SidebarLayout.MenuItem key={key} {...item} />)

    return (
      <SidebarLayout menuItems={menuItems} visible={this.state.sidebarIsVisible}>
        <Route exact path="/" component={Home} />
      </SidebarLayout>
    )
  }
}

export default App
