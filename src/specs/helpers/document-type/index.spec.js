// helpers/document-type/index.spec.js
import * as DocumentType from "helpers/document-type"

describe("Document Type Helper Package", function() {
  it("exposes the document type helper", function() {
    DocumentType.should.have.property("DocumentType").that.has.property("attach").that.is.a("function")
  })
})
