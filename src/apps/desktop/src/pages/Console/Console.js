import { types, Component } from '../../globals'

export class Console extends Component {
  static contextTypes = {
    main: types.object,
    runtime: types.object,
  }

  async componentWillMount() {
    const { runtime } = this.context
    const { history } = this.props
    runtime.navigate = link => history.push(link)
  }

  render() {
    return (
      <Segment basic>
        <Header
          dividing
          as="h2"
          icon="code"
          content="Console"
          subheader="Interactive Project REPL"
        />
      </Segment>
    )
  }
}

export default Console
