const React = skypager.React
const routes = require("./routes.yml")
const { AppContainer } = require("react-hot-loader")
const { registerPages } = require("./pages")

skypager.setState(skypager.convertToJS(__INITIAL_STATE__))

const { Skypager } = skypager

let renderVersion = 0

const renderApp = skypager.reactRenderers.create({
  type: "dom",
  component: function(props = {}) {
    return (
      <AppContainer>
        <Skypager {...props} />
      </AppContainer>
    )
  }
})

skypager
  .use("history")
  .use("navigation")
  .use("routing")
  .use(function(next) {
    this.routing.configure(cfg => cfg.page("notFound", "NotFound").page("default", "Home"))

    skypager.renderApp = (props = {}) =>
      (global.rootEl = renderApp({
        notFoundPage: () => "NotFound",
        defaultPage: () => "Home",
        ...props
      }))

    next()
  })
  .use(function(next) {
    registerPages().then(() => next()).catch(e => next(e))
  })
  .use(function(next) {
    routes.forEach(routeCfg => {
      skypager.route(routeCfg.pattern, routeCfg.page)
    })

    skypager.startHistory()
    skypager.renderApp()

    skypager.on("renderVersionDidChangeState", (...args) => {
      skypager.renderApp()
    })

    next()
  })
  .start()
  .then(() => {})
  .catch(error => {
    console.log("Error starting", error)
  })

if (module.hot) {
  module.hot.accept("./pages/index.js", () => {
    skypager.setState({ renderVersion: (renderVersion = renderVersion + 1) })
  })
}
