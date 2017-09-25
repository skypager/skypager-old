//src/runtime/registries/context.spec.js

import Context from "runtime/registries/context"

describe("Require Context Registries", function() {
  it("creates a registry from a require context", function() {
    const registries = new Context("registries", {
      context: require.context(".", false, /((?!spec).{4}|^.{0,3})\.js$/),
    })

    registries.available.should.not.be.empty
    registries.available.should.include("index")
    registries.available.should.include("directory")

    registries.lookup("context").default.should.equal(Context)
  })

  it("can disable the auto register modules behavior", function() {
    const registries = new Context("registries", {
      context: require.context(".", false, /((?!spec).{4}|^.{0,3})\.js$/),
      auto: false,
    })

    registries.available.should.be.empty
  })

  it("can automatically return the default export for es6 modules", function() {
    const registries = new Context("registries", {
      context: require.context(".", false, /((?!spec).{4}|^.{0,3})\.js$/),
      useDefaultExport: true,
    })

    registries.lookup("context").should.equal(Context)
    registries.lookup("context").should.not.have.property("default")

    const es5 = new Context("registries", {
      context: require.context(".", false, /((?!spec).{4}|^.{0,3})\.js$/),
      useDefaultExport: false,
    })

    es5.lookup("context").should.have.property("default", Context)
  })

  it("can add additional require contexts to an existing registry", function() {
    const registries = new Context("registries", {
      context: require.context(".", false, /((?!spec).{4}|^.{0,3})\.js$/),
      useDefaultExport: true,
      auto: false,
    })

    registries.available.should.be.empty
    registries.add(require.context(".", false, /simple\.js/))
    registries.available.should.not.be.empty
    registries.available.should.include("simple")
  })
})
