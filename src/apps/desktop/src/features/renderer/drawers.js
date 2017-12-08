export const createGetter = 'drawers'

export const featureMethods = [
  'toggle',
  'toggleLeft',
  'toggleRight',
  'toggleBottom',
  'toggleTop',
  'setState',
  'lazyDrawersRegistry',
  'lookup',
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
  drawerVersion: 0,
}

export function featureWasEnabled() {
  this.setState(initialState)

  this.runtime.keybindings.bind('space h', () => {
    this.toggleLeft()
  })

  this.runtime.keybindings.bind('space l', () => {
    this.toggleRight()
  })

  this.runtime.keybindings.bind('space j', () => {
    this.toggleBottom()
  })

  this.runtime.keybindings.bind('space k', () => {
    this.toggleTop()
  })
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

export function lazyDrawersRegistry() {
  const ctx = require.context('../../drawers', true, /.js$/)

  const registry = this.runtime.Helper.createContextRegistry('drawers', {
    context: ctx,
    wrapper(fn) {
      return fn.default ? fn.default : fn
    },
  })

  if (module.hot) {
    module.hot.accept(ctx.id, () => {
      registry.add(require.context('../../drawers', true, /.js$/))
      this.setState({ drawerVersion: this.state.drawerVersion + 1 })
    })
  }

  return registry
}

export function lookup(drawerComponentId) {
  try {
    const Component = this.drawersRegistry.lookup(drawerComponentId)
    return Component
  } catch (error) {
    return () => (
      <div>
        <pre>{error.message}</pre>
      </div>
    )
  }
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
