import { runtime, Component, types, Icon, Sidebar, Menu, Segment } from '../globals'

export class SidebarLayout extends Component {
  static contextTypes = {
    main: types.object,
    runtime: types.object,
  }

  render() {
    const {
      sidebarAnimation = 'push',
      sidebarWidth = 'thin',
      visible = false,
      children,
      menuItems = [],
      sidebarProps = { icon: 'labeled' },
    } = this.props

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

        <Sidebar.Pusher style={{ height: '100%', width: '100%', overflow: 'scroll' }}>
          <div style={{ maxWidth: '85%' }}>{children}</div>
        </Sidebar.Pusher>
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
