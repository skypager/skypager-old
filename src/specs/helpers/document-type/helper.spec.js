// helpers/document-type/helper.spec.js
import { Runtime } from "skypager-runtime"
import { DocumentType } from "helpers/document-type"

describe("Skypager DocumentType Helper", function() {
  it("is a standard skypager helper", function() {
    DocumentType.should.have.property("attach").that.is.a("function")
    DocumentType.should.have.property("createRegistry").that.is.a("function")

    DocumentType.propNames("DocumentType").should.be.an("object").that.has.property("registryProp", "documentTypes")

    DocumentType.propNames("DocumentType").should.be.an("object").that.has.property("lookupProp", "documentType")
  })

  it("can be created with options and context", function() {
    const runtime = new Runtime()
    const documentType = new DocumentType({ port: 3000, optionTypes: { port: "number" } }, runtime.sandbox)

    documentType.should.have.property("options").that.is.an("object").that.is.not.empty

    documentType.options.should.have.property("port", 3000)

    documentType.should.have.property("context").that.is.an("object").that.has.property("runtime", runtime)
  })

  it("supports a standard helpers registry interface", function() {
    const runtime = new Runtime()

    runtime.should.have.property("documentTypes").that.is.an("object").that.has.property("lookup").that.is.a("function")

    runtime.should.have.property("documentType").that.is.a("function")
  })

  it("has some default documentTypes available", function() {
    const runtime = new Runtime()
    runtime.should.have
      .property("documentTypes")
      .that.has.property("available")
      .that.is.an("array")
      .that.includes("babel")
  })
})
