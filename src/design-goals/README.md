# Skypager Design Goals

Skypager exists to simplify a team's experience building Javascript applications.  To do this, it is important to understand several aspects of the modern Javascript environment that informed the design process.

1) **Multi Platform Build Targets** It is now commonplace for a JavaScript project to contain code that gets run in the web browser, on a mobile device, and on the server.  As language capabilities and available "native APIs" vary from environment to environment, and version to version, we rely on build tools such as babel to transpile code that is guaranteed to run in every environment.

2) **Javascript Modules** Modern javascript projects rely on public repositories such as npm and github to use open source dependencies and frameworks.  It is common to develop large applications by breaking the application apart into many different smaller modules.  Making all of these dependencies available to our projects, and ensuring we are using the correct versions that are compatible with each other and with our project was once a manual chore but is now fairly automated.

3) **Universal Module Defintion** aka `umd`.  To take advantage of these developments, and especially with module formats not being standardized across all environments, the idea of `Universal` javascript emerged and developers found ourselves being able to write code once and have it run on multiple platforms without any headaches.

Thanks to tools like Webpack which makes it easy to create and distribute `universal module bundles` this is feasible with some boilerplate configuration.  Libraries like `React` ship slightly different builds depending if you are using it on the browser or on the server.  Loading libraries this way require a certain amount of behind the scenes code that helps standardize how different modules and different formats are loaded and made vailable at runtime. So much of this is solved at build time that application developers can expect to "get it for free" simply by opting into tooling ecosystem.

Skypager is designed to take advantage of these modern aspects of the Javascript build environment.

## The Skypager Runtime

[To read more about Runtimes](runtime-goals.md)

Given that modern javascript projects are transpiled and distributed using module bundlers, Skypager provides framework and application developers with several pieces of functionality designed to help us further take advantage of all of the metadata and utilities available at build time.  This metadata and information is made available to Skypager so that it can customize the runtime capabilities based on the module being used.

Features can be loaded, configured, and toggled prior to the start of an application, or on demand when needed by the application.

These additional customizations how javascript modules are loaded and incorporated into the application, in specific ways or sequences, are all facilitated by the utilities and capabilities made available by the `Runtime`.

The Runtime attempts to do as much work as possible using `convention over configuration` style techniques.

## Skypager Helper Classes

[To read more about Helper Classes](helper-goals.md)

Common patterns that are used in every project such as `Commands` and `Servers` are made available by the framework.  Developers can easily build their own reusable `Helper` components that capture patterns the framework shouldn't try to provide at a generic level.  Additionally, developers can create their own `Commands` and `Servers` as needed by conforming to the module specifications defined by these helpers.
