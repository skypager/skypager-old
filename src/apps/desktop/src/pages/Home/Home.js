import { types, Component } from '../../globals'
import CollapsibleColumnLayout from 'layouts/CollapsibleColumnLayout'
import MenuItemsCardGroup from 'components/MenuItemsCardGroup'

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
    return (
      <CollapsibleColumnLayout
        leftWidth={3}
        rightWidth={3}
        right={this.renderRightColumn()}
        left={this.renderLeftColumn()}
      >
        <MenuItemsCardGroup filter={menuItem => menuItem.content !== 'Home'} />
      </CollapsibleColumnLayout>
    )
  }
}

export default Home
