export const shortcut = 'cloudFront'

export const featureMethods = ['listDistributions']

const wrapped = {}

export function featureWasEnabled(options = {}) {
  const { runtime } = this

  if (!runtime.aws) {
    runtime.feature('aws').enable()
  }

  this.hideGetter('aws', () => runtime.aws)
  this.hideGetter('cf', () => runtime.aws.cloudFront)
}

export async function listDistributions(options = {}) {
  const { runtime } = this
  const { get } = this.lodash

  wrapped.listDistributions =
    wrapped.listDistributions || runtime.aws.wrapCaller('listDistributions', 'cloudFront')

  const response = await wrapped.listDistributions(options)

  return get(response, 'DistributionList.Items', [])
}
