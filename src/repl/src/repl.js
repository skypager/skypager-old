import 'colors'

import { start } from 'repl'
import { join, resolve } from 'path'
import isFunction from 'lodash/isFunction'
import defaults from 'lodash/defaults'
import camelCase from 'lodash/camelCase'
import castArray from 'lodash/castArray'
import mapKeys from 'lodash/mapKeys'
import omit from 'lodash/omit'
import { unlinkSync as unlink, existsSync as exists } from 'fs'
import promisify from './extensions/promise'
import setupHistory from './extensions/history'
import reloading from './extensions/reloading'
import {cli} from './cli'
import {createServer, connect as netConnect} from 'net'

const { keys, defineProperty, assign } = Object

let argv = require('minimist')(process.argv.slice(2))

argv = assign(argv, mapKeys(omit(argv,'_'), (v, k) => camelCase(k)))

/**
 * Creates the instance of the REPL server
 *
 * @param {Object} options - options for the REPL. Same as node's REPL with some additional options
 * @param {Object} context - context to start the repl with
 * @param {Function} ready - a function to run when the repl is ready
 *
 * The following hooks can be passed in as options
 *
 * before
 * beforeHook
 * after
 * afterHook
 * beforeInitialize
 * beforeInitializeHook
 * afterInitialize
 * afterInitializeHook
 * onReset
 *
 * Additionally, a `customize` property can be passed which references a script which is can be required
 * and if it exports any of the above as functions, those values will be used.  In addition, the customize script
 * can export properties such as `prompt` which are used in place of the REPL options.
 */
export function create (options = {}, context = {}, ready) {
  if (argv.es6 !== false) { require('babel-register') }

  let customize = options.customize || process.env.SKYPAGER_REPL_CUSTOMIZER || (exists(join(process.cwd(), '.skypager-repl.js')) && '.skypager-repl.js')

  if (typeof customize === 'string') {
    customize = require(resolve(process.cwd(), customize))
  }

  if (Object.keys(customize).length === 1 && isFunction(customize.default)) {
    customize = customize.default
  }

  options = defaults(options, {
    terminal: true,
    colors: true,
    ignoreUndefined: true,
    prompt: customize.prompt || prompt,
    banner: customize.banner || banner,
    help: customize.help || help,
    input: process.stdin,
    output: process.stdout,
    useGlobal: false,
    buildContext: customize.buildContext,
    before: customize.before,
    after: customize.after || (isFunction(customize) && customize),
    afterInitialize: customize.afterInitialize,
    beforeInitialize: customize.beforeInitialize,
    onReset: customize.onReset,
    evalFn: customize.evalFn,
    promisify: argv.promisify,
    commands: {},
  })

  if (isFunction(options.prompt)) {
    options.prompt = options.prompt(cli)
  }

  if (isFunction(options.beforeHook)) {
    options.beforeHook(cli, options, context)
  }

  if (options.before) {
    let before = options.before

    if (typeof before === 'string') {
      before = require(resolve(process.cwd(), before))
      before = before.default ? before.default : before
    }

    if (isFunction(before)) {
      before(cli, options, context)
    }
  }

  let server = start(options)

  Object.defineProperty(server, '_sockets', {
    enumerable: false,
    value: [],
  })


  Object.defineProperty(server, 'cli', {
    enumerable: false,
    get: () => cli,
  })

  server.commands['cls'] = {
    help: 'Clears the screen',
    // eslint-disable-next-line
    action: function() {
      process.stdout.write('\x1bc')
      this.displayPrompt()
    },
  }

  if (!isFunction(ready)) {
    ready = function() {}
  }

  if (options.historyFile) {
    const historyFilePath = resolve(options.historyFile)
    server = setupHistory(server, historyFilePath)
  }

  reloading(server, options)

  const initializeContext = () => {
    server.context.SKYPAGER_REPL = server

    if (isFunction(options.buildContext)) {
      try {
        context = options.buildContext.call(this, context, options, this) || context
      } catch(e) {

      }
    }

    keys(context).forEach(key => {
      defineProperty(server.context, key, {
        configurable: true,
        enumerable: true,
        // eslint-disable-next-line
        get: function() {
          return context[key]
        },
      })
    })

    if (isFunction(options.after)) {
      options.after(server, options, server.context)
    }

    if (isFunction(options.afterHook)) {
      options.afterHook(server, options, server.context)
    }
  }

  server.on('reset', () => {
    if (isFunction(options.onReset)) {
      options.onReset(server, options, server.context)
    }

    initializeContext()
  })

  try {
    if (options.clear !== false) {
      cli.clear()
    }

    if (options.banner) {
      cli.print( isFunction(options.banner)
         ? options.banner(cli, options, server)
         : options.banner
      , 2, 2)
    }

    if (options.help) {
      cli.print( isFunction(options.help)
         ? options.help(cli, options, server)
         : options.help
      )
    }

    if (options.promisify !== false) {
      if (isFunction(options.evalFn)) {
        promisify(server, options.evalFn.bind(server))
      } else {
        promisify(server)
      }
    }

    // can be hardcoded by the consumer of the repl library
    if (isFunction(options.beforeInitializeHook)) {
      options.beforeInitializeHook(server, options, context)
    }

    // allow local project customization
    if (isFunction(options.beforeInitialize)) {
      options.beforeInitialize(server, options, context)
    }

    initializeContext()

    // can be hardcoded by the consumer of the repl library
    if (isFunction(options.afterInitializeHook)) {
      options.afterInitializeHook(server, options, server.context)
    }

    // allow local project customization
    if (isFunction(options.afterInitialize)) {
      options.afterInitialize(server, options, server.context)
    }

  } catch (error) {
    ready(error)
    return
  }

  ready(null, server)

  if (options.delayPrompt !== false) {
    setTimeout(() => { server.displayPrompt() }, 300)
  }

  return server
}

