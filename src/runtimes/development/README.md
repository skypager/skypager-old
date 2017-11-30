# Skypager Development Runtime

The Skypager Development runtime is used in the development of Skypager Projects.  It adds additional features and helpers that are not enabled by default in the [Skypager Node.js Runtime](https://docs.skypager.io/packages/skypager-runtimes-node)

The main way it gets used is in the Skypager CLI process whenever you use the `sky` command provided by [Skypager CLI](https://docs.skypager.io/packages/skypager-cli)

## Installation

The development runtime comes by default when you have [Skypager][https://github.com/skypager/skypager] installed.

You can install it separately by:

```shell
$ npm install skypager-runtimes-development
```

## Usage

Whenever you use the Skypager CLI and `NODE_ENV=development` the development runtime is automatically loaded.

```javascript
const skypager = require('skypager-runtimes-development')

async function main() {
  await skypager.start()
  console.log(`Skypager Runtime Started`)
}

main()
```

## Configuring a Skypager Project in development

When the runtime is started, it orients itself in the root of the nearest `package.json`.  It will automatically run the `skypager.js` file found there.

By setting the `skypager.main` property in your package.json, you can override this default.
