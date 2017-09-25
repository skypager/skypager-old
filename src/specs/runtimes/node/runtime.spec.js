import runtime from "runtimes/node"

describe("Skypager Console Runtime", function() {
  before(function() {
    this.runtime = runtime
  })

  it("provides the command helper", function() {
    this.runtime.should.have.property("commands").that.has.property("available").that.is.an("array").that.is.not.empty
  })

  it("returns all commands which match our runtime", function() {
    this.runtime.findAllCommands().should.not.be.empty
  })

  it("provides the repl helper", function() {
    this.runtime.should.have.property("repls").that.has.property("available").that.is.an("array").that.is.not.empty
  })
})
