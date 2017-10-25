# Skypager REPL

Skypager REPL is a drop-in replacement for the default node REPL that:

- speaks babel / es6 by default
- automatically resolves / displays output from promise calls
- keeps history (at the time I wrote this, babel-node did not)
- supports hot reloading
- comes with built in display helpers like:
  - figlet for ascii art
  - emoji with node-emoji
  - tables with cli-table
  - spinners

## Customize it

You can customize it through a `.skypager-repl.js` file in `process.cwd()`.  It can be written in es6.

```javascript
// Passed an instance of the CLI in case you wish to display anything
// Passed The options and context variables that will be used to create the server / initialize context
export const before = (cli, options, context) => ({ })


// Passed when the server is initialized, and any time the reset event gets called (the repl .clear command)
export const after = (serverInstance, options, context) => ({})
```

## TODO

- Webpack compiler integration
