import { types, Component } from '../../globals'

export class PackageBrowser extends Component {
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
          icon="file outline"
          content="Package Browser"
          subheader="For working with any subpackages"
        />
      </Segment>
    )
  }
}

export default PackageBrowser
