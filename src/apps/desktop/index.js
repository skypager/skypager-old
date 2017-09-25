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
        notFoundPage: () => "skypager/NotFound",
        defaultPage: () => "Home",
        ...props
      }))

    next()
  })
  .use(function(next) {
    registerPages().then(() => next()).catch(e => {
      console.log(e)
      next(e)
    })
  })
  .use(function(next) {
    console.log("route config", routes)

    routes.forEach(routeCfg => {
      skypager.route(routeCfg.pattern, routeCfg.page)
    })

    skypager.startHistory()
    skypager.renderApp()

    skypager.on("renderVersionDidChangeState", (...args) => {
      skypager.renderApp()
    })

    console.log("ok")
    next()
  })
  .start()
  .then(() => {
    console.log("started ok")
  })
  .catch(error => {
    console.log("Error starting", error)
  })

if (module.hot) {
  module.hot.accept("./pages/index.js", () => {
    skypager.setState({ renderVersion: (renderVersion = renderVersion + 1) })
  })
}
