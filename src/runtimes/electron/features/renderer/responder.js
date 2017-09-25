"use strict"

/*eslint-disable*/
var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ("value" in descriptor) descriptor.writable = true
      Object.defineProperty(target, descriptor.key, descriptor)
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps)
    if (staticProps) defineProperties(Constructor, staticProps)
    return Constructor
  }
})()

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function")
  }
}

var uuid = require("node-uuid")
var IPCResponderChannel = "electron-ipc-responder"

/**
 * <p>
 *   IPCResponder is a base class for implementing communication partners which
 *   use [Electrons]{@link http://electron.atom.io/} Inter Process Communication
 *   (IPC) facilities.
 * </p>
 * <p>
 *   With {@link IPCResponder#registerTopic} you can register a topic which can be
 *   called by the other peer. Vica versa, {@link IPCResponder#ask} and
 *   {@link IPCResponder#tell} allow to call upon such topics.
 * </p>
 *
 * @example <caption>Create IPCResponder for Host Process</caption>
 * const electron = require('electron')
 * let mainWindow = new electron.BrowserWindow()
 * const ipcMain = electron.ipcMain
 * const webContents = mainWindow.webContents
 *
 * class HostIPCResponder extends IPCResponder {
 *   constructor() {
 *     super(webContents.send.bind(webContents), ipcMain.on.bind(ipcMain))
 *
 *     this.registerTopic('hello', (payload) => Promise.resolve({
 *       text: 'hello ' + payload.name + ' too'
 *     })
 *   }
 * }
 * @example <caption>Create IPCResponder for Renderer Process</caption>
 * const ipcRenderer = window.require('electron').ipcRenderer
 *
 * class RendererIPCResponder extends IPCResponder {
 *   constructor() {
 *     super(ipcRenderer.send.bind(ipcRenderer), ipcRenderer.on.bind(ipcRenderer))
 *   }
 *
 *   sayHelloToHost(name) {
 *     return this.ask('hello', { name }).then((payload) => payload.text)
 *   }
 * }
 */

var IPCResponder = (function() {
  /**
   * Creates a new IPCResponder and sets up the communication stack.
   *
   * @param {function} send A function that allows sending an event via the IPC
   *                        infrastructure
   * @param {function} on A function that allows setting up a listener on the
   *                      IPC infrastructure
   */

  function IPCResponder(send, on) {
    var _this = this

    _classCallCheck(this, IPCResponder)

    this.send = send
    this.topicHandlers = {}
    this.awaitingResponseHandlers = {}

    on(IPCResponderChannel, function(event, envelope) {
      var topic = envelope.topic
      var id = envelope.id
      var payload = envelope.payload

      if (typeof topic === "string" && topic.length > 0 && _this.topicHandlers[topic] != null) {
        // Handle incoming request for topic:
        Promise.resolve(_this.topicHandlers[topic](payload)).then(function(responsePayload) {
          event.sender.send(IPCResponderChannel, { id: id, payload: responsePayload || {} })
        })
      } else if (typeof id === "string" && id.length > 0 && _this.awaitingResponseHandlers[id] != null) {
        // Handle a response we are waiting for:
        _this.awaitingResponseHandlers[id].resolve(payload)
        delete _this.awaitingResponseHandlers[id]
      }
    })
  }

  /**
   * Register a topic which this IPCResponder should be able to call upon. Given
   * handler function has to return a promise.
   *
   * @param {string} topic Name of the topic to register
   * @param {function} handler A handler function to register for given topic.
   *                           This will be called every time the the given
   *                           topic was called via {@link IPCResponder#ask} or
   *                           {@link IPCResponder#tell}. It has to return a
   *                           promise.
   */

  _createClass(IPCResponder, [
    {
      key: "registerTopic",
      value: function registerTopic(topic, handler) {
        this.topicHandlers[topic] = handler
      },

      /**
     * Request a response for given topic of the counterparty. The payload
     * parameter will be sent along with your request. If you want to just send a
     * message without waiting for response, see {@link IPCResponder#tell}.
     *
     * @param {string} topic Topic to request response for
     * @param {object} payload Data to send to the counterparty. This is
     *                         optional. Default is an empty object.
     * @return {promise} A promise that resolves with the payload returned from
     *                   the topic handler registered with
     *                   {@link IPCResponder#registerTopic}.
     */
    },
    {
      key: "ask",
      value: function ask(topic, payload) {
        var _this2 = this

        var id = uuid.v4()
        var timestamp = new Date()

        if (payload == null) {
          payload = {}
        }

        return new Promise(function(resolve, reject) {
          _this2.awaitingResponseHandlers[id] = { id: id, timestamp: timestamp, resolve: resolve, reject: reject }
          _this2.send(IPCResponderChannel, { id: id, topic: topic, payload: payload })
        })
      },

      /**
     * Same as {@link IPCResponder#ask}, tell allows to send a request to the
     * communication counterparty. Instead expecting a response, this is "fire and
     * forget". So the returned promise will get resolved immediately, no matter
     * what the other side returns (if it returns anything at all).
     *
     * @param {string} topic Topic to request response for
     * @param {object} payload Data to send to the counterparty. This is
     *                         optional. Default is undefined. You can pass
     *                         processResponsePayload instead of payload for a
     *                         shorter function call signature.
     * @return {promise} A promise that gets resolved immediately after the
     *                   request was sent
     */
    },
    {
      key: "tell",
      value: function tell(topic, payload) {
        var id = uuid.v4()
        this.send(IPCResponderChannel, { id: id, topic: topic, payload: payload })
        return Promise.resolve()
      },
    },
  ])

  return IPCResponder
})()

module.exports = IPCResponder
