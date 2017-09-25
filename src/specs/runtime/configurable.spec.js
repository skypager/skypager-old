//src/runtime/configurable.spec.js

import { Runtime } from "runtime"
const { snakeCase, camelCase } = Runtime.stringUtils

class ConfigurableRuntime extends Runtime {
  static configFeatures = {
    ...Runtime.configFeatures,
    haha() {},
  }

  static configReducers = {
    ...Runtime.configReducers,
    hahaha() {},
  }

  configFeatures() {
    return {
      service(existing = {}, options = {}) {
        if (arguments.length === 0) return

        return {
          ...existing,
          ...options,
        }
      },
    }
  }

  configReducers() {
    return {
      service({ service = {} } = {}) {
        return service
      },
    }
  }
}

describe("Configurable Runtimes", function() {
  before(function() {
    this.configurableRuntime = new ConfigurableRuntime()
  })

  it("should have config reducers", function() {
    const features = this.configurableRuntime.getConfigReducers()
    features.should.be.an("object").that.has.property("service").that.is.a("function")
    features.should.have.property("service").that.is.a("function")
  })

  it("should have config features", function() {
    const features = this.configurableRuntime.getConfigFeatures()
    features.should.be.an("object").that.has.property("service").that.is.a("function")

    features.should.have.property("haha").that.is.a("function")
  })

  it("should expose config presets for each of the available features", function() {
    const presets = this.configurableRuntime.getConfigPresets()
    const names = this.configurableRuntime.availableFeatures.map(id => camelCase(snakeCase(id)))

    names.forEach(featureId => {
      presets.should.have.property(featureId)
    })
  })
})
