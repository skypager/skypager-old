---
title: Node
packageName: skypager-runtimes-node
srcRoot: src/runtimes/node
---

# Node Runtime

The Node Runtime is automatically loaded when running in a Node.js server environment.  It uses `process.env` and `process.args` as well as information read from the nearest `package.json` and `.git` files to build the initial runtime options.

If the current project's `package.json` has a `skypager.main` property that points to a script, this script will be executed and provides an opportunity to further customize the runtime for that specific project.

## Configuration Options


## Features

When the Node Runtime is initialized, it automatically enables certain features.

- [FS Adapter](skypager://runtimes/node/features/fs-adapter)
- [Child Process Adapter](skypager://runtimes/node/features/child-process-adapter)
- [OS Adapter](skypager://runtimes/node/features/os-adapter)
- [Home Folder Wrapper](skypager://runtimes/node/features/home-directory)
- [Logging](skypager://runtimes/node/features/logging)
- [Skywalker](skypager://runtimes/node/features/skywalker)
- [Package Finder](skypager://runtimes/node/features/package-finder)
- [Package Cache](skypager://runtimes/node/features/package-cache)
- [File Downloader](skypager://runtimes/node/features/file-downloader)
- [File Manager](skypager://runtimes/node/features/file-manager)
- [Main Script Runner](skypager://runtimes/node/features/main-script)

## Helpers

When the Node Runtime is initialized, the following [Helpers](/docs/helpers/introduction) are automatically attached.

- [Command Helper](skypager://helpers/command)
- [REPL Helper](skypager://helpers/repl)
- [Client](skypager://helpers/client)
- [Page](skypager://helpers/page)
- [Server](skypager://helpers/server)
