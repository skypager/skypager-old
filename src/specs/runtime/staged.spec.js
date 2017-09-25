//src/runtime/staged.spec.js

import { Runtime } from "runtime"

describe("Staged Starting Process", function() {
  before(function() {
    this.staged = this.staged || new Runtime({})
  })

  it("uses a middleware interface", function(done) {
    this.staged.should.have.a.property("use").that.is.a("function")
    this.staged.should.have.property("stage", "READY")

    this.staged.use(next => {
      this.staged.setState({ wow: true })
      next()
    })

    this.staged
      .start()
      .then(() => {
        this.staged.currentState.wow.should.equal(true)
      })
      .then(() => done())
      .catch(error => done(error))
  })
})
