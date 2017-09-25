// helpers/service/service.spec.js
import * as ServiceHelper from "helpers/service"

describe("Server Helper Package", function() {
  it("exposes the server helper", function() {
    ServiceHelper.should.have.property("Service").that.has.property("attach").that.is.a("function")
  })

  it("exposes the service helper", function() {
    ServiceHelper.should.have.property("Service").that.has.property("attach").that.is.a("function")
  })
})
