# Runtime Goals

The Runtime's purpose is to act as a globally available dynamic module loader and module registry, it should be compatible with both Webpack and native module systems simultaneously at runtime.

The runtime should work the same in any deploy target, such as `web` or `node` or `electron-renderer` or `electron-main` as well as `react-native`

The Runtime should provide a generic `Helper` class which can be extended to be more specific at a class level such as as `Feature`, `Command`, `Server`.

Each of the `Helper` classes should expose their own registry, and individual modules can register themselves with unique identifiers and loaded at runtime on demand.

These specific `Helper` modules are used to provide a consistent interface, as well as shared state and lifecycle, for working with the underlying modules that get `required` and added to a registry. So for example, if in your project you have multiple subfolders such as `src/commands` and `src/features` and `src/servers` then you can use the `Command` `Feature` or `Server` helpers to work with them in a consistent way by registering them with the helper registry.

Each individual module that gets added to a helper registry can act as a `provider` for these types of helpers by exporting specific properties that adhere to naming and type requirements.  For example a `Server` expects to have a `start` and a `stop` implementation as an asycn function.

As an implementer of either function, you can expect to have access to the runtime and all of the things it provides. In addition to acting as a module registry, `Helpers` can rely on the runtime as a dependency injection solution for other modules such as `lodash` or `mobx`.

As an example, platform specific helpers such as `Server` can also expect to be able to access information about the process, and to take advantage of default features in the `skypager-runtime-node` runtime, in addition to all of the other standard node features such as native require etc.

```javascript
export async function start(optons = {}) {
  const { runtime } = this
  const { defaults } = this.lodash
  const { argv } = runtime

  const server = this.createServer()

  const { port, hostname } = defaults(argv, {
    port: 3000,
    hostname: 'localhost'
  })

  server.start(post, hostname, (err) => {
    this.setState({
      status: 'STARTED',
      port,
      hostname
    })
  })
}

export function createServer(options = {}) {
  return require('express')()
}
```

As a module developer, you can expect certain dependencies, state, and modules to be available and ready for you to be used based on the type of `Helper` you are developing.  `Server`s and `Command`s for example can access a winston logger, as well as CLI output tools.

The runtime is extended with methods such as `command` `feature` and `server` which allow you to spawn instances of each of these helper classes by name, and customize their options and configuration at will before using them.

## Global Singleton Behavior

The runtime expects to be a singleton at a global level, inside of a specific `context` (e.g. `global` or `window`).  Depending on the run target (e.g. `web` or `node`) certain information will be pulled from the process or container, e.g the `process.argv` or `window.location` values.

These are used to determine the initial startup conditions of the runtime.

Extending this behavior should be doable at both a module level and an application level.

## Consistent Boot Lifecycle Definition

At an application level, the expectation is that a runtime can be `required` or `imported` and be `prepared` or `started`.

As an application developer, I want to be able to define my own specific runtime contexts that build upon platform specific behaviors.  Skypager provides default blank slates for `node` in both `production` and `development` contexts as well as an `electron` and `web` runtime.  Each runtime extends the global runtime through the use of initializer functions, by registering and enable features, and by attaching helper classes and registries.

As a developer of shared runtime features and helpers, it is up to you to decide the appropriate time to inject your functionality.

## Extendable at a per platform level

The global namespace is populated with a `runtime` property.

Platform specific runtimes can tap into the boot process of this runtime.

```javascript
import runtime from 'skypager-runtime'

runtime.use({
  initializer(next) {

  }
}).use({
  initializer(next) {

  }
}).use({
  attach(next) {

  }
})

export { runtime }
export default runtime
```

This works because the `runtime.use` API will automatically apply middleware functions found at either
the `attach` or `initializer` property.

At an application level, this allows developers to define their own customized runtimes, by extending
it through the use of feature extensions.

```javascript
import runtime from 'my-runtime'
import platformSpecific from 'my-platform-specific-extensions'
import myHelper from 'my-helper'
import myOtherHelper from 'my-other-helper'

runtime.use(platformSpecific).use(myHelper).use(myOtherHelper)

export { runtime }

export default runtime
```

## Extendable via Feature Modules

Skypager provides a `Feature` helper which allows developers to provide any specific functionality to the global runtime.

A `Feature` can expect to respond to a request `isSupported` and to return true or false.  Your `isSupported` information can expect to access platform specific information such as `env` and `argv` to be able to make its decision.

A `Feature` can export a `featureWasEnabled` function that will be called whenever that feature is enabled on the runtime.

A `Feature` can extend either the `runtime` or itself.

```javascript
import runtime from 'skypager-runtime'

runtime.use('my-feature').use('my-other-feature')
```
