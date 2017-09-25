import * as propTypes from "prop-types"
import React from "react"
import mobxReact from "mobx-react"
import Skypager, { pages as pageComponents } from "../../Skypager.js"

const { Component, isValidElement, createElement } = React

export const hostMethods = ["getReactRenderers"]

export function featureWasEnabled() {
  skypager.hide("React", React)
  skypager.hide("reactPropTypes", propTypes.PropTypes)
  skypager.hide("mobxReact", mobxReact)
  skypager.hide("Skypager", Skypager)
  skypager.hide("pageComponents", pageComponents)

  skypager.React.createElement = createElement
  skypager.React.isValidElement = isValidElement
  skypager.React.Component = Component
}

export const getReactRenderers = (options = {}, { runtime: skypager } = {}) => ({
  get universal() {
    return skypager.feature("react/universal")
  },

  get dom() {
    return skypager.isBrowser || skypager.isElectronRenderer ? skypager.feature("react/dom") : false
  },

  create(options = {}) {
    if (typeof options === "string") {
      options = { type: options }
    }

    const isDOM = !!(skypager.isBrowser && skypager.get("reactRenderers.dom"))
    const { component = Skypager, type = isDOM ? "dom" : "markup" } = options

    return type === "dom"
      ? skypager.reactRenderers.dom.domRenderer(
          { component, ...options },
          { ...skypager.context, ...skypager.pick("React", "ReactDOM") }
        )
      : skypager.reactRenderers.universal[type === "string" ? "stringRenderer" : "markupRenderer"](
          { component, ...options },
          { ...skypager.context, ...skypager.pick("React", "ReactDOM") }
        )
  }
})
