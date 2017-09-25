import React, { Component } from "react"
import types from "prop-types"

export class App extends Component {
  static propTypes = {
    runtime: types.shape({
      location: types.shape({
        pathname: types.string,
        search: types.string,
        hash: types.string,
      }),
      currentRoute: types.shape({ params: types.object }),
    }),
  }

  constructor(props = {}, context = {}) {
    super(props, context)

    const { runtime } = this.props

    this.pages = createPagesRegistry(runtime)
  }

  componentWillMount() {
    const { runtime } = this.props
    const { currentRoute, location } = runtime

    this.state = { location, currentRoute }

    runtime.on("historyLocationDidChange", this.historyLocationDidChange.bind(this))
  }

  historyLocationDidChange() {
    const { runtime } = this.props
    const { currentRoute, location } = runtime

    console.log("History Location Did Change")
    this.setState({
      location,
      currentRoute,
    })
  }

  render() {
    const { runtime } = this.props

    const { todays = [], debug = false } = runtime.currentState
    const { location, currentRoute = {} } = this.state
    const { pathname } = location
    const { pattern, result } = currentRoute

    if (this.pages.available.indexOf(result) >= 0) {
      return React.createElement(this.pages.lookup(result), runtime.applyRoutePattern({ pattern, pathname }))
    } else {
      return <div>NOT FOUND</div>
    }
  }
}

export default App

function createPagesRegistry(runtime, options = {}) {
  return runtime.Helper.createContextRegistry("pages", {
    useDefaultExport: true,
    useDefaultExports: true,
    formatId: id => id.replace("/index", ""),
    context: require.context("./pages", true, /index\.js$/),
    ...options,
  })
}
