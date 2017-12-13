import { Segment, Container, types, Component } from 'globals'
import MainHeader from 'components/MainHeader'

export class PrivateHome extends Component {
  state = {}
  static contextTypes = {
    runtime: types.object
  }

  componentWillMount() {
    const { runtime } = this.context
    const { history } = this.props
    runtime.set('history', history)
  }

  async handleLogout(e) {
    e.preventDefault()
    const { runtime } = this.context

    await runtime.logout()
    runtime.history.push('/')
  }

  render() {
    return (
      <Container>
        <MainHeader />
        <Segment piled>
          This is the PrivateHome Component.
          <a href="#" onClick={this.handleLogout.bind(this)}>
            Logout
          </a>
        </Segment>
      </Container>
    )
  }
}

export default PrivateHome
