export async function webpackConfig(options = {}, context = {}) {
  const { runtime } = context
  const {
    cwd = runtime.cwd,
    entry = "index.js",
    outputPath = "lib",
    libraryTarget = "umd",
    filename = "[name].js",
  } = options

  return {
    context: cwd,
    entry,
    output: {
      path: outputPath,
      libraryTarget,
      filename,
    },
    plugins: [new webpack.ProvidePlugin("skypager", "skypager-runtime")],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          include: [cwd],
          use: {
            loader: "babel-loader",
            options: {
              presets: ["env"],
              plugins: [
                require("babel-plugin-transform-object-rest-spread"),
                require("babel-plugin-transform-decorators-legacy"),
                require("babel-plugin-transform-export-extensions"),
                require("babel-plugin-transform-class-properties"),
                require("babel-plugin-transform-runtime"),
              ],
            },
          },
        },
      ],
    },
  }
}
