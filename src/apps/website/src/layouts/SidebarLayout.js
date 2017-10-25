import { Component, baseContextTypes, Icon, Sidebar, Menu, Segment } from '../globals'

export class SidebarLayout extends Component {
  static contextTypes = baseContextTypes

  static defaultProps = {
    sidebarProps: {
      inverted: true,
      vertical: true,
      icon: 'labeled',
      width: 'thin',
      animation: 'push',
    },
  }

  render() {
    const { sidebarProps = {}, visible = false, children, menuItems = [] } = this.props

    return (
      <Sidebar.Pushable as={Segment} basic>
        <Sidebar as={Menu} {...sidebarProps} visible={visible}>
          {menuItems}
        </Sidebar>

        <Sidebar.Pusher style={{ height: '100%', width: '100%', overflow: 'scroll' }}>
          {children}
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
