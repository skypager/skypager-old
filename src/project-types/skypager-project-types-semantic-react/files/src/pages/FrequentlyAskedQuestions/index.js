import { types, Container, Component } from 'globals'

export class FrequentlyAskedQuestions extends Component {
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
          This is the FrequentlyAskedQuestions Component.
        </Segment>
      </Container>
    )
  }
}

export default FrequentlyAskedQuestions
