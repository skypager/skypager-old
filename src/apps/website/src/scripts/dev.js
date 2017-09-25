/* prettier-disable */

async function dev() {
  const { print } = skypager.cli

  const port = skypager.get("argv.port", 3000)
  const host = skypager.get("argv.host", skypager.get("argv.hostname")) || "0.0.0.0"

  const compiler = await skypager.compiler("dev", {
    entry: {
      app: [
        "react-hot-loader/patch",
        `webpack-dev-server/client?http://${host}:${port}`,
        "webpack/hot/only-dev-server",
        skypager.join("src", "index.web.js")
      ]
    }
  })

  if (!compiler.isConfigValid) {
    print("Compiler configuration is invalid", 4)
    print(compiler.configValidationMessages, 8)
  }

  const devServer = await compiler.createDevServer({
    historyApiFallback: true,
    noInfo: false,
    hot: true,
    contentBase: skypager.join("public"),
    port,
    host,
    publicPath: compiler.publicPath || "/",
    stats: { colors: true, minimal: true },
    quiet: true
  })

  devServer.listen(port, host, err => {
    !err && print(`Dev Server is listening on http://${host}:${port}`)
  })
}

dev()
