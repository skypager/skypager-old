//src/runtime/registries/router.spec.js

import router, { applyRoute, route, pathMatcher } from "runtime/registries/router"

describe("Path Router", function() {
  it("attaches a router interface to an object", function() {
    const available = ["src/containers/Home", "src/containers/About", "src/containers/Join"]

    const host = {
      available,
    }

    router(host)

    host.should.have.property("router")
    host.router.should.have.property("test").that.is.a("function")
    host.router.should.have.property("matcher").that.is.a("function")
    host.router.should.have.property("filter").that.is.a("function")

    host.router.get(":a/:b/:c").should.be.an("array").that.is.not.empty

    host.router.get(":a/:b/:c")[0].should.deep.equal({
      result: {
        a: "src",
        b: "containers",
        c: "Home",
      },
      index: 0,
      path: "src/containers/Home",
      pattern: ":a/:b/:c",
    })
  })

  it("matches route patterns", function() {
    const result = route(":group/:category/:id")("components/Containers/Home")
    result.should.deep.equal({
      group: "components",
      category: "Containers",
      id: "Home",
    })
  })

  it("exposes a function to create a path matching function", function() {
    pathMatcher({}).should.be.a("function")
    pathMatcher({})(":a/:b").should.be.a("function")
  })

  it("can apply a route pattern to an array of paths", function() {
    const list = ["src/containers/Home", "src/containers/About", "src/containers/Join"]

    const results = applyRoute(":a/:b/:c", list)

    results.should.have.property("pattern").that.equals(":a/:b/:c")

    results.should.have.property("pathsToTest").that.is.an("array")

    results.should.be.an("object").that.is.not.empty

    results.should.have.property("failures").that.is.an("array").that.is.empty

    results.should.have.property("matches").that.is.an("array").that.is.not.empty
  })
})
