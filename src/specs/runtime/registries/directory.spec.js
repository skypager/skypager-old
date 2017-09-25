//src/runtime/registries/directory.spec.js

import Directory from "runtime/registries/directory"

describe("Directory Registries", function() {
  it("has a registry of metadata", function() {
    const registry = Directory.create("directory")

    registry.should.have.property("registry")
    registry.should.have.property("metadata")
  })

  it("uses an api", function() {
    const registry = Directory.create("directory-with-api", {
      lookupMethod: "yoyo",
      api: {
        meth: function() {
          return this
        },
      },
    })

    registry.should.have.property("meth").that.is.a("function")
    registry.should.have.property("yoyo").that.is.a("function")
    registry.meth().should.have.property("lookup").that.is.a("function")
  })

  it("can retrieve metadata", function() {
    const registry = Directory.create("directory")

    registry.register("MyFunction", () => "Nice", { very: "Nice" })

    registry.meta("MyFunction").should.be.an("object").that.has.property("very", "Nice")
  })

  it("can search metadata", function() {
    const registry = Directory.create("directory")

    registry.register("MyFunction", () => "Nice", { very: "Nice" })

    registry.register("MyOther", () => "Nice", { very: "Nice" })

    registry.search(() => true).should.not.be.empty
    registry.search(() => false).should.be.empty
    registry.search({ very: "Nice" }).should.not.be.empty
  })

  it("can use a route pattern to create metadata", function() {
    const registry = Directory.create("directory", {
      route: ":group/:category/:id(.*)",
    })

    registry.register("src/components/Home", () => 1)

    const meta = registry.meta("src/components/Home")

    meta.should.have.property("id", "Home")
    meta.should.have.property("group", "src")
    meta.should.have.property("category", "components")
  })
})
