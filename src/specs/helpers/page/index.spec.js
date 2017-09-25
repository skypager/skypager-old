// helpers/page/index.spec.js
import * as PageHelper from "helpers/page"

describe("Page Helper Package", function() {
  it("exposes the page helper", function() {
    PageHelper.should.have.property("Page").that.has.property("attach").that.is.a("function")
  })
})
