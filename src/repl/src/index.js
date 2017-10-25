import CLI from './cli'
import omit from 'lodash/omit'
import mapKeys from 'lodash/mapKeys'
import camelCase from 'lodash/camelCase'
import { join } from 'path'
import { create as createRepl } from './repl'

export { connect, server } from './repl'

const argv = require('minimist')(process.argv)

const ARGV = {
  ...(omit(argv, '_')),
  ...mapKeys(argv , (v, k) => camelCase(k) ),
}

export const cli = CLI

export const create = (options = {}, context = {}, ready) => {
  const replServer = createRepl({
    historyFile: ARGV.history || join(process.env.HOME, '.skypager-repl'),
    ...options,
    commands: {
      ...create.commands || {},
      ...options.commands || {},
    }
  }, {
    ARGV,
    ...context,
  }, ready)

  return replServer
}

const commands = create.commands = create.commands || { }

export default create

