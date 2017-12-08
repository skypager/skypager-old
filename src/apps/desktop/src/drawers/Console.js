import { types, Component } from '../globals'
import Inspector from 'react-json-inspector'

export class Console extends Component {
  static contextTypes = {
    main: types.object,
    runtime: types.object,
  }

  async componentWillMount() {
    const { runtime } = this.context
    const { history } = this.props
    console.log('console')
    runtime.navigate = link => history.push(link)
  }

  state = {
    currentIndex: 0,
    history: [],
    current: '',
  }

  async storeHistory() {
    const { current } = this.state

    this.setState(currentState => {
      const { history = [] } = currentState

      return {
        ...currentState,
        current: '',
        currentIndex: 0,
        history: [current, ...history],
      }
    })
  }

  async runCommand() {
    const { runtime, main } = this.context
    const { history = [], currentIndex, target = 'main' } = this.state

    const current = history[currentIndex]

    const runner = src => async () => {
      try {
        const result = await Promise.resolve(src.vm.runInThisContext(current))
        return { result: result, code: current }
      } catch (error) {
        return { error, code: current }
      }
    }

    const response = await runner(target === 'main' ? main : runtime)().catch(e => ({ error: e }))

    this.setState({ error: undefined, result: undefined, ...response }, () => {
      this.refreshOutput()
    })
  }

  historyUp() {
    const { history, currentIndex = 0 } = this.state

    this.setState(
      {
        currentIndex:
          currentIndex === history.length
            ? history.length - 1
            : history.length - (currentIndex + 1),
      },
      () => {
        console.log(
          'up',
          this.state.currentIndex,
          this.state.history,
          this.state.history[this.state.currentIndex]
        )
        this.setState({
          current: this.state.history[this.state.currentIndex],
        })
      }
    )
  }

  historyDown() {
    const { currentIndex = 0 } = this.state

    this.setState(
      {
        currentIndex: currentIndex <= 0 ? 0 : currentIndex - 1,
      },
      () => {
        console.log(
          'down',
          this.state.currentIndex,
          this.state.history,
          this.state.history[this.state.currentIndex]
        )
        this.setState({
          current: this.state.history[this.state.currentIndex],
        })
      }
    )
  }

  refreshOutput() {
    //console.log('Refreshing Output', require('util').inspect(this.state))
  }

  renderResults() {
    let { error } = this.state
    const { result } = this.state

    let stringified

    try {
      stringified = typeof result === 'string' ? result : require('util').inspect(result)
    } catch (e) {
      error = e
    }

    if (error) {
      return (
        <Segment inverted>
          <Message inverted error content={error.message} />
        </Segment>
      )
    } else if (typeof stringified !== 'undefined' && stringified !== 'undefined') {
      return (
        <Segment inverted style={{ width: '80%', margin: 0, padding: 0, overflow: 'hidden' }}>
          <Inspector search={false} data={result} />
        </Segment>
      )
    }
  }

  renderCurrentInput() {
    switch (this.state.mode) {
      case 'selectors':
        return this.renderSelectorsInput()
      case 'repl':
      default:
        return this.renderReplInput()
    }
  }

  renderSelectorsInput() {
    const { runtime } = this.context

    const options = runtime.availableMainSelectors.map(s => ({ key: s, text: s, value: s }))

    return (
      <Grid style={{ width: '90%' }} as={Form} inverted>
        <Column width={4}>
          <Form.Dropdown
            options={options}
            search
            placeholder="Choose a selector"
            upward
            selection
            name="selector"
            onChange={(e, { value }) => this.setState({ selector: value })}
          />
        </Column>
        <Column width={10}>
          <Form.Input
            fluid
            transparent
            type="text"
            name="args"
            placeholder="Arguments as JSON"
            value={this.state.args}
            onChange={(e, { value }) => this.setState({ args: value })}
          />
        </Column>
      </Grid>
    )
  }

  renderReplInput() {
    return (
      <Form.Input
        type="text"
        fluid
        transparent
        focus
        className="inverted"
        error={this.state.error}
        name="current"
        actionPosition="left"
        action={{ icon: 'chevron right', color: 'black' }}
        onChange={(e, { value }) => this.setState({ current: value })}
        onKeyDown={(e, data) => {
          if (e.keyCode === 13) {
            this.storeHistory().then(() => this.runCommand())
          } else if (e.keyCode === 38) {
            this.historyUp()
          } else if (e.keyCode === 40) {
            this.historyDown()
          }
        }}
        value={this.state.current || ''}
      />
    )
  }

  render() {
    return (
      <div
        className="Console"
        style={{
          position: 'relative',
          margin: '0px auto',
          padding: 0,
          width: '99%',
          height: '100%',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 5,
            height: '80%',
            width: '100%',
            margin: 0,
            padding: 0,
            overflowX: 'hidden',
            overflowY: 'scroll',
            zIndex: 100,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 10,
              right: 20,
              height: 100,
              width: 400,
            }}
          >
            <Button.Group size="tiny" floated="right" toggle style={{ opacity: 0.1 }}>
              <Button
                content="selectors"
                inverted
                onClick={() => this.setState({ mode: 'selectors' })}
              />
              <Button content="REPL" inverted onClick={() => this.setState({ mode: 'repl' })} />
            </Button.Group>
          </div>
          {this.renderResults()}
        </div>
        <Container
          fluid
          style={{ position: 'absolute', bottom: 5, width: '100%', margin: 0, padding: 0 }}
        >
          {this.renderCurrentInput()}
        </Container>
      </div>
    )
  }
}

export default Console
