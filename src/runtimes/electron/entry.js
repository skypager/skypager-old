const skypager = (global.skypager = require('skypager-runtimes-electron/main'))

skypager.hide('electronMainRoot', __dirname)

global.skypagerElectronMain = skypager

if (process.argv[0].match(/electron$/i)) {
  require('skypager-runtimes-development')
}

module.exports = skypager
