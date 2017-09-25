//src/runtime/registries/registry.spec.js

import createRegistry from "runtime/registries/registry"

describe("Registries", function() {
  it("allows me to create a registry on an object", function() {
    let host = {}

    createRegistry(host, "ideas")

    host.should.have.property("ideas").that.is.an("object")
    host.ideas.available.should.be.empty
    host.ideas.register("shitbox", () => 1)
    host.ideas.available.should.not.be.empty
    host.ideas.available.should.include("shitbox")
    host.ideas.shitbox.should.equal(1)
  })
})
