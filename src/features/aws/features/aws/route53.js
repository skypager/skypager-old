const wrapped = {}

export const shortcut = 'route53'

export const featureMethods = [
  'showHostedZone',
  'listHostedZones',
  'listResourceRecordSets',
  'createTrafficPolicyInstance',
  'createTrafficPolicy',
  'listTrafficPolicies',
  'listTrafficPolicyInstances',
]

export const featureMixinOptions = {
  partial: [],
  injectOptions: false,
}

export function featureWasEnabled(options = {}) {
  const { runtime } = this

  if (!runtime.aws) {
    runtime.feature('aws', options).enable(options)
  }

  this.hide('dns', runtime.aws.dns)
}

export async function showHostedZone(options = {}) {
  const resp = await this.dns.getHostedZone(options).promise()
  return resp
}

export async function listResourceRecordSets(options = {}) {
  const resp = await this.dns.listResourceRecordSets(options).promise()
  return resp
}

export async function listHostedZones(options = {}) {
  const resp = await this.dns.listHostedZones(options).promise()
  return resp
}

export async function listTrafficPolicies(options = {}) {
  const resp = await this.dns.listTrafficPolicies(options).promise()
  return resp
}

export async function listTrafficPolicyInstances(options = {}) {
  const resp = await this.dns.listTrafficPolicyInstances(options).promise()
  return resp
}

export async function createTrafficPolicy(options = {}) {
  const resp = await this.dns.createTrafficPolicy(options).promise()
  return resp
}

export async function createTrafficPolicyInstance(options = {}) {
  const resp = await this.dns.createTrafficPolicyInstance(options).promise()
  return resp
}
