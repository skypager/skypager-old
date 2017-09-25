import runtime from "runtimes/node"
import { join } from "path"

const pkg = __non_webpack_require__(process.cwd() + "/package.json")

const testPaths = [
  join(process.cwd(), "node_modules"),
  join(process.cwd(), "..", "node_modules"),
  join(process.cwd(), "..", "..", "node_modules"),
]

const create = () => runtime

describe("Github Meta", function() {
  it("provides access to a git wrapper", function() {
    runtime.should.have.property("git").that.is.an("object").that.has.property("findRepo").that.is.a("function")
  })

  it("gives metadata about the sha, branch, etc", function() {
    runtime.should.have.property("gitInfo").that.is.an("object").that.has.property("branch").that.is.not.empty
  })
})

describe("Console Runtime Features", function() {
  describe("The FS Adapter", function() {
    const runtime = create()

    it("attaches some methods to the runtime", function() {
      runtime.should.have.property("fs").which.is.an("object")
      runtime.should.have.property("fsx").which.is.an("object")
      runtime.should.have.property("join").which.is.a("function")
      runtime.should.have.property("resolve").which.is.a("function")
    })
  })

  describe("The Home Directory Wrapper", function() {
    const runtime = create()

    it("attaches some methods to the runtime", function() {
      runtime.should.have.property("homeFolder")
    })
  })

  describe("The Package Finder", function() {
    const runtime = create()

    //runtime.feature('package-finder').enable()

    it("tells me all the valid package locations", function(done) {
      runtime.packageFinder.findPackageLocations().then(results => done()).catch(error => done(error))
    })

    it("attches a getter on the runtime", function() {
      runtime.should.have.property("packageFinder")
    })

    it("finds packages in the node_modules folders", function(done) {
      runtime
        .findPackages({ rule: /babel/ })
        .then(results => {
          results.should.not.be.empty
          done()
        })
        .catch(error => {
          done(error)
        })
    })

    it("finds packages by version restrictions", function(done) {
      runtime
        .findPackages({ parse: "matches", rule: /skypager-helpers-command/, testPaths, satisfies: pkg.version })
        .then(results => {
          results.should.not.be.empty
          done()
        })
        .catch(error => {
          done(error)
        })
    })

    it("finds packages by version restrictions", function(done) {
      runtime
        .findPackages({ parse: "matches", rule: /skypager-helpers-command/, testPaths, minimum: "99.99.99" })
        .then(results => {
          results.should.be.empty
          done()
        })
        .catch(error => {
          done(error)
        })
    })
    it("finds packages", function(done) {
      runtime
        .findPackages({ rule: /babel/, testPaths })
        .then(results => {
          results.should.not.be.empty
          done()
        })
        .catch(error => {
          done(error)
        })
    })

    it("finds packages in the custom folders", function(done) {
      runtime
        .findPackages({ rule: /skypager-helpers-command/, testPaths, moduleFolderName: "packages" })
        .then(results => {
          results.should.be.an("array").that.has.property("length", 1)
          done()
        })
        .catch(error => {
          done(error)
        })
    })

    it("finds packages in the custom folders", function(done) {
      runtime
        .findPackages({ rule: /skypager-helpers-command/, testPaths, moduleFolderName: "packages" })
        .then(results => {
          results.should.not.be.empty
          results[0].should.not.match(/node_modules/)
          done()
        })
        .catch(error => {
          done(error)
        })
    })

    it("finds one package by name", function(done) {
      runtime
        .findPackage("lodash")
        .then(pkg => {
          pkg.should.not.be.empty
          done()
        })
        .catch(error => done(error))
    })
  })

  describe("The Process Runner", function() {
    const runtime = create()

    it("attaches some methods to the runtime", function() {
      runtime.should.have.property("runProcess").that.is.a("function")
      runtime.should.have.property("runProcess").that.is.a("function")
    })
  })
})
