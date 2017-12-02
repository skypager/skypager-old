import { Component, types } from '../globals'

export class TopMenuAppLayout extends Component {
  static contextTypes = {
    runtime: types.object,
  }

  constructor(props = {}, context = {}) {
    super(props, context)

    this.state = {
      showTop: !!props.showTop,
    }
  }

  componentWillMount() {
    const { runtime } = this.context

    if (!runtime.layouts) {
      runtime.use('layouts')
    }

    this.disposer = runtime.layouts.state.observe(({ name, newValue }) => {
      this.setState({ [name]: newValue })
    })
  }

  componentWillUnmount() {
    this.disposer()
  }

  render() {
    const { children, menuItems } = this.props
    const { showTop } = this.state

    return (
      <Container fluid>
        {!!showTop && (
          <Menu attached="top" compact inverted>
            {menuItems.map((item, key) => <Menu.Item key={item.content || key} {...item} />)}
          </Menu>
        )}
        <Container fluid>{children}</Container>
      </Container>
    )
  }
}

TopMenuAppLayout.propTypes = {
  widths: types.array,
}

export default TopMenuAppLayout
