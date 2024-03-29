module.exports = {
  env: {
    production: {
      presets: [
        "react",
        "react-optimize",
        [
          "env",
          {
            debug: true,
            modules: false,
            useBuiltIns: true,
            targets: {
              browsers: "defaults"
            }
          }
        ],
        "stage-0"
      ],
      plugins: ["transform-decorators-legacy"]
    },
    development: {
      presets: [
        "react",
        [
          "env",
          {
            debug: false,
            modules: false,
            useBuiltIns: true,
            targets: {
              browsers: ["chrome >= 56"],
              node: "latest"
            }
          }
        ],
        "stage-0"
      ],
      plugins: ["transform-decorators-legacy"]
    },
    cli: {
      presets: ["react", "env", "stage-0"],
      plugins: ["transform-decorators-legacy"]
    }
  }
}
