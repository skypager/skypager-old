//src/runtime/initializers.spec.js

import { Runtime } from "runtime"

describe("Runtime Initializers", function() {
  it("maintains a registry of initializer functions to run early on", function() {
    class CustomRuntime extends Runtime {}

    CustomRuntime.initializers.register(
      "node/custom-runtime",
      () =>
        function() {
          const instance = this
          instance.customInitializer = true
        },
    )

    const runtime = new CustomRuntime()

    runtime.should.have.property("customInitializer")
  })
})
