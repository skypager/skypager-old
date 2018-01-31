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
  const { get } = this.lodash

  const response = await this.cf.listDistributions(options).promise()

  return get(response, 'DistributionList.Items', [])
}
