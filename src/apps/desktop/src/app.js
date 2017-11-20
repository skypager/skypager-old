const { React, Component, types, skypager } = global

export class App extends Component {
  static childContextTypes = {
    runtime: types.object,
  }

  static propTypes = {
    runtime: types.shape({
      setState: types.func,
      currentState: types.object,
    }).isRequired,
  }

  getChildContext() {
    return {
      runtime: this.props.runtime,
    }
  }

  render() {
    return (
      <Container style={{ width: '90%', margin: '20px auto' }}>
        <Segment piled>
          <Header as="h1">Welcome</Header>
        </Segment>
      </Container>
    )
  }
}

export default App

export const start = () => skypager.renderApp(App)
