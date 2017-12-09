## Simplify the way Helper classes can be attached to the runtime

Currently the `Feature` helper is very useful.  It can be loaded via the middleware style API `runtime.use` or enabled directly thru `runtime.feature("feature-name").enable()`.  Doing this gives us the opportunity to decorate the runtime, and create a shortcut to the interface for working with that particular feature.  A lot of interfaces are implemented as feature modules.

Each `Helper` implementation is complicated, they must be registered, then `attached`, and then given an opportunity to decorate the runtime methods for working with those helpers.

Since the `Feature` helper is the only one provided by default by Skypager, every `Helper` implementation should expose a feature implementation that the runtime can enable.  It is in these feature models that the `Helper` package can control how their interface behaves and how they wish to extend the runtime to provide shortcuts and conveniences for working with the individual `Helpers`

Example:

```javascript
import skypager from 'skypager-runtime'
import commands from 'skypager-helpers-command'
import servers from 'skypager-helpers-server'

export const runtime = skypager
  .use(commandHelper)
  .use(serverHelper)

export default runtime
```

## Add support for asynchronous module loading

Either via `System.import` or `import` or `require.ensure` or other `Promise` API (e.g. Webpack bundle-loader)

## A React Component Implementation synchronized with every Helper Instance

The ability to render the runtime and helper state as a React component tree.

Using React Custom Renderers, we can render any state object in any form we wish.
