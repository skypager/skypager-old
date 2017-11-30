import { Component, types } from '../globals'

export class TopMenuAppLayout extends Component {
  static contextTypes = {
    runtime: types.object,
  }

  render() {
    const { runtime } = this.context
    const { showRight, showLeft, menuItems, right, left, children } = this.props

    return (
      <Container fluid>
        <Menu attached="top" compact inverted>
          {menuItems.map((item, key) => <Menu.Item key={item.content || key} {...item} />)}
        </Menu>
        <Sidebar.Pushable>
          <Sidebar as={Segment} visible={showLeft} inverted animation="overlay" direction="left">
            <Button
              circle
              icon="bars"
              inverted
              size="mini"
              floated="right"
              onClick={() => runtime.setState({ showLeftSidebar: false })}
            />
            {left}
          </Sidebar>
          <Sidebar.Pusher>{children}</Sidebar.Pusher>
          <Sidebar
            visible={showRight}
            as={Segment}
            raised
            inverted
            animation="overlay"
            direction="right"
          >
            <Button
              circle
              icon="bars"
              inverted
              size="mini"
              onClick={() => runtime.setState({ showRightSidebar: false })}
            />
            {right}
          </Sidebar>
        </Sidebar.Pushable>
      </Container>
    )
  }
}

TopMenuAppLayout.propTypes = {
  widths: types.array,
}

export default TopMenuAppLayout
