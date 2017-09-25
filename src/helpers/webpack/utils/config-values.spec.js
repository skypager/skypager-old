import * as util from "./config-values"

describe("Config Values Utilities", function() {
  describe("Modules Folders", function() {
    it("accepts a function", function() {
      const folders = util.getModuleFolders(() => [__dirname, process.cwd()])
      folders.should.be.an("array").that.is.not.empty
    })
  })
})
