// helpers/repl/repl.spec.js
import { Runtime } from "skypager-runtime"
import Repl from "helpers/repl"

describe("The Repl Helper", function() {
  it("auto registers", function() {
    const runtime = new Runtime()
    runtime.should.have.property("repl").that.is.a("function")
  })
})
