/*
/*
skypager.mainCompiler = skypager
  .webpack({
    target: 'node',
    libraryTarget: 'umd'
  })

skypager.mainCompiler.define('__PACKAGE__', {  })
skypager.mainCompiler.define('__BUILD_STATUS__', {  })
*/

/*
try {
  const bsThemes = require.resolve("skypager-features-bootstrap-themes")
  skypager.features.register("bootstrap-themes", () => require(bsThemes))
  skypager.feature("bootstrap-themes").enable()
} catch (error) {
  skypager.bsError = error
}
*/

/*
skypager.websiteCompiler = (o = {}) => {
  const {
    appName = skypager.get("argv.appName", skypager.gitInfo.sha),
    app = skypager.get("argv.app", "src/website.js")
  } = o

  delete o.appName
  delete o.app

  const compiler = skypager.webpack(
    "website",
    skypager.lodash.defaults({}, o, {
      target: "web",
      cwd: skypager.cwd,
      outputPath: skypager.join("public"),
      entry: {
        [appName]: [
          //'webpack-hot-middleware/client?publicPath=/',
          app
        ]
      }
    })
  )

  compiler.rule("babel", {
    include: [skypager.join("src")],
    exclude: [skypager.join("node_modules")],
    loader: "babel-loader",
    options: { presets: ["skypager"] },
    test: [skypager.join("src"), f => f.match(/.js/)]
  })

  return compiler
}

if (skypager.isElectron) {
  const code = skypager.fsx.readFileSync(skypager.resolve(__dirname, "electron.js")).toString()
  Promise.resolve(skypager.createCodeRunner(code, { thisContext: true }, skypager.sandbox))
}

skypager.use(
	 require(skypager.resolve('packages','skypager-servers-portfolio'))
)
*/
