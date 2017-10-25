import { dirname } from 'path'
import isFunction from 'lodash/isFunction'

export default function (repl, options) {
  repl.commands['reload'] = {
    help: 'Clears the require cache',
    // eslint-disable-next-line
    action: function() {
      const reloadFilter = options.reloadFilter || ((key) => key.startsWith(dirname(process.cwd())))
      const cacheEntries = Object.keys(require.cache).filter(reloadFilter)

      if (isFunction(options.willReload)) {
        options.willReload(cacheEntries)
      }

      cacheEntries.forEach(moduleId => delete(require.cache[moduleId]))

      repl.commands.clear.action.call(repl)

      if (options.clearAfterReload !== false) {
        repl.commands.cls.action.call(repl)
      }

      if (isFunction(options.didReload)) {
        options.didReload(Object.keys(require.cache).filter(reloadFilter), Object.keys(require.cache), cacheEntries)
      }

      this.displayPrompt()
    },
  }
}
