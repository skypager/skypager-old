//src/runtime/helpers/helper.spec.js

import Helper, { createHost } from "runtime/helpers"

const host = createHost()
host.features.add(require.context("../../../runtime/helpers/fixtures", true, /.js$/))
const temp = host.feature("temp")

describe("Helpers", function() {
  it("has a registry from which to find specific helpers", function() {
    Helper.should.have.property("registry").that.is.an("object").that.has.property("lookup").that.is.a("function")
  })

  it("has a registry which we can register helpers", function() {
    Helper.should.have.property("registry").that.has.a.property("lookup").that.is.a("function")
  })

  it("has a feature helper by default", function() {
    Helper.registry.available.should.include("feature")
  })

  it("attaches registries to a host", function() {
    host.should.have.property("features").that.is.an("object").that.has.a.property("lookup").that.is.a("function")

    host.should.have.property("feature").that.is.a("function")
  })

  it("applies the property utils to the helper instances", function() {
    temp.should.have.property("hide")
    temp.should.have.property("lazy")
    temp.should.have.property("getter")
    temp.should.have.property("hideGetter")
    temp.should.have.property("applyInterface")
  })

  it("creates a lodash chain", function() {
    temp.should.have.property("chain")
    temp.chain.get("provider").keys().value().should.not.be.empty
  })

  it("creates instances of a helper", function() {
    temp.should.have.property("provider").that.has.property("myFunction").that.is.a("function")
    temp.provider.should.have.property("configFeatures")
    temp.provider.should.have.property("configReducers")
    temp.should.have.property("project").that.has.property("argv").that.is.an("object")

    Helper.should.have.property("configFeatures")
    Helper.should.have.property("configReducers")

    temp.getConfigFeatures().should.be.an("object")
    temp.getConfigReducers().should.be.an("object")

    temp.should.have.property("configure").that.is.a("function")
    temp.configHistory.should.be.empty
  })

  describe("Option Types", function() {
    const optionTypes = host.feature("optionTypes")

    it("should accept option types from the helper service", function() {
      optionTypes.should.have.property("optionTypes").that.is.not.empty
      optionTypes.optionTypes.should.have.property("valueOne")
      optionTypes.optionTypes.should.have.property("valueTwo")
      temp.optionTypes.should.not.have.property("valueOne")
    })
  })

  describe("Config Interface", function() {
    it("lets helpers provide their own config interface", function() {
      const configurable = host.feature("configurable")
      configurable.should.have.property("getConfigFeatures").that.is.a("function")
      configurable.should.have.property("getConfigReducers").that.is.a("function")
      configurable.configurator().should.have.property("sheet").that.is.a("function")
      configurable.configurator().should.have.property("service").that.is.a("function")
    })

    it("supplies base config and a config tap", function() {
      const configurable = host.feature("configurable")

      configurable.getConfigReducers().should.not.be.empty
      configurable.getConfigFeatures().should.not.be.empty

      configurable.configure(c =>
        c
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

      configurable.should.have.property("builder").that.has.property("history").that.is.not.empty
      const builder = configurable.configurator()

      builder.getConfig().should.have.property("sheets").that.is.an("array").that.is.not.empty
      builder.getConfig().should.have.property("services").that.is.an("object").that.has.property("skypager")
    })
  })
})
