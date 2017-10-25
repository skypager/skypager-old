export const MenuItems = ({ runtime, Link }, { router }) => {
  const nav = link => () => runtime.navigate(link)

  const { history: { location } } = router
  const { pathname: current } = location

  return [
    <Menu.Item as={Link} to="/" key="topItem">
      <Image
        size="tiny"
        src={require('assets/skypager-logo.svg')}
        style={{ marginBottom: '12px' }}
      />
    </Menu.Item>,

    <Menu.Item key="gettingStarted">
      <Menu.Header>Getting Started</Menu.Header>
      <Menu.Menu>
        <Menu.Item as={Link} to="/docs/getting-started/introduction">
          Introduction
        </Menu.Item>
        <Menu.Item as={Link} to="/docs/getting-started/usage">
          Usage
        </Menu.Item>
        <Menu.Item as="a" href="https://github.com/skypager/skypager" target="_blank">
          <Icon name="github" />
          Github
        </Menu.Item>
      </Menu.Menu>
    </Menu.Item>,

    <Menu.Item key="runtimes">
      <Menu.Header>Runtimes</Menu.Header>
      <Menu.Menu>
        <Menu.Item
          as={Link}
          to="/docs/runtimes/core"
          active={window.location.pathname === '/docs/runtimes/core'}
        >
          Core
        </Menu.Item>
        <Menu.Item as={Link} to="/docs/runtimes/development">
          Development
        </Menu.Item>
        <Menu.Item as={Link} to="/docs/runtimes/node">
          Node
        </Menu.Item>
        <Menu.Item as={Link} to="/docs/runtimes/web">
          Web
        </Menu.Item>
        <Menu.Item as={Link} to="/docs/runtimes/electron">
          Electron
        </Menu.Item>
        <Menu.Item as={Link} to="/docs/runtimes/react-native">
          React Native
        </Menu.Item>
      </Menu.Menu>
    </Menu.Item>,

    <Menu.Item key="helpers">
      <Menu.Header>Helpers</Menu.Header>
      <Menu.Menu>
        <Menu.Item>Introduction</Menu.Item>
        <Menu.Item>Client</Menu.Item>
        <Menu.Item>Command</Menu.Item>
        <Menu.Item>Document</Menu.Item>
        <Menu.Item>Document Type</Menu.Item>
        <Menu.Item>Feature</Menu.Item>
        <Menu.Item>Project</Menu.Item>
        <Menu.Item>Project Type</Menu.Item>
        <Menu.Item>REPL</Menu.Item>
        <Menu.Item>Server</Menu.Item>
        <Menu.Item>Webpack</Menu.Item>
      </Menu.Menu>
    </Menu.Item>,

    <Menu.Item key="examples">
      <Menu.Header>Examples</Menu.Header>
      <Menu.Menu>
        <Menu.Item>Creating Helpers</Menu.Item>
        <Menu.Item>Using Features</Menu.Item>
      </Menu.Menu>
    </Menu.Item>,
  ]
}

MenuItems.contextTypes = {
  router: types.object,
}

export default MenuItems
