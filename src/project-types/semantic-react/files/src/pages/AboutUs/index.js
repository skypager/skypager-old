import { types, Container, Component } from 'globals'

export class AboutUs extends Component {
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
      <Container page>
        <Header as="h1" content="Title" subheader="Subtitle" />

        <Segment piled>
          This is the AboutUs Component.
        </Segment>
      </Container>
    )
  }
}

export default AboutUs
