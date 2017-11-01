/* prettier-disable */

async function dev() {
  const { print } = skypager.cli

  const port = skypager.get('argv.port', 3000)
  const host =
    skypager.get('argv.host', skypager.get('argv.hostname')) || '0.0.0.0'

  const compiler = await skypager.compiler('dev')

  if (!compiler.isConfigValid) {
    print('Compiler configuration is invalid', 4)
    print(compiler.configValidationMessages, 8)
  }

  const devServer = await compiler.createDevServer({
    historyApiFallback: true,
    noInfo: false,
    hot: !!skypager.argv.hot,
    contentBase: skypager.join('public'),
    port,
    host,
    publicPath: compiler.publicPath || '/',
    stats: { colors: true, minimal: true },
    quiet: false
  })

  devServer.listen(port, host, err => {
    !err && print(`Dev Server is listening on http://${host}:${port}`)
  })
}

dev()
