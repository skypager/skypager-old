//src/runtime/staged-startup.spec.js

import sinon from "sinon"
import sinonChai from "sinon-chai"
import chai from "chai"
import { Runtime } from "runtime"

chai.should()
chai.use(sinonChai)

describe("Runtime Startup Sequence", function() {
  before(function() {
    const initSpy = (this.initSpy = sinon.spy())
    const prepareSpy = (this.prepareSpy = sinon.spy())
    const startSpy = (this.startSpy = sinon.spy())

    class MyRuntime extends Runtime {
      autoInitialize = true

      autoPrepare = true

      initialize() {
        initSpy()
      }

      async prepare() {
        prepareSpy()
        return this
      }

      async start() {
        startSpy()
        return this
      }
    }

    this.runtime = new MyRuntime()

    this.runtime.on("beforeInitialize", (this.beforeInitializeSpy = sinon.spy()))
    this.runtime.on("afterInitialize", (this.afterInitializeSpy = sinon.spy()))
    this.runtime.on("preparing", (this.preparingSpy = sinon.spy()))
    this.runtime.on("runtimeIsPrepared", (this.runtimeIsPreparedSpy = sinon.spy()))
    this.runtime.on("runtimeDidStart", (this.runtimeDidStartSpy = sinon.spy()))
    this.runtime.on("runtimeWillRunStartMethod", (this.runtimeWillRunStartMethodSpy = sinon.spy()))
  })

  it("only initialize once", function() {
    this.initSpy.should.have.been.calledOnce
    this.initSpy.should.not.have.been.calledTwice
  })

  it("only calls prepare once", function(done) {
    this.prepareSpy.should.have.been.calledOnce
    this.prepareSpy.should.not.have.been.calledTwice
    done()
  })

  it("only calls start once", function(done) {
    const { startSpy } = this

    this.runtime.use(next => {
      next()
    })

    this.runtime
      .start()
      .then(() => this.runtime.start())
      .then(() => {
        startSpy.should.have.been.calledOnce
        startSpy.should.not.have.been.calledTwice
      })
      .then(() => done())
      .catch(e => done(e))
  })
})
