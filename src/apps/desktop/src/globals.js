import skypager from 'skypager-runtimes-electron'
import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Link, NavLink } from 'react-router-dom'
import * as semanticUIReact from 'semantic-ui-react'

const injections = Object.assign({}, semanticUIReact, {
  Col: semanticUIReact.GridCol,
  Row: semanticUIReact.GridRow,
  Column: semanticUIReact.GridCol,
  Component: React.Component,
  types: PropTypes,
  skypager,
  runtime: skypager,
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
