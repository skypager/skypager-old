//src/runtime/runtime.spec.js

import { Runtime } from "runtime"
import sinon from "sinon"

describe("The Runtime", function() {
  it("emits global events when runtimes are initialized", function() {
    const initSpy = sinon.spy()
    Runtime.events.once("runtimeWasCreated", initSpy)
    const myRuntime = new Runtime()
    initSpy.called.should.be.ok
  })

  it("shares a global event bus with the constructor", function() {
    const runtime = new Runtime()
    runtime.should.have.property("runtimeEvents")
    runtime.runtimeEvents.should.equal(Runtime.events)
  })

  it("has a registry of available features", function() {
    const runtime = new Runtime()
    runtime.features.available.should.not.be.empty
  })

  it("provides access to the Helper class", function() {
    const runtime = new Runtime()
    runtime.should.have.property("Helper").that.is.a("function")
  })

  it("has the lodash interface", function() {
    const runtime = new Runtime()
    runtime.should.have.property("chain")
    runtime.pick("options", "context").should.be.an("object").that.is.not.empty
  })

  it("has a cache", function() {
    const runtime = new Runtime()
    runtime.should.have.property("cache").that.is.an("object").that.has.a.property("fetch").that.is.a("function")
  })
})
