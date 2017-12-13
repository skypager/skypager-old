/* prettier-disable */

async function dev() {
  const { print } = skypager.cli

  const port = skypager.get('argv.port', 3000)
  const host = skypager.get('argv.host', skypager.get('argv.hostname')) || '0.0.0.0'

  const compiler = await skypager.compiler('dev', {
    moduleLocations: [skypager.join('src'), 'node_modules'],
    aliases: {
      'pages/PortfolioManager': skypager.resolve('src/pages/PortfolioManager/PortfolioManager.js'),
      'pages/LoginPage': skypager.resolve('src/pages/LoginPage/LoginPage.js'),
      'pages/ViewCarrierBook': skypager.resolve('src/pages/ViewCarrierBook/ViewCarrierBook.js'),
      'pages/ViewCarrierPolicy': skypager.resolve('src/pages/ViewCarrierPolicy/ViewCarrierPolicy.js'),
      'pages/ViewPortfolioPolicy': skypager.resolve('src/pages/ViewPortfolioPolicy/ViewPortfolioPolicy.js'),
    }
  })

  if (!compiler.isConfigValid) {
    print('Compiler configuration is invalid', 4)
    print(compiler.configValidationMessages, 8)
  }

  const devServer = await compiler.createDevServer({
    historyApiFallback: true,
    noInfo: false,
    hot: true,
    contentBase: skypager.join('public'),
    port,
    host,
    publicPath: compiler.publicPath || '/',
    stats: { colors: true, minimal: true },
    quiet: false,
  })

  devServer.listen(port, host, err => {
    !err && print(`Dev Server is listening on http://${host}:${port}`)
  })
}

dev()
