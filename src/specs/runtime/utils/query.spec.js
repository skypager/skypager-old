//src/runtime/utils/query.spec.js

import query from "runtime/utils/query"

describe("Array Query Util", function() {
  const collection = [
    {
      id: 1,
      name: "soederpop",
      age: 35,
      aliases: ["the peoples champ", "el guapo del norte", "j sizzle", "j money"],
      contacts: {
        github: "datapimp",
        twitter: "soederpop",
      },
    },
  ]

  it("performs number equality checks", function() {
    query(collection, { id: 1, age: 35 }).length.should.equal(1)
    query(collection, { id: 2, age: 35 }).length.should.equal(0)
  })

  it("performs string equality checks", function() {
    query(collection, { id: 1, name: "soederpop" }).length.should.equal(1)
    query(collection, { id: 1, name: "Soederpop" }).length.should.equal(0)
  })

  it("performs partial object equality checks", function() {
    query(collection, { id: 1, contacts: { twitter: "soederpop", github: "datapimp" } }).length.should.equal(1)
    query(collection, { id: 1, contacts: { twitter: "soederpop" } }).length.should.equal(1)
    query(collection, { id: 1, contacts: { github: "datapimp" } }).length.should.equal(1)
    query(collection, { id: 1, contacts: { github: "_datapimp" } }).length.should.equal(0)
  })

  it("performs regex checks", function() {
    query(collection, { id: 1, name: /soederpop/ }).length.should.equal(1)
    query(collection, { id: 1, name: /SOEDER/i }).length.should.equal(1)
  })

  it("accepts an array to test against any matches", function() {
    query(collection, { name: ["soederpop", "somebody"] }).length.should.equal(1)
    query(collection, { name: ["somebody"] }).length.should.equal(0)
  })

  it("accepts a complex parameter that specifies the operator", function() {
    query(collection, { age: { operator: "gt", value: 34 } }).length.should.equal(1)
    query(collection, { age: { operator: "gte", value: 34 } }).length.should.equal(1)
    query(collection, { age: { operator: "gte", value: 35 } }).length.should.equal(1)
    query(collection, { age: { operator: "gte", value: 36 } }).length.should.equal(0)
  })

  it("accepts a complex parameter that specifies the operator", function() {
    query(collection, { age: { operator: "lt", value: 24 } }).length.should.equal(0)
    query(collection, { age: { operator: "lte", value: 24 } }).length.should.equal(0)
    query(collection, { age: { operator: "lte", value: 25 } }).length.should.equal(0)
    query(collection, { age: { operator: "lte", value: 26 } }).length.should.equal(0)
  })

  it("accepts a complex parameter that specifies the operator", function() {
    query(collection, { age: { operator: "eq", value: 34 } }).length.should.equal(0)
    query(collection, { age: { operator: "eq", value: 35 } }).length.should.equal(1)
    query(collection, { age: { operator: "eq", value: 36 } }).length.should.equal(0)
  })

  it("accepts a complex parameter that specifies the operator", function() {
    query(collection, { age: { operator: "neq", value: 34 } }).length.should.equal(1)
    query(collection, { age: { operator: "neq", value: 35 } }).length.should.equal(0)
    query(collection, { age: { operator: "neq", value: 36 } }).length.should.equal(1)
  })

  it("can work in negate mode instead", function() {
    query(collection, { age: { operator: "eq", value: 35 } }, true).length.should.equal(0)

    query(collection, { age: { operator: "eq", value: 34 } }, true).length.should.equal(1)
  })
})
