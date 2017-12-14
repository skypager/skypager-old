const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  willPrepare: async function() {
    await skypager.proc.async.exec(
      `${process.env.HOME}/Skypager/node_modules/.bin/sky run export-tree`
    )
    return true
  },
  standardConfig: function() {
    return {
      entry: {
        index: skypager.join('src/index.js'),
      },
      target: 'node',
      devtool: 'cheap-module-eval',
      context: this.runtime.cwd,
      output: {
        path: this.runtime.join('lib'),
        libraryTarget: 'umd',
        filename: '[name].js',
      },
      node: {
        __dirname: false,
        __filename: false,
        dirname: false,
        filename: false,
      },
      plugins: [
        new CopyWebpackPlugin([
          {
            from: this.runtime.join('src', 'tree.json'),
          },
          {
            from: this.runtime.join('files'),
            to: this.runtime.join('lib', 'files'),
            flatten: false,
          },
        ]),
      ],
    }
  },
}
