# Skypager Electron Runtime

The Electron Runtime package provides runtimes for both Electron's `main` and `renderer` process.

It enhances the `main` process runtime with features that assist with things such as managing multiple [Electron Browser Windows ](features/main/window-manager.js) or setting up [IPC Communication](features/main/ipc-helpers.js)

It enhances the `renderer` process runtime with features that help with managing the browser window, and running code snippets using the [Virtual Machine API](features/renderer/vm-bindings.js)

## Installation

```shell
# if you haven't already
npm install electron -g
npm install skypager-runtimes-electron
```

## Usage

In the renderer process:

```html
<html>
  <head>
    <script src="node_modules/skypager-runtimes-electron/renderer.js"></script>
    <script>
    console.log(`Skypager Renderer Runtime`, window.skypager)
    console.log('Skypager Main Runtime', window.skypager.electronMain)
    </script>
  </head>
</html>
```

In the main process:

```javascript
import skypager from 'skypager-runtimes-electron/main'
skypager.isElectron // true
```

## [Features](features)

- See The [Features Documentation](features/README.md)
