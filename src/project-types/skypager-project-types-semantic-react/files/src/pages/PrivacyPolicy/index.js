import { types, Container, Component } from 'globals'
import SplitColumnLayout from 'components/SplitColumnLayout'

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

        <SplitColumnLayout
          menuItems={[
            { content: 'Menu Item One' },
            { content: 'Menu Item Two' }
          ]}>
          <p>What up son</p>
        </SplitColumnLayout>
      </Container>
    )
  }
}

export default PrivacyPolicy
