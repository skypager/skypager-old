# Helpers
> Module classes which provide Inversion of Control power to skypager projects

The main goal behind the design of the `Runtime` and its `Helper Registry` system is to enable a convention over configuration style approach to developing JavaScript applications. By allowing developers to group, classify or categorize individual javascript modules based, usually on their names and location in the source code project, we can codify certain patterns and organize our source code to take advantage of this.

This requires developers to think in two contexts:

**As a developer of common, reusable modules that can be re-used across multiple projects, in multiple environments. (Developing Runtime features, and Helper classes)**

This would let you do to define for example a `specific-project-runtime` module:

```javascript
import runtime from 'skypager-runtimes-node'
import * as serverHelper from 'skypager-helpers-server'

runtime.use(serverHelper)

runtime.servers.register('webServer', () => require('./src/servers/webServer.js'))
runtime.servers.register('apiServer', () => require('./src/servers/apiServer.js'))

```

**As a developer of specific projects and applications which are dynamically composed of these reusable modules.**

I can define a runtime, and expect that certain features and modules are going to be loaded.

```javascript
import runtime from 'specific-project-runtime'

const webServer = runtime.server('webServer', {
  port: runtime.argv.webPort || 9000
})

const apiServer = runtime.server('apiServer', {
  port: runtime.argv.apiPort || 9001
})

async function main() {
  const { api, web } = runtime.argv

  if (api) {
    await apiServer.start()
    console.log(`API Server started on port ${apiServer.port}`)
  }

  if (web) {
    await webServer.start()
    console.log(`Web Server started on port ${webServer.port}`)
  }
}

main()
```

This program can be started by:

```shell
$ sky run /path-to-script.js --api --web
```

By developing code in these two different contexts, one focuses on generic and reusable patterns and interfaces separately from their specific implementation and usage in a specific application deployment.

## Helpers define patterns for groups of modules to adhere to

Consider a source code project with the following structure

- app/
  - models/
  - controllers/
  - views/

As a developer when I am working on a file in `app/models` I want to be able to rely on certain model specific patterns to be automatically available to me. I expect that I will be required to put specific types of code in `app/models` and that this will be different type of code than `app/views`.

As the developer of the common runtime, I want to be able to assume that everything in `app/models` behaves in similar and consistent ways, and at the same time I want to be able to have many different models and specify only what is unique and different about them.

Further more, if i have two models one in a file named `app/models/book` and another in `app/models/author`. I'd like to be able to assume certain default values based on the file name alone.  This way I can say my author model `hasMany("books")` and not have to worry about how or if the `books` model is loaded before doing so.

The same for `controllers` and `views`.  A `Helper` class is used to define what each of these specific types of modules can do, what individual modules need to specify, and what individual options they can customize.

Helpers can query the project to find available providers.  The folder and file naming conventions is one way to automatically discover helpers, it is not a hard requirement.

## Helpers can be cached / maintain state

Depending on the type of helper, you may only want one living instance to be created.  For other types of helpers, there may not be any long lived state so this might not matter.

Helper classes can specify this behavior about themselves.

Whether Helper classes wish to behave as single instances, or whether many instances can be active, each helper can declare information about its own internal, observable state structures.

## Helper Instances and the Runtime

Helpers can be used the way you would any type of class based framework or library.

```javascript
import { Server } from 'skypager-helpers-server'

export class MyCustomServer extends Server {

}

export default MyCustomServer

export const create = (options = {}, context = {}) => {
  return new MyCustomServer(options, context)
}

MyCustomServer.create = create
```

While good to know, using this pattern can lead to a lot more boilerplate.  The runtime is designed to eliminate this boilerplate.

### Using Helper Registries to create helper instances

Skypager Helper classes can be attached to an instance of a `Runtime`.  In doing so, creating a `Registry` for those specific types of modules.  A project can register named providers of a particular type of helper, so that they can be lazy loaded on demand by the runtime.

The idea is to preload the registry with metadata about which modules are available to it, without loading or depending on everything required to use that module at runtime.

To this end the runtime can query a particular registry to see everything that is available:

```javascript
import runtime from 'skypager-runtime'
import * as myFeature from 'my-feature'

runtime.register('myFeature', myFeature)

console.log(runtime.features.available) // ['myFeature']
```

and when this particular module is needed, load it:

```javascript
const myFeature = runtime.feature('myFeature')

if (myFeature.isSupported) {
  myFeature.enable()
}
```

Using the registry method allows the skypager `Runtime` to control the `options` and `context` data that gets passed down from the runtime to all of the helpers it creates.

## Helpers can declare propTypes contextTypes

Skypager provides default runtimes such as `node`, `development`, `web` and `electron`.  Each of these takes the generic `skypager-runtime` and extend it with different features and helpers that are useful in these runtimes.

In node, a runtime can be called in different environments (e.g. `process.env.NODE_ENV` equal to `production` or `development`) and the main process can be started with different command line flags (e.g. `skypager start webServer --port 9000 --hostname localhost`).

When the runtime is `initialized` and then `started` it can take advantage of this information to control how it boots up, for example by controlling which helpers it creates and starts.  As the the runtime and each of the helpers go through their lifecycle, they will rely on `options` and `context` properties which can be either specified at runtime in our code.

It is best when these values can or inferred by environmental factors (e.g the current `process.cwd()` or by parsing a `package.json` file found in the current `process.cwd()`)
