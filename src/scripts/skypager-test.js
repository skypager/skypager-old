const skypage = require(skypager.resolve('packages', 'skypage')).default
runtime.use(skypage, 'INITIALIZING')

async function loadTree() {
  const tree = await skypager.select('files/asts', {
    rootNode: 'src/docs',
    include: [/.md/],
    exclude: [/LICENSE/],
    hash: true,
  })

  skypager.lodash.mapValues(tree, (doc, docId) => {
    if (docId.match(/LICENSE/)) {
      return
    }

    skypager.documents.register(
      docId
        .replace('src/docs/', '')
        .replace(/\.md$/, '')
        .replace(/\/index$/, ''),
      () => doc
    )
  })
}
