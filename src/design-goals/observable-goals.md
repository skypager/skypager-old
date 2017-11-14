# Observables

The `Runtime` and potentially different `Helper` classes each are able to take advantage of the `mobx` library and the various `observable` data structures they provide, along with helpers for `computed` properties and flux style `actions` which are used to mutate observable state.

## Runtime State

By default, the `Runtime` singleton will have a `state` property which is an instance of the `mobx` library `observable.shallowMap` object.  There will be a `currentState` property that is a `computed` property that contains a JSON representation of the entire runtime `state` object.

A `runtime` will expose an `observe` function which accepts a function that will be called any time there is an update to the `state` observable.

A `runtime` will emit a `change` event any time the state changes.

When an individual `state` property changes, the runtime will emit a change event for that property.

For example:

```javascript
import runtime from 'skypager-runtime'

runtime.on('currentUserDidChangeState', () => {
  const { currentUser } = runtime.currentState
  runtime.setState({ loggedIn: !!currentUser })
  console.log('Logged In')
})

runtime.login = (email, password) =>
  const currentUser = runtime.authentication.lookup(email).validate(password)
  runtime.setState({ currentUser })

runtime.login('jon@chicago.com', 'hello')
// Logged In
```

## Helper State

Each helper class can define its own observable attributes.  For example, the `Server` helper class declares that it has an observable `status`.  Whenever the server is `started` or `stopped` the instance calls `setState({ status: 'started' })`.

## Observable Utils

The `mobx` library makes working with different types of observable objects quite developer friendly.  Almost any type of observable object can be created by combining several smaller ones.  This leaves developer with a lot of creativity.

To help this, the runtime makes it easy to declare a schema for types of observables, and create them when needed at runtime.  Also, as you develop your own custom `Helpers` or `Features` being able to rely on observable's APIs means you have all that power at your fingertips by default through the global runtime itself.

## Mobx is globally available via the runtime

Since `mobx` is so useful, you can automatically access the module via `runtime.mobx`.  You don't need to include this library in your javascript bundle this way either.
