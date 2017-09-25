const privateData = new WeakMap()

export class EventEmitter {
  constructor() {
    privateData.set(this, {
      events: {},
    })
  }

  get events() {
    return privateData.get(this).events
  }

  on(eventName, fn) {
    const { events } = this

    if (!events[eventName]) {
      events[eventName] = []
    }

    events[eventName].push(fn)

    return this
  }

  once(eventName, fn) {
    const self = this

    this.on(eventName, function once() {
      fn.apply(null, arguments)
      self.off(eventName, once)
    })

    return this
  }

  removeAllListeners() {
    const { events } = this

    Object.keys(events).forEach(function(eventName) {
      delete events[eventName]
    })

    return this
  }

  off(eventName, fn) {
    const { events } = this

    if (!fn) {
      delete events[eventName]
      return this
    }

    const index = events[eventName].indexOf(fn)

    if (index !== -1) {
      events[eventName].splice(index, 1)

      if (events[eventName].length === 0) {
        delete events[eventName]
      }
    }

    return this
  }

  removeListener(eventName, fn) {
    return this.off(eventName, fn)
  }

  emit(eventName, ...args) {
    const { events } = this

    if (!events[eventName]) return

    events[eventName].forEach(function(fn) {
      fn.apply(null, args)
    })
  }

  static attachTo = attachTo
  static attachEmitter = attachTo
  static attach = attachTo
}

export default EventEmitter

function hide(target, property, value, configurable = true) {
  Object.defineProperty(target, property, { value, configurable: !!configurable, enumerable: false })
  return target
}

export function attachTo(host, options = {}) {
  const emitter = new EventEmitter()

  const { configurable = true } = options

  hide(host, "emitter", emitter, configurable)
  hide(host, "on", emitter.on.bind(emitter), configurable)
  hide(host, "addListener", emitter.on.bind(emitter), configurable)
  hide(host, "once", emitter.once.bind(emitter), configurable)
  hide(host, "off", emitter.off.bind(emitter), configurable)
  hide(host, "removeAllListeners", emitter.removeAllListeners.bind(emitter), configurable)
  hide(host, "emit", emitter.emit.bind(emitter), configurable)
  hide(host, "trigger", emitter.emit.bind(emitter), configurable)

  return emitter
}

export const attachEmitter = attachTo

export const attach = attachTo
