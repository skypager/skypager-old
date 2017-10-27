export const markdownUtils = require('./docTypes/markdown-utils')

export function loadDocs(runtime) {
  return runtime.Helper.createContextRegistry('docFiles', {
    context: require.context('./docs', true, /\.md$/),
    formatId: id => id.replace(/\.\//, '').replace(/\.\w+$/, ''),
    wrapper: doc => markdownUtils.wrapDocument(doc, runtime.sandbox),
  })
}

export default loadDocs
