const AWS = require('aws-sdk')

export const shortcut = 'aws'

export const featureMethods = [
  'getLibrary',
  'lazyCloudFront',
  'lazyS3',
  'lazyDns',
  'lazyCodeStar',
  'lazyLambda',
  'lazyCodeCommit',
  'lazyEmail',
  'wrapCaller',
]

export async function featureWasEnabled(options = {}) {
  const { runtime } = this

  /*
  let { cloudFront = true, s3 = true, email, codeStar, codeCommit, lambda, route53, dns } = options

  s3 = !!(s3 || cloudFront)
  route53 = !!(route53 || dns || cloudFront || s3)
  dns = !!(dns || route53)
  codeStar = !!(codeStar || codeCommit)

  if (email) {
    runtime.feature('aws/email', options).enable(options)
  }
  if (codeStar) {
    runtime.feature('aws/codeStar', options).enable(options)
  }
  if (codeCommit) {
    runtime.feature('aws/codeCommit', options).enable(options)
  }
  if (lambda) {
    runtime.feature('aws/lambda', options).enable(options)
  }
  if (s3) {
    runtime.feature('aws/s3', options).enable(options)
  }
  if (cloudFront) {
    runtime.feature('aws/cloudfront', options).enable(options)
  }
  if (dns || route53) {
    runtime.feature('aws/route53', options).enable(options)
  }
  */
}

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
export const lazyDns = (options = {}) => new AWS.Route53()
export const lazyCodeCommit = (options = {}) => new AWS.CodeCommit()
export const lazyCodeStar = (options = {}) => new AWS.CodeStar()
export const lazyLambda = (options = {}) => new AWS.Lambda()
export const lazyEmail = (options = {}) => new AWS.SES()
