//src/runtime/utils/path-matcher.spec.js

import test from "runtime/utils/path-matcher"

describe("The Path Matcher", function() {
  it("tests paths against rules", function() {
    const rules = ["User", "Users", "Users/jonathan", /User/, /Users/, /Users\/jonathan/]

    const path = "/Users/jonathan/what"

    rules.forEach(rule => test(rule, path).should.be.ok)

    test(rules, "SomeBullShit").should.not.be.ok
  })
})
