export const shortcut = 'codeStar'

export const featureMethods = ['listProjects']

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
  this.hideGetter('codeStar', () => runtime.aws.codeStar)
}

export async function listProjects(options = {}) {}
