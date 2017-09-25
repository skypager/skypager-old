// helpers/client/helper.spec.js
import { Runtime } from "skypager-runtime"
import { Client } from "helpers/client"

describe("Skypager Client Helper", function() {
  it("is a standard skypager helper", function() {
    Client.should.have.property("attach").that.is.a("function")
    Client.should.have.property("createRegistry").that.is.a("function")

    Client.propNames("Client").should.be.an("object").that.has.property("registryProp", "clients")

    Client.propNames("Client").should.be.an("object").that.has.property("lookupProp", "client")
  })

  it("can be created with options and context", function() {
    const runtime = new Runtime()
    const client = new Client({ port: 3000, optionTypes: { port: "number" } }, runtime.sandbox)

    client.should.have.property("options").that.is.an("object").that.is.not.empty

    client.options.should.have.property("port", 3000)

    client.should.have.property("context").that.is.an("object").that.has.property("runtime", runtime)
  })

  it("supports a standard helpers registry interface", function() {
    const runtime = new Runtime()

    runtime.should.have.property("clients").that.is.an("object").that.has.property("lookup").that.is.a("function")

    runtime.should.have.property("client").that.is.a("function")
  })

  it("has some default clients available", function() {
    const runtime = new Runtime()
    runtime.should.have
      .property("clients")
      .that.has.property("available")
      .that.is.an("array")
      .that.includes("skypager-devserver")
  })
})
