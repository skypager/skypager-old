import { types, Component } from '../../globals'
import PackageCard from './PackageCard'
import CollapsibleColumnLayout from 'layouts/CollapsibleColumnLayout'

export class PackageBrowser extends Component {
  static contextTypes = {
    main: types.object,
    runtime: types.object,
  }

  state = {
    loading: false,
    packageData: [],
  }

  handleCardClick = pkg => e => {
    e.preventDefault()
    runtime.navigate(`/package-browser/${pkg.name}`)
  }

  async componentWillMount() {
    const { main, runtime } = this.context
    const { history } = this.props
    runtime.navigate = link => history.push(link)

    this.setState({ loading: false })

    await main.packageManager.startAsync()

    this.setState({ loaded: true, packageData: main.packageManager.packageData })

    const changedPackageIds = await main.select('package/changed')

    this.setState({ changedPackageIds })
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
    const { changedPackageIds = [], loading, packageData = [], sortColumn = 'name' } = this.state
    const { sortBy } = lodash

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
                  link: false,
                  active: true,
                },
              ]}
            />
          </Segment>

          <Container style={{ marginTop: '40px' }}>
            <Header icon="folder outline" as="h3" content="Package Browser" dividing />
            <Card.Group itemsPerRow={3}>
              {sortBy(packageData, sortColumn).map((pkg, key) => (
                <PackageCard
                  isChanged={changedPackageIds.indexOf(pkg._packageId) >= 0}
                  onClick={this.handleCardClick(pkg)}
                  key={key}
                  {...pkg}
                />
              ))}
            </Card.Group>
          </Container>
        </Container>
      </CollapsibleColumnLayout>
    )
  }
}

export default PackageBrowser
