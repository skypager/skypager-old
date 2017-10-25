#!/usr/bin/env node -r babel-register

const webpack = require('webpack')
const config = require('./webpack.config.babel.js')
const nodemon = require('nodemon')

const cfg = config(process.env.NODE_ENV, { target: 'node' })

cfg.plugins.push(
  new webpack.HotModuleReplacementPlugin({
    quiet: true,
  })
)

const compiler = webpack(cfg)

let running = false

compiler.watch(100, () => {
  if (!running) {
    nodemon({
      execMap: {
        'js': 'node',
      },
      script: `${compiler.outputPath}/runner.js`,
      ignore: ['*'],
      watch: ['foo/'],
      ext: 'noop',
    })

    running = true
  }

  nodemon.restart()
})
