export const createGetter = "vmBindings"

export const featureMethods = ["createRunner", "invokeRunner", "exec"]

export async function createRunner(options = {}) {
  return await this.runtime.ipcUtils.ask("CODE_RUNNERS", {
    action: "create",
    ...options
  })
}

export async function invokeRunner(options = {}) {
  return await this.runtime.ipcUtils.ask("CODE_RUNNERS", {
    action: "invoke",
    ...options
  })
}

export async function exec(options = {}) {
  return await this.runtime.ipcUtils.ask("CODE_RUNNERS", {
    action: "exec",
    ...options
  })
}
