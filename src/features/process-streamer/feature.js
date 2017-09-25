import { createWriteStream } from "fs"
import * as cp from "child_process"
import { join } from "path"
import ansi from "ansi-html-stream"
import { spawn as spawnTerminal } from "pty.js"

export const hostMethods = ["runProcess", "streamProcess"]

export function runProcess(command = "", options = {}) {
  const { isArray } = this.lodash
  const [cmd, ...args] = isArray(command) ? command : command.split(" ")

  return streamProcess.call(this, {
    execPath: cmd,
    args,
    options,
  })
}

export function streamProcess({ execPath, cmd, args = [], options = {} } = {}) {
  if (!execPath && cmd) {
    const split = cmd.split(" ")
    execPath = split.shift()
    args = split
  }

  const command = [execPath, ...args].join(" ")

  let { header = `<pre id='${options.id || "process-runner"}'>\n`, footer = "\n</pre>\n" } = options

  if (options.includeCommand === "footer") {
    footer = `${footer}\n\nCommand completed.\n${command}\n`
  } else if (options.includeCommand || options.includeCommand === "header") {
    header = `${header}$> ${command}\n`
  }

  const { outputPath = require("os").tmpdir(), outputStream, onExit, onError, onData, cwd, prependPaths = [] } = options

  this.debug(`Running Process`, {
    execPath,
    args,
    cwd: options.cwd,
  })

  return new Promise((resolve, reject) => {
    const child = spawn(execPath, args || [], {
      cwd: process.cwd(),
      rows: 60,
      cols: 120,
      name: options.id,
      ...options,
      env: {
        ...process.env,
        FORCE_COLOR: true,
        PATH: [prependPaths, process.env.PATH].join(":"),
        ...(options.env || {}),
      },
    })

    const stream = ansi({
      chunked: true,
    })

    const file = outputStream || createWriteStream(join(outputPath, `${child.pid}.html`), "utf8")

    child.stdout.pipe(stream)
    //child.stderr.pipe(stream)

    stream.pipe(file, { end: false })

    stream.once("end", () => file.end(footer))

    stream.on("data", s => {
      onData && onData(s.toString())
    })

    file.write(header)

    child.once("exit", code => {
      this.debug(`Child process exited with code ${code}`, { execPath, cwd, args })
      onExit && onExit({ code, child, options })
    })

    child.on("error", error => {
      this.debug(`Child process errored`, { error, execPath, cwd, args })
      onError && onError({ error, child, options })
      reject(error)
    })

    resolve({ child, stream, file, outputPath })
  })
}

/**
* `spawn` as Promised
*
* @param {String} command
* @param {Array} args
* @param {Object} options
* @return {Promise}
*/
function doSpawn(command, args, options) {
  var result = {}

  var cp
  var cpPromise = new Promise()
  var reject = cpPromise._cpReject
  var resolve = cpPromise._cpResolve

  // not sure why some of the things im testing have undefined exit codes instead of 0
  var successfulExitCodes = (options && options.successfulExitCodes) || [0, null, undefined]

  cp = spawnTerminal(command, args, {
    ...options,
    shell: true,
  })

  // Don't return the whole Buffered result by default.
  var captureStdout = false

  var capture = options && options.capture
  if (capture) {
    for (var i = 0, len = capture.length; i < len; i++) {
      var cur = capture[i]
      if (cur === "stdout") {
        captureStdout = true
      } else if (cur === "stderr") {
        captureStderr = true
      }
    }
  }

  result.childProcess = cp

  if (captureStdout) {
    result.stdout = ""

    cp.stdout.on("data", function(data) {
      result.stdout += data
    })
  }

  /*
  if (captureStderr) {
  result.stderr = '';

  cp.stderr.on('data', function (data) {
  result.stderr += data;
  });
  }
  */

  cp.on("error", reject)

  cp.on("close", function(code) {
    if (successfulExitCodes.indexOf(code) === -1) {
      var commandStr = command + (args.length ? " " + args.join(" ") : "")
      var err = {
        code: code,
        message: "`" + commandStr + "` failed with code " + code,
        childProcess: cp,
        toString() {
          return this.message
        },
      }

      /*
      if (captureStderr) {
      err.stderr = result.stderr.toString();
      }
      */

      if (captureStdout) {
        err.stdout = result.stdout.toString()
      }

      reject(err)
    } else {
      result.code = code
      resolve(result)
    }
  })

  cpPromise.childProcess = cp

  return cpPromise
}

export function childProcessInterface(execPath, defaultOptions = {}, runtime) {
  const { omitBy, defaults, uniq } = runtime.lodash
  const toArgs = a => (typeof a === "string" ? a.split(" ") : a)

  const toOptions = (o = {}) => {
    const baseOptions = defaults(o, defaultOptions, {
      env: {
        FORCE_COLOR: true,
        ELECTRON_NO_ASAR: true,
        ELECTRON_RUN_AS_NODE: true,
        PATH: process.env.PATH,
        ...omitBy(process.env, (v, k) => k.match(/$npm_/)),
      },
    })

    const currentPaths = baseOptions.env.PATH.split(":")

    const modifiedPaths = [...runtime.get("prependPaths", []), ...currentPaths]

    baseOptions.env.PATH = uniq(modifiedPaths).join(":")

    return baseOptions
  }

  return {
    spawn(args = [], options = {}) {
      return cp.spawn(execPath, toArgs(args), toOptions(options))
    },
    exec(args = [], options = {}, cb) {
      return cp.execFile(execPath, toArgs(args), toOptions(options), cb)
    },
    fork(args = [], options = {}) {
      return cp.fork(execPath, toArgs(args), toOptions(options))
    },
    spawnSync(args = [], options = {}) {
      return cp.spawnSync(execPath, toArgs(args), toOptions(options))
    },
    execSync(args = [], options = {}) {
      return cp.execFileSync(execPath, toArgs(args), toOptions(options))
    },
    forkSync(args = [], options = {}) {
      return cp.forkSync(execPath, toArgs(args), toOptions(options))
    },
    runProcess(args = [], o = {}) {
      const options = toOptions(o)

      Object.assign(options.env, {
        FORCE_COLOR: true,
        ELECTRON_NO_ASAR: true,
        ELECTRON_RUN_AS_NODE: true,
      })

      runtime.debug("RUnning process with path", {
        path: options.env.PATH,
      })

      return streamProcess.call(runtime, {
        execPath,
        args: toArgs(args),
        options,
      })
    },
  }
}
