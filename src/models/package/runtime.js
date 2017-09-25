import { execSync } from "child_process"

export const routes = ["src/runtime/package.json", "src/runtimes/:name/package.json"]

export const collectionMethods = (options, context) => ({
  shortcuts() {
    return this.instanceChain
      .map(({ id, name, relativeDirname } = {}) => [id.split("/")[2], name, relativeDirname])
      .value()
  },
})

export const instanceMethods = (options, context) => ({
  compiler(options = {}) {
    const { project } = context

    const sourceRoot = project.join(this.relativeDirname)

    return project.compiler("node", options).configure(cfg => {
      return cfg
        .entry({ index: project.resolve(sourceRoot, "index.js") })
        .externals(project.resolve(this.baseRelativePath))
        .externals(project.resolve("package.json"))
        .modules(project.resolve(this.baseRelativePath))
        .output({
          path: project.resolve("packages", this.name),
          libraryTarget: "umd",
        })
    })
  },

  symlinkDependency(name, source) {
    if (project.fsx.exists(project.resolve(this.relativeDirname, "node_modules", name))) {
      project.removeSync(project.resolve(this.relativeDirname, "node_modules", name))
      require("fs-extra-promise").ensureSymlinkSync(source, project.resolve(this.relativeDirname, "node_modules", name))
    }
  },

  handleCli(args = [], cwd) {
    const { project } = context
    //const { print } = project.cli

    if (args[0] === "run" && typeof this[args[1]] === "function") {
      this[args[1]].call(this, args, cwd)
    } else if (args[0] === "run" && this.scripts[args[1]]) {
      execSync(`yarn ${args.slice(1).join(" ")}`, { cwd, stdio: "inherit" })
    } else if (typeof this[args[0]] === "function") {
      this[args[0]].call(this, args, cwd)
    } else if (args[0] === "script") {
      const script = project.query(`*/${args[1]}*`).first().value()
      const code = script.contents

      project
        .createAsyncScriptRunner(
          code,
          {},
          project.createSandbox({
            portfolio: project,
            project: require("skypager-framework").default.load(cwd),
            cwd,
            args,
            skypager: require("skypager-framework").default,
            require: require,
          }),
        )()
        .then(() => {})
        .catch(error => console.log("error", error))
    } else if (args[0] === "exec") {
      execSync(`${args.slice(1).join(" ")}`, { cwd, stdio: "inherit" })
    } else {
      execSync(`${args.join(" ")}`, { cwd, stdio: "inherit" })
    }
  },
})
