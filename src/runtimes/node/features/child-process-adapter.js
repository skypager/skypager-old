export * from "child_process"
import * as cpAsync from "child-process-promise"

export const createGetter = "proc"

export function lazyAsync() {
  const { runtime } = this
  const cwd = runtime.cwd

  return {
    exec(cmd, options = {}, ...args) {
      return cpAsync.exec(cmd, { cwd, ...options }, ...args)
    },
    execFile(cmd, a = [], options = {}, ...args) {
      return cpAsync.execFile(cmd, a, { cwd, ...options }, ...args)
    },
    spawn(cmd, a = [], options = {}, ...args) {
      return cpAsync.spawn(cmd, a, { cwd, ...options }, ...args)
    },
    fork(cmd, a = [], options = {}, ...args) {
      return cpAsync.fork(cmd, a, { cwd, ...options }, ...args)
    }
  }
}

export const featureMethods = [
  "lazyAsync",
  "spawn",
  "spawnSync",
  "exec",
  "execSync",
  "fork",
  "forkSync",
  "execFile",
  "execFileSync"
]

export function featureMixinOptions() {
  return {
    transformKeys: true,
    scope: this,
    partial: [],
    insertOptions: false,
    right: true,
    hidden: false
  }
}
