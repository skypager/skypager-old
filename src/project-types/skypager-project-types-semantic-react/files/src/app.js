import { types, React, Component, Loader } from './globals.js'
import { BrowserRouter as Router } from 'react-router-dom'
import PublicApp from 'apps/public'

import './styles/app.scss'

export class App extends Component {
  static propTypes = {
    runtime: types.object.isRequired
  }

  static childContextTypes = {
    runtime: types.object,
    currentUser: types.object
  }

  getChildContext() {
    return {
      runtime: this.props.runtime,
      currentUser: this.state.currentUser
    }
  }

  constructor(props = {}, context = {}) {
    super(props, context)

    const { runtime } = this.props

    this.state = {
      loading: !runtime.currentState.dataLoaded,
      loggedIn: !!runtime.currentState.currentUser,
      currentUser: runtime.currentState.currentUser,
      public: PublicApp
    }
  }

  async enforceRole(currentUser = this.state.currentUser) {
    const { runtime } = this.props

    await runtime.loadData()

    if (currentUser && !this.state.roleEnforced) {
      const updates = await runtime.enforceRole(currentUser)

      this.setState(currentState => ({
        ...currentState,
        currentUser,
        loggedIn: true,
        roleEnforced: true,
        ...updates
      }))

      console.log('loading in response to enforce role')
      const data = await runtime.loadData()
      console.log('loading', this.state.loading)
      this.setState({ loading: !data })
      console.log('data', data)

      return updates
    }

    return {}
  }

  handleRuntimeStateChange({ name, newValue, type } = {}) {
    const updates = {}

    if (name === 'dataLoaded' && newValue) {
      console.log('data loaded')
      updates.loading = false
    }

    if (name === 'loggedIn' || name === 'currentUser') {
      updates[name] = newValue
      updates.loggedIn = !!newValue

      if (!newValue) {
        updates.currentUserRole = 'public'
        updates.anonymized = true
        updates.roleEnforced = false
      } else {
        name === 'currentUser' && Promise.resolve(this.enforceRole(newValue))
      }
    }

    this.setState(currentState => ({
      ...currentState,
      ...updates
    }))
  }

  async componentWillMount() {
    const { runtime } = this.props
    const { currentUser } = runtime.currentState

    if (currentUser) {
      await this.enforceRole(currentUser)
    }

    if (!this.disposer) {
      this.disposer = runtime.state.observe(
        this.handleRuntimeStateChange.bind(this)
      )
    }
  }

  componentWillUnmount() {
    if (this.disposer) {
      this.disposer()
    }
  }

  componentDidUpdate(previousProps, previousState) {
    if (
      !previousState[this.currentAppId] &&
      !previousState[`loaded_${this.currentAppId}`] &&
      !this._isLoading
    ) {
      this.loadCurrentApp().then(currentApp => {
        this.setState({
          [`loaded_${this.currentAppId}`]: true,
          [this.currentAppId]: currentApp
        })
      })
    }
  }

  loadCurrentApp() {
    this._isLoading = true

    return System.import(`./apps/${this.currentAppId}.js`).then(mod => {
      this._isLoading = false
      return mod.default
    })
  }

  get CurrentApp() {
    const { currentAppId } = this
    const AppComponent = this.state[currentAppId]

    return AppComponent || (() => <Loader active />)
  }

  get currentAppId() {
    const { currentUserRole = 'public', loggedIn } = this.state

    if (!loggedIn) {
      return 'public'
    }

    return 'private'
  }

  render() {
    const { CurrentApp } = this
    const { loggedIn, loading = true } = this.state

    if (loggedIn && loading) {
      return <Loader active />
    }

    return (
      <Router>
        <CurrentApp {...this.props} />
      </Router>
    )
  }
}

export default App
