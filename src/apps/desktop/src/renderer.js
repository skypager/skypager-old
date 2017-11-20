const { PropTypes, React, ReactDOM, ReactRouterDOM, semanticUIReact } = window

Object.assign(window, semanticUIReact, {
  Col: semanticUIReact.GridCol,
  Row: semanticUIReact.GridRow,
  Column: semanticUIReact.GridCol,
  Component: React.Component,
  types: PropTypes,
  React,
  ReactDOM,
  ReactRouterDOM,
  Route: ReactRouterDOM.Route,
  Link: ReactRouterDOM.Link,
  NavLink: ReactRouterDOM.NavLink,
})

skypager.React = React
skypager.ReactDOM = ReactDOM
skypager.ReactRouterDOM = ReactRouterDOM

skypager.renderApp = Component =>
  ReactDOM.render(<Component runtime={skypager} />, document.getElementById('app'))

module.exports = skypager

require('./app.js').start()
