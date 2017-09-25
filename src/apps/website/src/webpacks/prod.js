const { dirname } = require("path")

export function entry() {
  return {
    app: [this.runtime.join("src/index.web.js")]
  }
}

export function outputPath() {
  return this.runtime.join("public")
}

export function rules() {
  const { compact } = this.lodash

  return [
    {
      name: "babel",
      test: /.js$/,
      include: [this.runtime.join("src")],
      exclude: [
        this.runtime.join("node_modules"),
        dirname(this.runtime.packageFinder.attemptResolve("skypager")),
        this.runtime.join("src", "templates"),
        dirname(
          dirname(this.runtime.resolve(this.runtime.packageFinder.attemptResolve("skypager")))
        )
      ],
      use: compact([
        {
          loader: "babel-loader",
          options: {
            babelrc: false,
            ...babelConfig.call(this)
          }
        }
      ]).filter(v => v)
    },
    {
      name: "assets",
      test: /.(png|jpg|gif)$/,
      include: [this.runtime.join("src")],
      exclude: [
        this.runtime.join("node_modules"),
        dirname(this.runtime.packageFinder.attemptResolve("skypager"))
      ],
      use: [{ loader: "url-loader" }]
    }
  ]
}

export function webpackPlugins() {
  return this.runtime.convertToJS({
    "html-webpack-plugin": {
      template: "src/templates/html.js",
      skypager: this.runtime,
      runtime: this.runtime,
      inject: true,
      filename: "index.html"
    },
    "copy-webpack-plugin": [
      {
        from: this.runtime.packageFinder.attemptResolve("skypager-runtimes-react/skypager-react.js")
      },
      {
        from: this.runtime.packageFinder.attemptResolve(
          "skypager-runtimes-react/skypager-react.min.js"
        )
      }
    ]
  })
}

export function babelConfig() {
  const { runtime } = this
  const { packageFinder } = runtime
  const { isString, isArray } = this.lodash

  const validate = items =>
    items
      .filter(item => (isArray(item) && isString(item[0])) || isString(item))
      .filter(i => i && i.length)

  return {
    presets: validate([
      [
        packageFinder.attemptResolve("babel-preset-env"),
        {
          targets: {
            node: ["7.0.0"],
            browsers: [">5%"]
          }
        }
      ],
      packageFinder.attemptResolve("babel-preset-stage-0"),
      packageFinder.attemptResolve("babel-preset-react")
    ]),
    plugins: validate([
      packageFinder.attemptResolve("babel-plugin-transform-decorators-legacy"),
      packageFinder.attemptResolve("babel-plugin-transform-object-rest-spread")
    ])
  }
}
