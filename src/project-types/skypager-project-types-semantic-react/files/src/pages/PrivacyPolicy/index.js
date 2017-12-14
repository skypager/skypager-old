import { types, Container, Header, Component } from 'globals'

export class PrivacyPolicy extends Component {
  state = {}

  static contextTypes = {
    runtime: types.object
  }

  componentWillMount() {
    const { runtime } = this.context
    const { history } = this.props
    runtime.set('history', history)
  }

  render() {
    return (
      <Container fluid>
        <Header
          as="h1"
          content="Privacy Policy"
          subheader="We care about your data"
        />
      </Container>
    )
  }
}

export default PrivacyPolicy
