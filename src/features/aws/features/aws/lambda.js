export const shortcut = 'lambda'

export const featureMethods = ['listFunctions']

export const featureMixinOptions = {
  partial: [],
  injectOptions: false,
}

export function featureWasEnabled(options = {}) {
  const { runtime } = this

  if (!runtime.aws) {
    runtime.feature('aws').enable()
  }

  this.hideGetter('aws', () => runtime.aws)
  this.hideGetter('lambda', () => runtime.aws.lambda)
}

export async function listFunctions(options = {}) {}
