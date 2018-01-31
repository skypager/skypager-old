export const shortcut = 'email'

export const featureMethods = ['sendMessage', 'createTemplate']

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
  this.hideGetter('email', () => runtime.aws.email)
}

export async function sendMessage(options = {}) {}
export async function createTemplate(options = {}) {}
