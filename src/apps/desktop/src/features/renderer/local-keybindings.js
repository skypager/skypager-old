import Mousetrap from '../../static/mousetrap.js'

export const createGetter = 'keybindings'

export const featureMethods = ['bind', 'unbind', 'mousetrap']

export function featureWasEnabled() {}

export const mousetrap = Mousetrap

export function bind(...args) {
  return Mousetrap.bind(...args)
}

export function unbind(...args) {
  return Mousetrap.unbind(...args)
}

export const featureMixinOptions = {
  insertOptions: false,
  partial: [],
}
