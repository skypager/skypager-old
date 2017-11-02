export default project => {
  project.models.register('package/helper', require('./src/models/package/helper'))
  project.models.register('package/runtime', require('./src/models/package/runtime'))
  project.models.register('package/public', require('./src/models/package/public'))
  project.models.register('package/built', require('./src/models/package/built'))

  project.selectors.register('package/with-build-errors', () => chain => {
    return chain
      .invoke('model', 'package/built')
      .get('instances')
      .mapValues(pkg => {
        const stats = pkg.stats && pkg.stats()

        pkg.stats = stats

        return pkg
      })
      .pickBy(pkg => pkg.stats && pkg.stats.errors && pkg.stats.errors.length > 0)
  })

  /*
  project.compilers.register("skeleton", () => ({
    configure(options = {}) {
      return project.compiler('node', options)
        .configure(cfg => {
          return cfg
        })
    }
  }))
  */

  project.compilers.register('bundle', () => ({
    compilerWillMount(webpackConfig) {
      webpackConfig.target = 'web'
      delete webpackConfig.node
      webpackConfig.externals = []
    },

    configure(options) {
      return project.compiler('node', options).configure(c => {
        return c
          .output({
            path: project.join('packages', 'skypager'),
            libraryTarget: 'umd',
            library: 'skypager',
          })
          .entry({
            skypager: 'index.web.js',
          })
          .when(project.argv.minify, c =>
            c
              .plugin('webpack.optimize.UglifyJsPlugin', { compress: { warnings: false } })
              .output({ filename: '[name].min.js' })
          )
      }).config
    },
  }))

  project.compilers.register('library', () => ({
    configure(options) {
      return project.compiler('node', options).configure(c => {
        return c
          .output({ path: project.join('packages', 'skypager') })
          .entry(project.get('manifest.entryPoints', { index: project.join('src', 'index.js') }))
          .copy([{ from: project.join('package.json') }])
          .copy([{ from: project.join('build-status.json') }])
          .copy([{ from: project.join('sky') }])
          .copy([{ from: project.join('auto.js') }])
          .copy([{ from: project.join('node.js') }])
          .copy([{ from: project.join('project.js') }])
          .copy([{ from: project.join('development.js') }])
          .copy([{ from: project.join('react.js') }])
          .copy([{ from: project.join('web.js') }])
          .copy([{ from: project.join('universal.js') }])
          .copy([{ from: project.join('electron.js') }])
          .plugin('webpack.DefinePlugin', {
            __BUILD_STATUS__: JSON.stringify(require('./build-status.json')),
            __PACKAGE__: JSON.stringify({
              version: project.version,
              sha: project.gitInfo.sha,
              branch: project.gitInfo.branch,
            }),
          })
      }).config
    },
  }))
}
