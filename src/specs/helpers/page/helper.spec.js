// helpers/page/helper.spec.js
import skypager, { Runtime } from "skypager-runtime"
import { Page } from "helpers/page"

describe("Skypager Page Helper", function() {
  it("is a standard skypager helper", function() {
    Page.should.have.property("attach").that.is.a("function")
    Page.should.have.property("createRegistry").that.is.a("function")

    Page.propNames("Page").should.be.an("object").that.has.property("registryProp", "pages")

    Page.propNames("Page").should.be.an("object").that.has.property("lookupProp", "page")
  })

  it("can be created with options and context", function() {
    const runtime = new Runtime()
    const page = new Page({ port: 3000, optionTypes: { port: "number" } }, runtime.sandbox)

    page.should.have.property("options").that.is.an("object").that.is.not.empty

    page.options.should.have.property("port", 3000)

    page.should.have.property("context").that.is.an("object").that.has.property("runtime", runtime)
  })

  it("supports a standard helpers registry interface", function() {
    const runtime = new Runtime()

    runtime.should.have.property("pages").that.is.an("object").that.has.property("lookup").that.is.a("function")

    runtime.should.have.property("page").that.is.a("function")
  })

  it("has some default pages available", function() {
    const runtime = new Runtime()
    runtime.should.have.property("pages").that.has.property("available").that.is.an("array").that.includes("html")
  })
})
