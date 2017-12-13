import { Link, types, Container, Component } from 'globals'

export class LoginStatus extends Component {
  static contextTypes = {
    runtime: types.object
  }

  constructor(props = {}, context = {}) {
    super(props, context)

    this.state = {
      currentUserName: ''
    }
  }

  updateCurrentUserName() {
    const { runtime } = this.context
    const { currentUser } = runtime.currentState

    if (currentUser) {
      this.setState({
        currentUserName: currentUser.displayName || currentUser.email
      })
    }
  }

  handleSignOut = e => {
    e.preventDefault()

    const { runtime } = this.context
    runtime.auth.signOut()
  }

  componentDidMount() {
    const { runtime } = this.context
    this.updateCurrentUserName()
  }

  render() {
    const { currentUserName } = this.state

    if (!currentUserName) {
      return <Link to="/sign-in">Login</Link>
    }

    return (
      <Container>
        {currentUserName}{' '}
        <a href="#" onClick={this.handleSignOut}>
          <Icon name="sign out" />
        </a>
      </Container>
    )
  }
}

export default LoginStatus
