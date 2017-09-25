const React = skypager.React
const routes = require("./routes.yml")

skypager.setState(skypager.convertToJS(__INITIAL_STATE__))

const renderApp = skypager.reactRenderers.create({ type: "dom", component: skypager.Skypager })

skypager
  .use("history")
  .use("navigation")
  .use("routing")
  .use(function(next) {
    skypager.routing.configure(cfg => cfg.page("notFound", "NotFound").page("default", "Home"))

    skypager.renderApp = (props = {}) =>
      (global.rootEl = renderApp({
        notFoundPage: () => "NotFound",
        defaultPage: () => "Home",
        ...props
      }))

    next()
  })
  .use(function(next) {
    skypager.pageComponents.add(require.context("./pages", true, /index.js$/))

    routes.forEach(routeCfg => {
      skypager.route(routeCfg.pattern, routeCfg.page)
    })

    skypager.startHistory()
    skypager.renderApp()
    next()
  })
  .start()
  .then(() => {
    console.log("Skypager Started")
  })
  .catch(error => {
    console.log("Error starting", error)
  })
