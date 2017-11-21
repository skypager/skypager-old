import { Inspect, types, Component } from '../../globals'
import PackageCard from './PackageCard'

export class PackageBrowser extends Component {
  static contextTypes = {
    main: types.object,
    runtime: types.object,
  }

  state = {
    loaded: false,
    packageData: [],
  }

  handleCardClick = pkg => e => {
    e.preventDefault()
    console.log('handled click', pkg.name)
  }

  async componentWillMount() {
    const { main, runtime } = this.context
    const { history } = this.props
    runtime.navigate = link => history.push(link)

    this.setState({ loaded: false })

    await main.packageManager.startAsync()

    this.setState({ loaded: true, packageData: main.packageManager.packageData })

    const changedPackageIds = await main.select('package/changed')

    this.setState({ changedPackageIds })
  }

  render() {
    const { changedPackageIds = [], loaded, packageData = [], sortColumn = 'name' } = this.state
    const { sortBy } = lodash

    return (
      <Segment basic>
        <Header
          dividing
          as="h2"
          icon="file outline"
          content="Package Browser"
          subheader="For working with any subpackages"
        />
        <Loader active={!loaded} />
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
      </Segment>
    )
  }
}

export default PackageBrowser
