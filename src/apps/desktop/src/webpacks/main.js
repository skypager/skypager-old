export const target = 'electron-main'

export function entry() {
  const { runtime } = this

  return {
    main: [runtime.join('src', 'main.js')],
  }
}

export function outputPath() {
  return this.runtime.resolve('app')
}

export function outputFilename() {
  return '[name].js'
}

export function webpackPlugins() {
  return {
    ProvidePlugin: {
      skypager: 'skypager-runtimes-electron/main.js',
    },
  }
}
