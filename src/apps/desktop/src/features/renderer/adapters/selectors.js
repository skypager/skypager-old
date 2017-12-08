export const hostMethods = ['mainSelect', 'mainSelectChain', 'getAvailableMainSelectors']

export const hostMixinOptions = {
  partial: [],
  insertOptions: false,
}

function runMethod(selector, ...args) {
  return this.ipcUtils.ask('SELECTORS_ADAPTER', {
    selector,
    args,
  })
}

export function getAvailableMainSelectors() {
  return this.get('electronMain.selectors.available', [])
}

export async function mainSelect(selector, ...args) {
  return runMethod.call(this, selector, ...args)
}

export async function mainSelectChain(selector, ...args) {
  const response = runMethod.call(this, selector, ...args)
  return this.lodash.chain(response)
}
