// helpers/project-type/helper.spec.js
import { Runtime } from "skypager-runtime"
import ProjectType from "helpers/project-type"

describe("Skypager ProjectType Helper", function() {
  it("is a standard skypager helper", function() {
    ProjectType.should.have.property("attach").that.is.a("function")
    ProjectType.should.have.property("createRegistry").that.is.a("function")

    ProjectType.propNames("ProjectType").should.be.an("object").that.has.property("registryProp", "projectTypes")

    ProjectType.propNames("ProjectType").should.be.an("object").that.has.property("lookupProp", "projectType")
  })

  it("can be created with options and context", function() {
    const runtime = new Runtime()
    const projectType = new ProjectType({ port: 3000, optionTypes: { port: "number" } }, runtime.sandbox)

    projectType.should.have.property("options").that.is.an("object").that.is.not.empty

    projectType.options.should.have.property("port", 3000)

    projectType.should.have.property("context").that.is.an("object").that.has.property("runtime", runtime)
  })

  it("supports a standard helpers registry interface", function() {
    const runtime = new Runtime()

    runtime.should.have.property("projectTypes").that.is.an("object").that.has.property("lookup").that.is.a("function")

    runtime.should.have.property("projectType").that.is.a("function")
  })

  it("has some default projectTypes available", function() {
    const runtime = new Runtime()
    runtime.should.have
      .property("projectTypes")
      .that.has.property("available")
      .that.is.an("array")
      .that.includes("javascript-library")
  })
})
