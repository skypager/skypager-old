//src/runtime/helpers/feature.spec.js

import { createHost } from "runtime/helpers"

describe("The Feature Helper", function() {
  before(function() {
    this.host = createHost({}, { myOption: 1, features: { awesome: { enable: true } } }, { SkypagerVersion: 13 })
    this.host.features.add(require.context("../../../runtime/helpers/fixtures", true, /.js$/))
  })

  it("applies the feature lookup method", function() {
    this.host.should.have.property("feature").that.is.a("function")
  })

  it("attaches the features registry", function() {
    this.host.should.have
      .property("features")
      .that.is.an("object")
      .that.has.a.property("register")
      .that.is.a("function")
  })

  it("applies feature methods to the feature helper", function() {
    const feature = this.host.feature("temp")
    feature.should.have.property("myFunction")
  })

  it("it applies host methods to the host only on demand", function() {
    const feature = this.host.feature("temp")
    this.host.should.not.have.property("functionProvidedByFeature")
    feature.enable()
    this.host.should.have.property("functionProvidedByFeature")
  })

  it("caches the feature objects", function(done) {
    const id1 = this.host.feature("interfaces").uuid
    setTimeout(() => {
      const id2 = this.host.feature("interfaces").uuid
      setTimeout(() => {
        const id3 = this.host.feature("interfaces").uuid
        done(id1 === id2 && id2 === id3)
      }, 20)
    }, 50)
  })

  it("converts lazy and getter properties", function() {
    const i = this.host.feature("interfaces")
    i.should.have.property("featureMethod").that.is.an("object").that.has.property("id", i.id)
    i.enable()
    this.host.should.have.property("hostMethod")
    this.host.hostMethod.should.have.property("id", this.host.id)
    this.host.hostMethod.should.have.property("counter", 1)
    this.host.should.have
      .property("hostMethodGetter")
      .that.is.an("object")
      .that.has.property("options")
      .that.is.an("array")
  })
})
