//src/runtime/registries/simple.spec.js

import SimpleRegistry from "runtime/registries/simple"

describe("SimpleRegistry", function() {
  it("can be created", function() {
    const registry = SimpleRegistry.create()

    registry.should.be.an("object")
    registry.should.have.property("options")
    registry.should.have.property("registry").that.is.an("object")
    registry.should.have.property("lookup").that.is.a("function")
    registry.should.have.property("register").that.is.a("function")
  })

  it("should be able to convert into a require context", function() {
    const registry = SimpleRegistry.create()
    registry.register("boom", () => "bop")
    const ctx = registry.asRequireContext

    ctx.should.have.property("keys").that.is.a("function")
    ctx.should.be.a("function")
    ctx("boom").should.equal("bop")
  })

  it("can attached multiple registries", function() {
    const gateway = {}
    SimpleRegistry.attach("alpha").to(gateway)
    SimpleRegistry.attach("bravo").to(gateway)

    gateway.should.have.property("alpha").that.is.an("object").that.has.property("register")

    gateway.should.have.property("bravo").that.is.an("object").that.has.property("register")
  })

  it("has child registries", function() {
    const registry = SimpleRegistry.create("stuff", {})

    registry.should.have.property("childRegistryNames").that.is.an("array").that.contains("registry")

    registry.childRegistries().should.not.be.empty
  })

  it("can register functions with an alias", function() {
    const registry = SimpleRegistry.create("stuff", {
      alias(key) {
        return {
          oohYeah: key,
        }
      },
    })

    registry.register("nicebaby", () => 1, {
      alias: "hotrod",
    })

    registry.internalAliases.should.not.be.empty
    registry.checkKey("oohYeah").should.equal("nicebaby")
    registry.checkKey("hotrod").should.equal("nicebaby")

    registry.findAliases("nicebaby").should.include("hotrod", "oohYeah")
  })

  it("can format ids before storing them", function() {
    const registry = SimpleRegistry.create("stuff", {
      namespace: "hi/",
      formatId(ugly) {
        return ugly.split("/").slice(1).join("/")
      },
    })

    registry.register("src/Components/HomePage/index.js", () => 1)

    registry.available.should.include("hi/Components/HomePage/index.js")
  })

  it("can register functions", function() {
    const registry = SimpleRegistry.create("stuff", {})
    registry.should.be.an("object")
    registry.should.have.a.property("register").that.is.a("function")

    registry.available.length.should.equal(0)
    registry.register("MyFunction", () => 1)
    registry.available.length.should.equal(1)
  })

  it("can list what is available", function() {
    const registry = SimpleRegistry.create("stuff", {})
    registry.register("MyFunction", () => 1)
    registry.available.should.include("MyFunction")
  })

  it("can lookup objects", function() {
    const registry = SimpleRegistry.create("stuff", {})
    registry.register("MyFunction", () => 1)
    registry.lookup("MyFunction").should.equal(1)
  })

  it("has a fallback option", function() {
    const host = SimpleRegistry.create("host", {})
    const subscriber = SimpleRegistry.create("subscriber", { silenceFailures: true })
    const safety = SimpleRegistry.create("safety", { silenceFailures: true, fallback: host })

    host.register("MyFunction", () => 1)
    should.exist(host.lookup("MyFunction"))
    should.exist(safety.lookup("MyFunction"))
    should.not.exist(subscriber.lookup("MyFunction"))
  })

  it("can wrap the returned result", function() {
    const registry = SimpleRegistry.create("stuff", {
      wrapper: component => ({
        wrapped: component,
      }),
    })

    registry.register("MyComponent", () => 1)
    registry.lookup("MyComponent").should.deep.equal({
      wrapped: 1,
    })

    registry.register("MyFunction", () => (options, context) => options)
    registry.lookup("MyFunction").wrapped({ one: 1 }).should.deep.equal({ one: 1 })
  })
})
