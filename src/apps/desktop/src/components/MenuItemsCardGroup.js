import { types, Component } from '../globals'

export class MenuItemsCardGroup extends Component {
  static contextTypes = {
    main: types.object,
    runtime: types.object,
  }

  state = {}

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
    const { menuItems = [] } = runtime.currentState

    const {
      style = {},
      cardProps = {},
      sortBy = 'content',
      filter = runtime.lodash.identity,
      itemsPerRow = 3,
    } = this.props

    const cards = runtime.lodash.sortBy(menuItems.filter(filter), sortBy)

    return (
      <Card.Group itemsPerRow={itemsPerRow} style={{ margin: '24px auto', width: '95%', ...style }}>
        {cards.map((item, i) => (
          <Card {...cardProps} onClick={item.onClick} key={i}>
            <Card.Content>
              <Card.Header>
                <Icon name={item.icon} />
                {item.content}
              </Card.Header>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    )
  }
}

export default MenuItemsCardGroup
