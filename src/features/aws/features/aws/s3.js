export const shortcut = 's3'

export const featureMethods = ['listObjects', 'listBuckets', 'getObject', 'showObject', 'putObject']

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
  this.hideGetter('s3', () => runtime.aws.s3)
}

export async function showObject(key, options = {}) {
  const { get } = this.lodash
  const { bucketName } = options

  const response = await this.s3
    .getObject({
      Key: key,
      Bucket: bucketName,
    })
    .promise()

  return response
  // return get(response, 'Contents', [])
}

export async function listObjects(bucketName, options = {}) {
  const { runtime } = this
  const { omit, get } = this.lodash

  if (options.limit) {
    options.MaxKeys = parseInt(options.limit, 10)
  } else {
    options.MaxKeys = 10000
  }

  if (options.prefix) {
    options.Prefix = options.prefix
  }

  const response = await this.s3
    .listObjects({
      ...omit(options, 'raw', 'prefix', 'limit', 'debug'),
      Bucket: bucketName,
    })
    .promise()

  return options.raw ? response : get(response, 'Contents', [])
}

export async function putObject(options = {}) {
  if (typeof options === 'string') {
    options = { path: options }
  }

  const { runtime } = this
  const { path, bucketName = runtime.argv.bucket, key } = options
  const buffer = await (options.contents || runtime.fsx.readFileAsync(path))

  const response = await this.s3
    .putObject({
      Body: buffer,
      Key: key,
      Bucket: bucketName,
    })
    .promise()

  return response
}

export async function listBuckets(options = {}) {
  const { get, omit } = this.lodash

  const response = await this.s3.listBuckets(omit(options, 'raw')).promise()

  return options.raw ? response : get(response, 'Buckets', [])
}
