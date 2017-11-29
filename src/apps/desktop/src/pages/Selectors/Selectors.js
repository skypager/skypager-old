import { types, Component } from '../../globals'
import Inspector from 'react-json-inspector'

export class Selectors extends Component {
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
        <Segment>
          <Message error content={error.message} />
        </Segment>
      )
    } else if (typeof stringified !== 'undefined' && stringified !== 'undefined') {
      return (
        <Segment>
          <Inspector data={result} />
        </Segment>
      )
    }
  }

  render() {
    return (
      <Segment basic>
        <Segment>
          <Form.Input
            type="text"
            fluid
            error={this.state.error}
            name="current"
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
        </Segment>
        {this.renderResults()}
      </Segment>
    )
  }
}

export default Selectors
