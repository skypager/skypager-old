module.exports = function(next) {
  const runtime = this

  require.ensure([], require => {
    const markdownUtils = require('./docTypes/markdown-utils')

    runtime.dataFiles = runtime.Helper.createContextRegistry('dataFiles', {
      context: require.context('./data', true, /\.(json|yml)$/),
      formatId: id => id.replace(/\.\//, '').replace(/\.\w+$/, ''),
    })

    runtime.docFiles = runtime.Helper.createContextRegistry('docFiles', {
      context: require.context('./docs', true, /\.md$/),
      formatId: id => id.replace(/\.\//, '').replace(/\.\w+$/, ''),
      wrapper: doc => markdownUtils.wrapDocument(doc),
    })

    next()
  })
}
