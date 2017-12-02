import { types, Component } from '../../globals'
import CollapsibleColumnLayout from 'layouts/CollapsibleColumnLayout'
import Inspector from 'react-json-inspector'

export class PackageDetails extends Component {
  static contextTypes = {
    main: types.object,
    runtime: types.object,
  }

  state = {
    loading: false,
  }

  async componentWillMount() {
    const { runtime, main } = this.context
    const { history } = this.props
    const { packageId } = this.props.match.params

    runtime.navigate = link => history.push(link)

    const packageDetails = main.packageManager.findByName(packageId)

    this.setState({ loading: false, packageDetails })
  }

  renderRightColumn() {
    return (
      <Container fluid style={{ padding: '1em 1em' }}>
        <Segment stacked>Right</Segment>
      </Container>
    )
  }

  renderLeftColumn() {
    return (
      <Container fluid style={{ padding: '1em 1em' }}>
        <Segment stacked>Left</Segment>
      </Container>
    )
  }

  render() {
    const { runtime } = this.context
    const { loading, packageDetails } = this.state

    if (loading) {
      return <Loader active />
    }

    return (
      <CollapsibleColumnLayout
        leftWidth={3}
        rightWidth={3}
        showRight={false}
        showLeft={false}
        right={this.renderRightColumn()}
        left={this.renderLeftColumn()}
      >
        <Container>
          <Segment basic fluid secondary>
            <Breadcrumb
              sections={[
                {
                  key: 'Home',
                  content: 'Home',
                  link: true,
                  active: false,
                  onClick: () => runtime.navigate('/'),
                },
                {
                  key: 'PackageManager',
                  content: 'Package Browser',
                  link: true,
                  onClick: () => runtime.navigate('/package-browser'),
                },
                { key: 'Details', content: packageDetails.name, active: true },
              ]}
            />
          </Segment>
          <Container style={{ marginTop: '20px' }}>
            <Header
              as="h3"
              icon="folder outline"
              dividing
              content={
                runtime.stringUtils.capitalize(packageDetails.name) +
                ' ' +
                `v${packageDetails.version}`
              }
              subheader={packageDetails.description}
            />
            <Inspector search={false} data={this.state.packageDetails} />
          </Container>
        </Container>
      </CollapsibleColumnLayout>
    )
  }
}

export default PackageDetails
