import skypager from 'skypager-runtimes-web'

skypager.set('framework.version', __PACKAGE__.version)
skypager.set('framework.buildStatus', __BUILD_STATUS__)

module.exports = skypager
