const { axios, semanticUIReact, React } = window
const Component = (window.Component = window.React.Component)
const types = (window.types = window.PropTypes)

const baseContextTypes = (window.contextTypes = window.baseContextTypes = {
  runtime: types.object,
})

Object.assign(window, semanticUIReact)

window.Row = semanticUIReact.Grid.Row
window.Col = window.Column = semanticUIReact.Grid.Column

const runtime = (window.runtime = window.runtime || require('./runtime'))

module.exports = runtime.lodash.defaults(window, {
  Component,
  axios,
  types,
  moment: window.moment,
  TODAY: (window.TODAY = window.moment().format('YYYYMMDD')),
  skypager: runtime,
  runtime,
  React,
  Column: window.Column,
  Row: window.Row,
  semanticUIReact,
  baseContextTypes,
  contextTypes: baseContextTypes,
  ...semanticUIReact,
})
