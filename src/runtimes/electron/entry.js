const skypager = (global.skypager = require('skypager-runtimes-electron/main'))

skypager.hide('electronMainRoot', __dirname)

global.skypagerElectronMain = skypager

if (process.argv[0].match(/electron$/i)) {
  skypager.debug('Using skypager development runtime')
  require('skypager-runtimes-development')
  skypager.setState({ usingDevRuntime: true })
} else {
  skypager.setState({ usingDevRuntime: false })
  skypager.debug('Using skypager node runtime', { argv: process.argv })
}

module.exports = skypager
