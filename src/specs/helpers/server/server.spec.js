// helpers/server/server.spec.js
import * as ServerHelper from "helpers/server"

describe("Server Helper Package", function() {
  it("exposes the server helper", function() {
    ServerHelper.should.have.property("Server").that.has.property("attach").that.is.a("function")
  })

  it("exposes the service helper", function() {
    ServerHelper.should.have.property("Service").that.has.property("attach").that.is.a("function")
  })
})
