# Skypager

> Universal Javascript Project Automation Framework

![Skypager Logo](https://github.com/skypager/skypager/raw/develop/skypager-logo.png)

## Design Goals

[Read more about Skypager's Design Philosophies](src/design-goals/REAMDE.md)

Skypager exists to take advantage of the wonderful developments in JavaScript and its ecosystem of many small modules. Enhancements to the language and build tooling thanks to projects like Babel and Webpack have opened up many possibilities for analyzing and even generating javascript code.

Skypager uses the capabilities provided by these tools to create the ultimate JavaScript authorizing experience, taking advantage of:

### Feature Driven Runtime Enhancement

Skypager projects all exist on top of a Runtime. The Runtime is your global application state, and is connected to the module dependency loader and global context (e.g. `window` and `document` in the browser, `process` and `global` in node).

Features are JavaScript modules that provide a public interface for doing a thing, and can adapt based on the runtime they are loaded into to keep that interface consistent even as the underlying environment changes. For example, you may have a feature `react/renderer` which provides just one method `render` and delegates to `react-dom` or `react-dom/server` or `react-blessed` under the hood.

In Skypager, you have your Runtime which is the Framework. The layer above that you have Features which are designed to enhance the runtime for a specific environment. You have Helpers which are designed to load groups of related modules, and then you have your project source code which depends on all of these things to do what it is that makes your project unique.

### Portfolios

or what developers call `monorepo`s refer to the practice of having many projects in one folder, all sharing the same source code repository. There are many advantages of this for JavaScript projects which depend on NPM packages, and tools such as Lerna and Yarn Workspaces have come about to make working with them much less painful.

Skypager lets us define Project Types, which let us work with our projects as if they were source code objects in our database. When we work at the level of the Portfolio, this becomes possible. When we work only at the level of individual projects, we are limited in our ability to re-use patterns without duplicating effort and files.

### Universal JavaScript Modules

as much as possible, our code should be able to run in the browser, on the server, in a native mobile app, or on a desktop app while making minimal changes or branches in our code.

### Dynamic Module Registries w/ Metadata

it is very common to organize and group source code in subfolders with special names (e.g. `src/components` , `src/pages`). Often the subfolder your module lives can predict which dependencies are used and most other patterns expected. Skypager aims to take advantage of this as much as possible, by making the metadata available to the runtime and allowing the application to dynamically import them when needed, without losing any of the benefits of Webpack's static analysis of our projects.

### Inversion of Control

This typically refers to the idea of a framework telling the developer how to name files and where to put code. There are many advantages to this to a developer, especially to teams of developers. However the framework can only say so much, and only about your code. How you name your source code is also dependent on the user of our software's domain expertise (e.g. `Recipe`, `Ingredients`, `Suppliers`) or the needs of UI design teams (e.g `Navigation`, `Buttons`, `Cards`, `Layouts`).

It is in these areas that you deviate from the comfort of any framework, and where we can exert our own control as designers of software. Not surprisingly, thi is also where we make the most mistakes, and spend the most time. With the metadata that is already generated by our build tools (Module dependency graphs, file names and paths, ASTs for every file) we can develop our own frameworks and patterns that we can bring from project to project, by letting the build tooling help us take advantage of the naming conventions that exist in our code in our own custom ways.

These groupings of source code are first class citizens with Skypager. See the section about Helpers for more information about this.

### ASTs

Tools and libraries like Webpack, Babel, Prettier, Eslint, and Remark, all rely on converting our source code into ASTs so they can be transformed in some way. The AST is a rich source of information, and Skypager's development runtime makes this all available to you so you can incorporate these superpowers into your own workflow.

## Usage Instructions

Install the `skypager` framework in your project.

```shell
$ npm install skypager --save
```

Install the `skypager-cli` package globally to be able to work with `skypager` projects anywhere in your portfolio.

```shell
$ npm install --global skypager-cli
```

## Available CLI Commands

### Console `sky console`

> An interactive console that connects to any available skypager runtimes

Runs an enhanced REPL that speaks babel, auto-unwraps your promises, and more. This REPL can connect to any available skypager-runtime (e.g communicate with the web native or desktop app as a remote console)

### Open `sky open`

> Launches the skypager desktop app in the context of your current project

Opens a desktop app using any available applications in the registry. The application runs in the context of your current project. This allows us to build graphical UIs for working with software projects, especially [Domain Specific Software Editors](#domain-specific-software-editors) which allow people who don't code to directly contribute.

### Run `sky run`

> Runs files found in the scripts/ folder in the skypager development runtime

Runs a script file in the context of the current project, using the development runtime. This can be used to do anything the runtime is capable of.

### Webpack `sky webpack`

**See Available Compiler Profiles**

Compilers refer to a specific webpack configuration (for a specific target and environment)

```shell
$ sky webpack available
```

**Build a Webpack Compiler**

```shell
// assumes you have src/webpacks/website.js
$ sky webpack website
$ sky webpack build website # equivalent
```

**Serve a Webpack Compiler**

```shell
// assumes you have src/webpacks/website.js
$ sky webpack serve website
$ sky webpack serve website --hot # enable hot module reloading
```

**Webpack Compiler in Watch Mode**

```shell
// assumes you have src/webpacks/website.js
$ sky webpack watch website
```
