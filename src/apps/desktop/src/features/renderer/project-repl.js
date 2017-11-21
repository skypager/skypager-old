import { Writable, Readable } from 'stream'
export const createGetter = 'projectRepl'

export const featureMethods = ['lazyInput', 'lazyOutput', 'launch']

export function launch(options = {}) {
  return this.interactive.launch(options)
}

export function lazyInput() {
  return this.runtime.ipcUtils.createStream()
}

export function lazyOutput() {
  return this.runtime.ipcUtils.createStream({
    channel: `project-repl-output-${runtime.browserWindow.id}`,
  })
}

export function featureWasEnabled() {
  const { runtime } = this

  this.lazy('interactive', () =>
    runtime.electronMain.repl('interactive', {
      terminal: false,
      input: this.input,
      output: this.output,
      colors: false,
    })
  )
}
