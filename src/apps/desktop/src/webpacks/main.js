export const target = 'electron-main'

export function entry() {
  const { runtime } = this

  return {
    main: [runtime.join('src', 'main.js')],
  }
}

export function moduleLocations() {
  return [this.runtime.join('src')]
}

export function configWasGenerated(webpackConfig) {
  webpackConfig.node = {
    ...(webpackConfig.node || {}),
    dirname: false,
    filename: false,
    __filename: false,
    __dirname: false,
  }

  return webpackConfig
}

export function outputPath() {
  return this.runtime.resolve('public')
}

export function outputFilename() {
  return '[name].js'
}

export function externals() {
  return {
    'skypager-runtimes-electron': 'global skypager',
  }
}

export function webpackPlugins() {
  return []
}
