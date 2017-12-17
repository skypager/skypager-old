const projectType = require('./lib')

module.exports = Object.assign(projectType, {
  version: '39.4.0',
  initializer: function(next) {
    const runtime = this
    runtime.projectTypes.register('semantic-react', () => projectType)
  }
})
