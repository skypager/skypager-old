/**
  The IPC Helpers Feature is used to set up communication between the Skypager runtime
  that lives in electron's main process, and the Skypager runtime instances that are created
  in each of active electron renderer processes living in the browser windows.

  The feature creates a listenToIPC method on the skypager runtime.
*/
export const hostMethods = ['listenToIPC']

/**
  Additional IPC Helpers can be used by accessing the feature module at ipcUtils
*/
export const createGetter = 'ipcUtils'

export const featureMethods = ['createStream', 'createResponder', 'ask', 'tell']

/**
  The electron main runtime can "ask" any connected renderer runtime's for information about a
  particular "topic".  You can supply a "payload" of information to go along with the question.

  The renderer process can respond with a Promise

  @param {String} topic - the topic or channel that responders will be listening on
  @param {Object} payload - an object containing any relevant information the responder will need
                            to come up with an answer
  @param {Function} includeFn - A function which will be passed an instance of the browser window
                                controller and name
*/
export function ask(topic, payload = {}, includeFn) {
  const controllers = this.runtime.windowManager.chain
    .get('controllersByName')
    .pickBy(
      (controller, name) => (typeof includeFn === 'function' ? includeFn(controller, name) : true)
    )
    .values()
    .value()

  return Promise.all(
    controllers.map(w =>
      w.responder
        .ask(topic, payload)
        .then(resp => resp)
        .catch(err => ({ browserWindowId: w.id, topic, payload, error: err }))
    )
  )
}

/**
  The electron main runtime can "tell" any connected renderer runtime information about a
  particular "topic".  You can supply a "payload" of information to go along with the question.

  @param {String} topic - the topic or channel that responders will be listening on
  @param {Object} payload - an object containing any relevant information the responder will need
  @param {Function} includeFn - A function which will be passed an instance of the browser window
                                controller and name
*/
export function tell(topic, payload = {}, includeFn) {
  const controllers = this.runtime.windowManager.chain
    .get('controllersByName')
    .pickBy(
      (controller, name) => (typeof includeFn === 'function' ? includeFn(controller, name) : true)
    )
    .values()
    .value()

  return Promise.all(
    controllers.map(w =>
      w.responder
        .tell(topic, payload)
        .then(resp => resp)
        .catch(err => ({ browserWindowId: w.id, topic, payload, error: err }))
    )
  )
}

/**
The Runtime can listen on ipc channels for messages from any of the runtimes living in
the renderer process.

@param {String} topic the topic or channel to listen for messages on
@param {Function} handler the function will be called with the message payload
@param {Function} includeFn a function which can be used to specify which renderer windows
*/
export function listenToIPC(topic, handler, includeFn) {
  topic = topic || `ipc-main`
  handler = handler || this.lodash.identity

  const controllers = this.windowManager.chain
    .get('controllersByName')
    .pickBy(
      (controller, name) => (typeof includeFn === 'function' ? includeFn(controller, name) : true)
    )
    .values()
    .value()

  return controllers.map(win => {
    win.responder.registerTopic(topic, function(payload = {}) {
      return Promise.resolve(handler.call(this, { topic, payload })).catch(error => ({
        error,
        topic,
        payload,
      }))
    })
  })
}

export function createStream(options = {}) {
  const { objectMode = false, channel = 'main' } = options
  let { browserWindow } = options

  const IPCStream = require('./stream')

  if (!browserWindow) {
    throw new Error('A Browser Window must be present')
  }

  return new IPCStream(channel, browserWindow, {
    objectMode,
  })
}

export function createResponder(options = {}, context = {}) {
  const { runtime } = this
  const { ipcMain } = runtime.electron
  const IPCResponder = require('./responder')

  const { browserWindow } = options

  if (!browserWindow) {
    throw new Error('A Browser Window must be present')
  }

  if (browserWindow) {
    return new IPCResponder(
      browserWindow.webContents.send.bind(browserWindow.webContents),
      ipcMain.on.bind(ipcMain)
    )
  }
}

export function featureWasEnabled(options = {}) {}
