#!/usr/bin/env node

const { server } = require('.')

server().listen('repl.sock')
