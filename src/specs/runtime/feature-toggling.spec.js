//src/runtime/feature-toggling.spec.js

import { Runtime } from "runtime"

describe("Toggling Features", function() {
  it("allows me to enable features with an object", function() {
    const runtime = new Runtime()

    runtime.features.register("one", () => ({
      hostMethods: ["getThisOne"],
      getThisOne: () => "GotThisOne",
    }))

    runtime.features.register("two", () => ({
      hostMethods: ["getThisOneToo"],
      getThisOneToo: () => "GotThisOneTwo",
    }))

    runtime.features.available.should.include("one", "two")
    runtime.availableFeatures.should.include("one", "two")

    runtime.should.not.have.property("thisOne")
    runtime.should.not.have.property("thisOneToo")

    runtime.enableFeatures({
      one: {},
      two: {},
    })

    runtime.should.have.property("thisOne")
    runtime.should.have.property("thisOneToo")
  })

  it("allows me to enable features with a single string", function() {
    const runtime = new Runtime()

    runtime.features.register("one", () => ({
      hostMethods: ["getThisOne"],
      getThisOne: () => "GotThisOne",
    }))

    runtime.availableFeatures.should.include("one")

    runtime.should.not.have.property("thisOne")
    runtime.enableFeatures("one")
    runtime.should.have.property("thisOne")
  })

  it("allows me to enable features with an array of strings", function() {
    const runtime = new Runtime()

    runtime.features.register("one", () => ({
      hostMethods: ["getThisOne"],
      getThisOne: () => "GotThisOne",
    }))

    runtime.features.register("two", () => ({
      hostMethods: ["getThisOneToo"],
      getThisOneToo: () => "GotThisOneTwo",
    }))

    runtime.availableFeatures.should.include("one", "two")

    runtime.should.not.have.property("thisOne")
    runtime.should.not.have.property("thisOneToo")

    runtime
      .feature("one")
      .should.have.property("hostMixin")
      .that.is.an("object")
      .that.has.property("getThisOne")
      .that.is.a("function")

    runtime
      .feature("two")
      .should.have.property("hostMixin")
      .that.is.an("object")
      .that.has.property("getThisOneToo")
      .that.is.a("function")

    runtime.feature("one").should.have.property("isSupported", true)
    runtime.feature("two").should.have.property("isSupported", true)

    runtime.enableFeatures(["one", "two"])
    runtime.enabledFeatures.should.have.property("one")
    runtime.enabledFeatures.should.have.property("two")

    runtime.should.have.property("thisOne")
    runtime.should.have.property("thisOneToo")
  })
})
