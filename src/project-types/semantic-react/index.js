const projectType = require('./lib')

module.exports = Object.assign(projectType, {
  initializer: function(next) {
    const runtime = this
    runtime.projectTypes.register('semantic-react', () => projectType)
  }
})
