import { Link, types, Component } from '../../globals'
import SidebarLayout from 'layouts/SidebarLayout'

export class Home extends Component {
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
    const { main, runtime } = this.context
    const { version, name = main.name } = main.get('currentPackage')

    return (
      <Segment basic>
        <Header
          as="h2"
          icon="home"
          dividing
          content="Project Home"
          subheader={name + ' ' + (version ? `v${version}` : '')}
        />
      </Segment>
    )
  }
}

export default Home
