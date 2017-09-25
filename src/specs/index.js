global.sinon = require("sinon")
global.chai = require("chai")
global.should = chai.should()
global.expect = chai.expect()
global.chai.use(require("sinon-chai"))

const skypager = require("skypager-runtimes-development")
const req = require.context(".", true, /\.spec.js$/)

module.exports = req.keys().forEach(key => {
  if (process.env.ONLY && new RegExp(process.env.ONLY).test(key)) {
    req(key)
  } else if (!process.env.ONLY) {
    req(key)
  }
})