export default create

export const help = (cli) => {
  cli.defineTable('commands', {
    head: [
      'Command',
      'Description',
    ],
    colWidths: [30, 60],
  })

  cli.print('Commands'.bold.underline, 2, 2, 2)
  cli.displayTable('commands', [
    ['cls', 'Clear the console'], ['reload', 'Clear the require cache and reset the repl context'],
  ])

  cli.print("\n")
}

export const prompt = (cli) => ([
    cli.colors.blue(`Sky`),
    cli.colors.cyan('pag'),
    cli.colors.green('er'),
    cli.colors.dim(':'),
    cli.colors.bold.white('REPL'),
    cli.colors.dim(':> '),
  ].join(''))

export const banner = (cli) => (
  cli.figlet.textSync('Skypager', {
    font: cli.random.font,
  }).split("\n").map(line => cli.random.color(line)).join("\n")
)

export function server(options = {}, context = {}, fn) {
  const instance = createServer((socket) => {
    const replServer = create({
      delayPrompt: false,
      input: socket,
      output: socket,
      clear: true,
      help: (cli) => {
        cli.print(`Skypager Console is running in server mode`, 0, 2, 2)
      }, 
      ...options,
    }, context, fn)

    replServer._sockets.push(socket)

    replServer.on('exit', () => socket.end())

    Object.defineProperty(replServer, 'server', {
      enumerable: false,
      configurable: true,
      get: () => instance,
    })

    Object.defineProperty(instance, 'repl', {
      enumerable: false,
      configurable: true,
      get: () => replServer,
    })   

    instance.stop = function() {
      replServer._sockets.forEach(sock => sock.end())
    }
  })

  instance._listen = instance.listen

  instance.listen = function(socketOrPort = argv._[0], ...args) {
    const deleteSocketOnStart = argv.deleteSocket || argv['delete-socket']

    socketOrPort = socketOrPort || '.repl.sock'

    if (socketOrPort.match(/\.sock$/) && exists(socketOrPort)) {
      unlink(socketOrPort)
    }

    let result = instance._listen(socketOrPort, ...args)

    return result
  }

  return instance 
}

export function connect(...args) {
  const sock = netConnect(...args)

  process.stdin.pipe(sock)
  sock.pipe(process.stdout)

  sock.on('connect', () => {
    process.stdin.resume()
    process.stdin.setRawMode(true)
  })

  sock.on('close', function done() {
    sock.removeListener('close', done)
    process.exit(0)
  })

  process.stdin.on('end', () => {
    process.stdin.setRawMode('false')
    process.stdin.pause()
    sock.destroy()
    console.log()
  })

  process.stdin.on('data', (b) => {
    if (b.length === 1 && b[0] === 4) {
      process.stdin.emit('end')
    }
  })

  return sock
}
