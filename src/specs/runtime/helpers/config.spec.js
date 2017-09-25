//src/runtime/helpers/config.spec.js

import { createHost } from "runtime/helpers"
const host = createHost()
host.features.add(require.context("../../../runtime/helpers/fixtures", true, /.js$/))

describe("Config Interface", function() {
  before(function() {
    this.configurable = host.feature("configurable", {
      cacheHelper: false,
    })

    this.configurable.configure(c =>
      c
        .auto()
        .service("skypager", { apiKey: "abcdefg", version: "1.0.0" })
        .sheet("portfolios", {
          columns: ["Name", "Owner"],
          layout: ["tabular"],
        })
        .sheet("settings", {
          columns: ["key", "value"],
          layout: ["keyValue"],
        }),
    )
  })

  it("uses presets to support multiple history entries with one command", function() {
    this.configurable.should.have
      .property("config")
      .that.has.property("services")
      .that.is.an("object")
      .that.has.property("autoService")
      .that.has.property("auto", true)

    this.configurable.should.have.property("config").that.has.property("sheets").that.is.an("array").that.is.not.empty

    this.configurable.config.sheets[0].should.be.an("object").that.has.property("sheetName", "autoSheet")
  })

  it("has methods to reset, stash, or serialize the current history", function() {
    const { builder } = this.configurable

    builder.reset.should.be.a("function")
    builder.stash.should.be.a("function")
    builder.serialize.should.be.a("function")
  })

  it("lets me stash the history", function() {
    const { builder } = this.configurable

    builder.stash("savedHistory")
    builder.history.should.be.empty
    this.configurable.should.have
      .property("configStash")
      .that.is.an("object")
      .that.has.property("savedHistory")
      .that.is.an("array").that.is.not.empty
  })

  it("lets me restore history from the stash", function() {
    const { builder } = this.configurable

    this.configurable.should.have
      .property("configStash")
      .that.is.an("object")
      .that.has.property("savedHistory")
      .that.is.an("array").that.is.not.empty

    builder.history.should.be.empty
    builder.stash.load("savedHistory").history.should.not.be.empty
  })

  it("lets me serialize the history", function() {
    const { builder } = this.configurable
    builder.history.should.not.be.empty
  })
})
