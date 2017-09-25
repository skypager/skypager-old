// helpers/service/helper.spec.js
import runtime from "skypager-runtime"
import { Service } from "helpers/service"

describe("Skypager Service Helper", function() {
  Service.attach(runtime)

  it("is a standard skypager helper", function() {
    Service.should.have.property("attach").that.is.a("function")
    Service.should.have.property("createRegistry").that.is.a("function")

    Service.propNames("Service").should.be.an("object").that.has.property("registryProp", "services")

    Service.propNames("Service").should.be.an("object").that.has.property("lookupProp", "service")
  })

  it("can be created with options and context", function() {
    const service = new Service({ port: 3000, optionTypes: { port: "number" } }, runtime.sandbox)

    service.should.have.property("options").that.is.an("object").that.is.not.empty

    service.options.should.have.property("port", 3000)

    service.should.have.property("context").that.is.an("object").that.has.property("runtime", runtime)
  })

  it("supports a standard helpers registry interface", function() {
    runtime.should.have.property("services").that.is.an("object").that.has.property("lookup").that.is.a("function")

    runtime.should.have.property("service").that.is.a("function")
  })

  it("has some default services available", function() {
    runtime.should.have
      .property("services")
      .that.has.property("available")
      .that.is.an("array")
      .that.includes("server-status")
  })
})
