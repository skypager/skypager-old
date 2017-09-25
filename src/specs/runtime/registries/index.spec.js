//src/runtime/registries/index.spec.js

import Registry, { create } from "runtime/registries/index"

describe("Skypager Registry", function() {
  it("exposes a create interface", function() {
    create.should.be.a("function")
  })

  it("exposes the registry types", function() {
    Registry.should.have.property("Simple")
    Registry.should.have.property("Directory")
  })
})
