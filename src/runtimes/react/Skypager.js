import React, { Component } from "react"
import types from "prop-types"

const runtime = require("./index")

export const pages = createPagesRegistry(runtime)

export class Skypager extends Component {
  static propTypes = {
    runtime: types.shape({
      location: types.shape({
        pathname: types.string,
        search: types.string,
        hash: types.string
      }),

      currentRoute: types.shape({ params: types.object }),

      currentState: types.object,

      setState: types.func,

      state: types.shape({
        set: types.func,
        get: types.func
      })
    }),

    defaultPage: types.func,
    notFoundPage: types.func
  }

  static defaultProps = {
    defaultPage: () =>
      runtime.get(
        "routing.config.pages.default",
        runtime.get("options.defaultPage", "skypager/DefaultPage")
      ),
    notFoundPage: () =>
      runtime.get(
        "routing.config.pages.notFound",
        runtime.get("options.notFoundPage", "skypager/NotFound")
      ),
    runtime,
    pages
  }

  static childContextTypes = {
    runtime: types.shape({
      location: types.shape({
        pathname: types.string,
        search: types.string,
        hash: types.string
      }),
      currentRoute: types.shape({ params: types.object }),

      currentState: types.object,

      setState: types.func,

      state: types.shape({
        set: types.func,
        get: types.func
      })
    })
  }

  state = {}

  getChildContext() {
    return {
      runtime: this.props.runtime,
      location: this.state.location,
      currentRoute: this.state.currentRoute
    }
  }

  constructor(props = {}, context = {}) {
    super(props, context)

    runtime.rootComponent = this
  }

  componentWillMount() {
    const { runtime } = this.props
    const { currentRoute, location } = runtime

    this.state = { location, currentRoute }

    runtime.on("historyLocationDidChange", this.historyLocationDidChange.bind(this))

    runtime.on("change", function(_, currentState) {})
  }

  historyLocationDidChange() {
    const { runtime } = this.props
    const { currentRoute, location } = runtime

    runtime.state.set("currentRoute", currentRoute)
    runtime.state.set("location", location)

    this.setState({
      location,
      currentRoute
    })
  }

  get availablePageIds() {
    return this.props.pages.available
  }

  renderNotFound() {
    const { runtime } = this.props

    const {
      defaultPage = () => runtime.get("routing.config.pages.default", "skypager/DefaultPage"),
      notFoundPage = () => runtime.get("routing.config.pages.notFound", "skypager/NotFound")
    } = this.props

    const { Provider } = runtime.mobxReact // eslint-disable-line
    const { location = {}, currentRoute = {} } = this.state
    const { pathname = "/" } = location
    const { pattern } = currentRoute
    const { availablePageIds = [] } = this

    let notFoundPageId = notFoundPage()
    let defaultPageId = defaultPage()

    notFoundPageId = notFoundPageId.pageId ? notFoundPageId : notFoundPageId.toString()
    defaultPageId = defaultPageId.pageId ? defaultPageId : defaultPageId.toString()

    try {
    } catch (error) {}

    if (availablePageIds.length === 0) {
      return <div>Not found</div>
    } else if (availablePageIds.indexOf(notFoundPageId) > -1) {
      const pageProps = runtime.applyRoutePattern({ pattern, pathname })
      const page = React.createElement(this.props.pages.lookup(notFoundPageId), pageProps)
      return page
    } else if (availablePageIds.indexOf(defaultPageId) > -1) {
      const pageProps = runtime.applyRoutePattern({ pattern, pathname })
      const page = React.createElement(this.props.pages.lookup(defaultPageId), pageProps)
      return page
    } else {
      console.log("Missing valid Found Page", notFoundPageId, defaultPageId)
      return <div>Not Found</div>
    }
  }

  renderCurrentPage() {
    const { runtime } = this.props
    const { Provider } = runtime.mobxReact // eslint-disable-line
    const { location = {}, currentRoute = {} } = this.state
    const { pathname = "/" } = location
    const { pattern, result } = currentRoute
    const { availablePageIds = [] } = this

    if (!result || result === "NotFound" || availablePageIds.indexOf(result) === -1) {
      return this.renderNotFound()
    } else if (availablePageIds.indexOf(result) >= 0) {
      const pageProps = runtime.applyRoutePattern({ pattern, pathname })
      return React.createElement(this.props.pages.lookup(result), pageProps)
    } else {
      return this.renderNotFound()
    }
  }

  get hasLayout() {
    return typeof this.props.Layout !== "undefined"
  }

  renderCurrentPageWithLayout() {
    const { Layout, layoutProps = {} } = this.props // eslint-disable-line
    return <Layout {...layoutProps}>{this.renderCurrentPage()}</Layout>
  }

  render() {
    const { runtime } = this.props
    const { Provider } = runtime.mobxReact // eslint-disable-line

    return (
      <Provider runtime={runtime} runtimeState={runtime.state}>
        {this.hasLayout ? this.renderCurrentPageWithLayout() : this.renderCurrentPage()}
      </Provider>
    )
  }
}

export default Skypager

function createPagesRegistry(runtime, options = {}) {
  if (runtime.pagesRegistry) {
    return runtime.pagesRegistry
  }

  const pagesRegistry = runtime.Helper.createContextRegistry("pages", {
    useDefaultExport: true,
    useDefaultExports: true,
    formatId: id => id.replace("/index", ""),
    context: require.context("./pages", true, /.*\/index.js$/),
    ...options
  })

  runtime.hide("pagesRegistry", pagesRegistry)

  return pagesRegistry
}
