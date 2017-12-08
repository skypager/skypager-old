export const createGetter = 'layouts'

export const featureMethods = [
  'toggle',
  'toggleLeft',
  'toggleRight',
  'toggleBottom',
  'toggleTop',
  'setState',
]

export const featureMixinOptions = {
  injectOptions: false,
  partial: [],
}

export const initialState = {
  showLeft: false,
  showRight: false,
  showTop: false,
  showBottom: false,
}

export function featureWasEnabled() {
  this.setState(initialState)
}

export function observables() {
  const { runtime } = this
  const { mapValues } = this.lodash

  return {
    currentState: [
      'computed',
      function() {
        return mapValues(this.state.toJSON, v => runtime.convertToJS(v))
      },
    ],
  }
}

export function setState(merge = {}) {
  const { isFunction } = this.lodash

  if (isFunction(merge)) {
    this.state.merge(merge.call(this, this.currentState))
  } else {
    this.state.merge(merge)
  }

  return this
}

export function toggle(direction, desiredState) {
  const { isBoolean } = this.lodash

  switch (direction) {
    case 'right':
      this.state.set(
        'showRight',
        isBoolean(desiredState) ? desiredState : !this.state.get('showRight')
      )
      break
    case 'left':
      this.state.set(
        'showLeft',
        isBoolean(desiredState) ? desiredState : !this.state.get('showLeft')
      )
      break
    case 'top':
      this.state.set('showTop', isBoolean(desiredState) ? desiredState : !this.state.get('showTop'))
      break
    case 'bottom':
    default:
      this.state.set(
        'showBottom',
        isBoolean(desiredState) ? desiredState : !this.state.get('showBottom')
      )
      break
  }

  return this
}

export function toggleRight(desiredState) {
  this.toggle('right', desiredState)
  return this
}

export function toggleLeft(desiredState) {
  this.toggle('left', desiredState)
  return this
}

export function toggleTop(desiredState) {
  this.toggle('top', desiredState)
  return this
}

export function toggleBottom(desiredState) {
  this.toggle('bottom', desiredState)
  return this
}
