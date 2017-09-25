# Skypager Desktop App

## Usage

**Hot Reload In Development**

In one terminal, run the webpack development server

```shell
$ sky run dev --hot
```

In another, open the electron runtime and specify which html file to use:

```shell
$ sky open --entry main.js --html-path='http://localhost:8080/index.html'
```

**Electron with an interactive REPL**

Passing the `--interactive` flag will open up a console inside of the electron main process.

```shell
$ sky open --entry main.js --html-path='http://localhost:8080/index.html' --interactive
```
