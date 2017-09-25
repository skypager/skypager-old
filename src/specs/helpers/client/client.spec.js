// helpers/client/client.spec.js
import * as ClientHelper from "helpers/client"

describe("Client Helper Package", function() {
  it("exposes the server helper", function() {
    ClientHelper.should.have.property("Client").that.has.property("attach").that.is.a("function")
  })
})
