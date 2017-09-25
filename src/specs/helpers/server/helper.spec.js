// helpers/server/helper.spec.js
const runtime = require("skypager-runtime")
import { Server } from "helpers/server"

describe("Skypager Server Helper", function() {
  Server.attach(runtime)

  it("is a standard skypager helper", function() {
    Server.should.have.property("attach").that.is.a("function")
    Server.should.have.property("createRegistry").that.is.a("function")
    Server.propNames("Server").should.be.an("object").that.has.property("registryProp", "servers")
    Server.propNames("Server").should.be.an("object").that.has.property("lookupProp", "server")
  })

  it("can be created with options and context", function() {
    const server = new Server({ provider: {}, port: 3000, optionTypes: { port: "number" } }, runtime.sandbox)
    server.should.have.property("options").that.is.an("object").that.is.not.empty
    server.options.should.have.property("port", 3000)
    server.should.have.property("context").that.is.an("object").that.has.property("runtime", runtime)
  })

  it("supports a standard helpers registry interface", function() {
    runtime.should.have.property("servers").that.is.an("object").that.has.property("lookup").that.is.a("function")
    runtime.should.have.property("server").that.is.a("function")
  })

  it("has some default servers available", function() {
    runtime.should.have
      .property("servers")
      .that.has.property("available")
      .that.is.an("array")
      .that.includes("static-files")
  })
})
