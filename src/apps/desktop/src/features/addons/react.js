import { createElement, isValidElement } from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'

export const shortcut = 'react'

export const featureMethods = [
  'asString',
  'asMarkup',
  'renderToString',
  'renderToStaticMarkup',
  'isValidElement',
  'createElement',
]

export const featureMixinOptions = {
  partial: [],
  insertOptions: false,
}

export { renderToString, renderToStaticMarkup, createElement, isValidElement }

export function asString(componentClass, props = null, children = null) {
  const Component = isValidElement(componentClass)
    ? componentClass
    : createElement(componentClass, props, children)

  return renderToString(Component)
}

export function asMarkup(componentClass, props = null, children = null) {
  const Component = isValidElement(componentClass)
    ? componentClass
    : createElement(componentClass, props)

  return renderToStaticMarkup(Component)
}
