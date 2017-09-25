// prettier-ignore
(async function() {
  const w = skypager.websiteCompiler({
    publicPath: 'http://localhost:8080/',
    entry: {
      app: [
        skypager.join('src', 'website.js')
      ]
    }
  })

  //w.plugin('NoEmitOnErrorsPlugin')

  w.externalize('react', 'global skypager.React')
  w.externalize('react-dom', 'commonjs2 react-dom')

  w.rule('babel', {
    include: [ skypager.join('src') ],
    exclude: [ skypager.join('node_modules') ],
    test: [ skypager.join('src') ]
  })

  await w.prepareEventWasFired()

  const devServer = await w.createDevServer({
    stats: { colors: true }
  })

  devServer.listen(8080, "0.0.0.0", function(err) {
    if(!err) {
      print(`Server is listening on 8080`)
    }
  })
})()
