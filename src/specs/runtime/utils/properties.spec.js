//src/runtime/utils/properties.spec.js

import * as util from "runtime/utils/properties"

const { getOwnPropertyDescriptor } = Object
const { mixinPropertyUtils } = util

describe("Skypager Util", function() {
  it("hides a plain property", function() {
    const obj = { visible: true }
    util.hideProperty(obj, "invisible", () => true, false)

    const descriptor = getOwnPropertyDescriptor(obj, "invisible")

    descriptor.should.have.property("value").that.is.a("function")
    descriptor.should.have.property("enumerable").that.equals(false)
    descriptor.should.have.property("configurable").that.equals(false)
  })

  it("hides a getter", function() {
    const obj = { visible: true }
    util.hideGetter(obj, "invisible", () => true, false)

    const descriptor = getOwnPropertyDescriptor(obj, "invisible")

    descriptor.should.have.property("get").that.is.a("function")
    descriptor.should.have.property("enumerable").that.equals(false)
    descriptor.should.have.property("configurable").that.equals(false)
  })

  it("provides shortcuts for the property methods", function() {
    const target = {}
    const propertyUtils = util.propertyUtils(target)

    propertyUtils.should.have.property("hide")
    propertyUtils.should.have.property("lazy")
    propertyUtils.should.have.property("hideProperty")
    propertyUtils.should.have.property("hideProperties")
    propertyUtils.should.have.property("hideGetter")

    propertyUtils.hide("myStuff", 1)

    target.should.have.property("myStuff")
    getOwnPropertyDescriptor(target, "myStuff").should.have.property("enumerable", false)
  })

  it("can apply lazy interface methods", function() {
    const target = mixinPropertyUtils({
      myRealName: "isBoo",
      val: 1,
    })

    target.applyInterface({
      lazyMethod() {
        return (this.val = this.val + 1)
      },
    })[(target.lazyMethod, target.lazyMethod, target.lazyMethod)]

    target.should.have.property("method", 2)
  })

  it("can apply interface methods", function() {
    const target = mixinPropertyUtils({
      myRealName: "isBoo",
    })

    target.applyInterface(
      {
        myRealName: "protected",
        skips: true,
        contextified(...args) {
          return {
            len: args.length,
          }
        },
        normalMethod() {
          return this.myRealName
        },
        getMyName() {
          return this.myRealName
        },
      },
      {
        partial: [1, 2],
        insertOptions: false,
      },
    )

    target.should.have.property("myName", "isBoo")
    target.should.not.have.property("skips")
    target.should.have.property("myRealName", "isBoo")
    target.should.have.property("normalMethod").that.is.a("function")
    target.contextified().should.have.property("len", 2)
  })

  it("helps create lazy loading properties", function() {
    let untouched = false
    const target = {}
    util.lazy(target, "touched", () => (untouched = true), true)

    untouched.should.equal(false)

    getOwnPropertyDescriptor(target, "touched").should.have.property("configurable", true)

    getOwnPropertyDescriptor(target, "touched").should.have.property("get").that.is.a("function")

    getOwnPropertyDescriptor(target, "touched").should.have.property("enumerable", true)

    getOwnPropertyDescriptor(target, "touched").should.have.property("get").that.is.a("function")

    untouched.should.equal(false)
    target.touched.should.equal(true)

    getOwnPropertyDescriptor(target, "touched").should.have.property("value", true)

    getOwnPropertyDescriptor(target, "touched").should.have.property("enumerable", true)
  })
})
