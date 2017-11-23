import { runtime, Component, types, Icon, Sidebar, Menu, Segment } from '../globals'

export class SidebarLayout extends Component {
  static contextTypes = {
    main: types.object,
    runtime: types.object,
  }

  constructor(props = {}, context = {}) {
    super(props, context)

    this.state = {
      visible: !!props.visible,
    }
  }

  toggleSidebar = () => {
    const { runtime } = this.context
    runtime.toggleSidebar()
  }

  componentWillMount() {
    const { runtime } = this.context

    this.disposer = runtime.state.observe(({ name, newValue }) => {
      if (name === 'sidebarIsVisible') {
        this.setState({ visible: newValue })
      }
    })
  }

  componentWillUnmount() {
    this.disposer()
  }

  render() {
    const {
      sidebarAnimation = 'push',
      sidebarWidth = 'thin',
      children,
      menuItems = [],
      sidebarProps = { icon: 'labeled' },
    } = this.props

    const { visible } = this.state

    return (
      <Sidebar.Pushable as={Segment} basic>
        <Sidebar
          as={Menu}
          inverted
          vertical
          {...sidebarProps}
          width={sidebarWidth}
          animation={sidebarAnimation}
          visible={visible}
        >
          {menuItems.map((menuItem, key) => <SidebarLayout.MenuItem key={key} {...menuItem} />)}
        </Sidebar>

        <Sidebar.Pusher style={{ height: '100%' }}>{children}</Sidebar.Pusher>
      </Sidebar.Pushable>
    )
  }
}

SidebarLayout.MenuItem = ({ content, link, name, active, icon, onClick } = {}) => {
  const clickHandler =
    typeof onClick === 'function' ? onClick : link && (() => runtime.navigate(link))

  return (
    <Menu.Item active={active} onClick={clickHandler}>
      <Icon name={icon} />
      {content || runtime.stringUtils.capitalize(name)}
    </Menu.Item>
  )
}

export default SidebarLayout
