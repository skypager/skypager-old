const { lodash, axios, semanticUIReact, React } = window
const Component = (window.Component = window.React.Component)
const types = (window.types = window.PropTypes)

const sleep = (ms = 0) => new Promise(res => setTimeout(res, ms))

const baseContextTypes = (window.contextTypes = window.baseContextTypes = {
  runtime: types.object
})

Object.assign(window, semanticUIReact)

window.Row = semanticUIReact.Grid.Row
window.Col = window.Column = semanticUIReact.Grid.Column
const Link = (window.Link = window.ReactRouterDOM.Link)
const NavLink = (window.NavLink = window.ReactRouterDOM.NavLink)
const runtime = (window.runtime = window.runtime || require('./runtime'))

module.exports = {
  Component,
  axios,
  types,
  skypager: runtime,
  runtime,
  React,
  Link,
  NavLink,
  Column: window.Column,
  Row: window.Row,
  Col: window.Col,
  semanticUIReact,
  baseContextTypes,
  sleep,
  lodash,
  ...semanticUIReact
}
