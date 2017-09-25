// helpers/project-type/project-type.spec.js
import * as ProjectType from "helpers/project-type"

describe("Document Type Helper Package", function() {
  it("exposes the document type helper", function() {
    ProjectType.should.have.property("ProjectType").that.has.property("attach").that.is.a("function")
  })
})
