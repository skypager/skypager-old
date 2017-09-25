import omit from "lodash/omit"
import castArray from "lodash/castArray"
import flatten from "lodash/castArray"
import uniq from "lodash/castArray"

export function routes(options = {}, context = {}) {
  const { project = this.project || this } = context
  const { packageFolders = project.getOption("packageFolders", ["packages"]) } = options

  return uniq(flatten(castArray(packageFolders)).map(f => `${f}/:name/package.json`))
}

export function collectionMethods(options = {}, context = {}) {
  const { project = this.project || this } = context

  return {
    findByName(name, stayChained = false) {
      const result = this.instanceChain.keyBy("name").get(name)

      return stayChained ? result : result.value()
    },
    findDependentsOf(packageName, stayChained = false) {
      const results = this.instanceChain.pickBy(pkg => {
        const deps = pkg.getAllDependencies()
        return !!deps[packageName]
      })

      return stayChained ? results : results.value()
    },
  }
}

export function instanceMethods(options = {}, context = {}) {
  const { project = this.project || this } = context

  const { spawn, fork, exec } = require("child-process-promise")

  return {
    updateManifest(updates = {}) {},

    getAllDependencies() {
      return this.chain
        .pickBy((v, k) => k.match(/dependencies$/i))
        .values()
        .reduce((memo, obj) => ({
          ...memo,
          ...obj,
        }))
        .value()
    },

    handleCli(args = [], cwd) {
      const { project } = context
      //const { print } = project.cli

      const execSync = require("child_process").execSync

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
    spawn(command, options = {}) {
      const { out, err, cmd = process.argv[1] } = options

      if (options.capture !== false) {
        options.capture = ["stdout", "stderr"]
      }

      const promise = spawn(cmd, command.split(" "), {
        cwd: project.resolve(this.relativeDirname),
        shell: true,
        ...omit(options, "out", "err"),
        env: {
          FORCE_COLOR: true,
          ELECTRON_NO_ASAR: true,
          ELECTRON_RUN_AS_NODE: true,
          SKYPAGER_FRAMEWORK_ROOT: project.resolve(project.portfolio.dirname, ".."),
          ...process.env,
          ...(options.env || {}),
        },
      })

      if (typeof out === "function") {
        out.call(this, promise.childProcess.stdout, options, context)
      }

      if (typeof err === "function") {
        err.call(this, promise.childProcess.stdout, options, context)
      }

      return promise
    },
    exec(command, options = {}) {
      return exec(`${process.argv[1]} ${command}`, {
        cwd: this.relativeDirname,
        ...options,
        env: {
          FORCE_COLOR: true,
          ELECTRON_NO_ASAR: true,
          ELECTRON_RUN_AS_NODE: true,
          SKYPAGER_FRAMEWORK_ROOT: project.resolve(project.portfolio.dirname, ".."),
          ...process.env,
          ...(options.env || {}),
        },
      })
    },
    fork(script, options = {}) {
      return fork(project.resolve(this.relativeDirname, script), {
        cwd: this.relativeDirname,
        ...options,
        env: {
          FORCE_COLOR: true,
          ELECTRON_NO_ASAR: true,
          ELECTRON_RUN_AS_NODE: true,
          SKYPAGER_FRAMEWORK_ROOT: project.resolve(project.portfolio.dirname, ".."),
          ...process.env,
          ...(options.env || {}),
        },
      })
    },
  }
}
