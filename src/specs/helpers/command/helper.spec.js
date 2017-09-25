// helpers/command/helper.spec.js
import { Runtime } from "skypager-runtime"
import * as CommandHelper from "helpers/command"

describe("The Command Helper", function() {
  const runtime = new Runtime({ cli: true })

  runtime.use(CommandHelper)

  it("should auto enable the feature", function() {
    runtime.should.have.property("commands")
    runtime.should.have.property("command")
    runtime.enabledFeatures.should.have.property("command-helper")
  })

  it("should extend the runtime with some command helpers", function() {
    runtime.should.have.property("isRunningCli")
    runtime.should.have.property("commandBase")
    runtime.should.have.property("commandPhrase")
    runtime.should.have.property("cliHandler")
    runtime.should.have.property("defaultCliHandler")
  })

  describe("Command Config Builder", function() {
    before(function() {
      this.cfg = runtime
        .command("help")
        .configure(c =>
          c
            .reset()
            .description("does a bunch of stuff")
            .command("help")
            .option("--whatever", "does some stuff")
            .option("--and-some-other", "stuff"),
        ).config
    })

    it("tracks options", function() {
      this.cfg.should.have.property("options").that.is.an("array").that.is.not.empty
    })

    it("has a name", function() {
      this.cfg.should.have.property("command").that.equals("help")
    })

    it("has a description", function() {
      this.cfg.should.have.property("description").that.equals("does a bunch of stuff")
    })
  })
})
