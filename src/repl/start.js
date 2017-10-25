const argv = require('minimist')(process.argv.slice(2))
const create = require('./dist/index').create

create(argv, {argv})