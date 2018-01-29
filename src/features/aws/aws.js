const AWS = require('aws-sdk')

export const shortcut = 'aws'

export const featureMethods = [
  'getLibrary',
  'lazyCloudFront',
  'lazyS3',
  'wrapCaller'
]

export async function featureWasEnabled() {}

export const getLibrary = () => AWS

export function wrapCaller(name, source) {
  const obj = this[source]

  if (!obj) {
    throw new Error(`Could not find aws object atr ${source}`)
  }

  const meth = obj[name]

  if (!meth) {
    throw new Error(`Could not find method at ${name} on this.${source}`)
  }

  return require('util').promisify(meth.bind(obj))
}

export const lazyCloudFront = (options = {}) => new AWS.CloudFront()
export const lazyS3 = (options = {}) => new AWS.S3()
