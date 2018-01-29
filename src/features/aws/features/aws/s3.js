const wrapped = {}

export const shortcut = 's3'

export const featureMethods = [
  'listObjects',
  'listBuckets',
  'getObject',
  'showObject',
  'putObject'
]

export const featureMixinOptions = {
  partial: [],
  injectOptions: false
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
  const { runtime } = this
  const { get } = this.lodash
  const { bucketName } = options

  wrapped.getObject =
    wrapped.getObject || runtime.aws.wrapCaller('getObject', 's3')

  const response = await wrapped.getObject({
    Key: key,
    Bucket: bucketName
  })

  return response
  // return get(response, 'Contents', [])
}

export async function listObjects(bucketName, options = {}) {
  const { runtime } = this
  const { omit, get } = this.lodash

  wrapped.listObjects =
    wrapped.listObjects || runtime.aws.wrapCaller('listObjects', 's3')

  if (options.limit) {
    options.MaxKeys = parseInt(options.limit, 10)
  } else {
    options.MaxKeys = 10000
  }

  if (options.prefix) {
    options.Prefix = options.prefix
  }

  const response = await wrapped.listObjects({
    ...omit(options, 'raw', 'prefix', 'limit', 'debug'),
    Bucket: bucketName
  })

  return options.raw ? response : get(response, 'Contents', [])
}

export async function putObject(options = {}) {
  if (typeof options === 'string') {
    options = { path: options }
  }

  const { runtime } = this
  const { path, bucketName = runtime.argv.bucket, key } = options
  const buffer = await (options.contents || runtime.fsx.readFileAsync(path))

  const putObject =
    wrapped.putObject || runtime.aws.wrapCaller('putObject', 's3')

  const response = await putObject({
    Body: buffer,
    Key: key,
    Bucket: bucketName
  })

  return response
}

export async function listBuckets(options = {}) {
  const { runtime } = this
  const { get, omit } = this.lodash

  wrapped.listBuckets =
    wrapped.listBuckets || runtime.aws.wrapCaller('listBuckets', 's3')

  const response = await wrapped.listBuckets(omit(options, 'raw'))

  return options.raw ? response : get(response, 'Buckets', [])
}
