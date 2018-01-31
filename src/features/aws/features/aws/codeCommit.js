export const shortcut = 'codeCommit'

export const featureMethods = ['listRepositories']

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
  this.hideGetter('codeCommit', () => runtime.aws.codeCommit)
}

export async function listRepositories(options = {}) {}
