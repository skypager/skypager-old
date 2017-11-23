import { List, Grid, GridColumn as Column, Link, types, Component } from '../../globals'
import SidebarLayout from 'layouts/SidebarLayout'
import Editor from 'components/Editor'
import FilesTree from 'components/FilesTree'

export class Home extends Component {
  static contextTypes = {
    main: types.object,
    runtime: types.object,
  }

  state = {}

  async componentWillMount() {
    const { runtime } = this.context
    const { history } = this.props
    runtime.navigate = link => history.push(link)
  }

  render() {
    const { main } = this.context
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
        <Grid>
          <Column>
            <Segment circular as={Link} to="/file-manager">
              <Icon size="large" name="file outline" />
            </Segment>
          </Column>
        </Grid>
      </Segment>
    )
  }
}

export default Home
