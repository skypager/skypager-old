# Skypager Node.js Runtime

The Skypager Node.js Runtime provides an enhanced global runtime for server side javascript.  It enhances the runtime with features for working with files, processes, servers, and other common tasks.

The main way the Skypager Node Runtime gets used is in the Skypager CLI process whenever you use the `sky` command provided by [Skypager CLI](https://docs.skypager.io/packages/skypager-cli)

## Installation

The Node.js runtime comes by default when you have [Skypager][https://github.com/skypager/skypager] installed.

You can install it separately by:

```shell
$ npm install skypager-runtimes-node
```

## Usage

Whenever you use the Skypager CLI the Node.js runtime is automatically loaded.

```javascript
const skypager = require('skypager-runtimes-node')

async function main() {
  await skypager.start()
  console.log(`Skypager Runtime Started`)
}

main()
```

## Configuring a Skypager Project

When the runtime is started, it orients itself in the root of the nearest `package.json`.  It will automatically run the `skypager.js` file found there.

By setting the `skypager.main` property in your package.json, you can override this default.
