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
  return this.runtime.resolve('app')
}

export function outputFilename() {
  return '[name].js'
}

export function externals() {
  return {
    'skypager-runtimes-electron': 'global skypager',
    axios: `commonjs2 ${this.runtime.resolve('src', 'vendor', 'axios.js')}`,
    moment: `commonjs2 ${this.runtime.resolve('src', 'vendor', 'moment.js')}`,
    react: `commonjs2 ${this.runtime.resolve('src', 'vendor', 'react.js')}`,
    'react-dom': `commonjs2 ${this.runtime.resolve('src', 'vendor', 'react-dom.js')}`,
    'react-router-dom': `commonjs2 ${this.runtime.resolve('src', 'vendor', 'react-router-dom.js')}`,
    'semantic-ui-react': `commonjs2 ${this.runtime.resolve(
      'src',
      'vendor',
      'semantic-ui-react.min.js'
    )}`,
  }
}

export function webpackPlugins() {
  return []
}
