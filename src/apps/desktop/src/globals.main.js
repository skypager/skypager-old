import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Route, Link, NavLink } from 'react-router-dom'
import * as semanticUIReact from 'semantic-ui-react'

if (typeof skypager === 'undefined') {
  const skypager = (global.skypager = __non_webpack_require__(
    'node_modules/skypager-runtimes-electron/renderer.js'
  ))
}

const injections = Object.assign({}, semanticUIReact, {
  Col: semanticUIReact.GridColumn,
  Row: semanticUIReact.GridRow,
  Column: semanticUIReact.GridColumn,
  Component: React.Component,
  Inspect: (props = {}) => {
    return <pre>{JSON.stringify(props, null, 2)}</pre>
  },
  types: PropTypes,
  skypager,
  runtime: skypager,
  mainRuntime: skypager.electronMain,
  lodash: skypager.lodash,
  React,
  ReactDOM,
  ReactRouterDOM,
  Route,
  Link,
  NavLink,
})

skypager.React = React
skypager.ReactDOM = ReactDOM
skypager.ReactRouterDOM = ReactRouterDOM

Object.assign(window, injections)

module.exports = injections
