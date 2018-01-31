export async function createPayload(options = {}) {
  const { runtime } = this
  const { omitBy } = runtime.lodash
  const payload = await this.preparePayload(options)
  const uploads = Object.values(
    omitBy(
      payload.artifacts,
      (v, k) => (payload.uploaded[k] && payload.uploaded[k].upToDate) || v.isDirectory
    )
  ).map(p => p.path)

  return {
    uploadPaths: uploads,
    uploads: () => Promise.all(uploads.map(p => this.uploadPath(p))),
  }
}

export async function preparePayload(options = {}) {
  const { keyBy, fromPairs } = this.lodash
  const artifacts = await this.buildArtifacts(options)
  const uploaded = await this.uploadedArtifacts(options)
  const hashes = await Promise.all(
    artifacts
      .filter(f => f && !f.isDirectory)
      .map(file =>
        this.hashFile({ path: file.path }).then(hash => [this.resolveUploadPath(file.path), hash])
      )
  )

  const artifactHashes = fromPairs(hashes)
  return {
    hashes: artifactHashes,
    artifacts: keyBy(artifacts, v => this.resolveUploadPath(v.path)),
    uploaded: keyBy(
      uploaded.map(v => ({
        ...v,
        upToDate: !!(artifactHashes[v.Key] === v.ETag.replace(/\W+/g, '')),
        artifactHash: artifactHashes[v.Key],
        shouldBe: v.ETag.replace(/\W+/g, ''),
      })),
      v => v.Key
    ),
  }
}

export async function uploadPath(options = {}) {
  if (typeof options === 'string') {
    options = { path: options }
  }

  const { runtime } = this
  const {
    path,
    baseFolder = 'public',
    bucketName = runtime.argv.bucket || runtime.argv.bucketName,
  } = options

  const key = this.resolveUploadPath({ path, baseFolder, ...options })
  const contents = await runtime.fsx.readFileAsync(path)

  const response = await runtime.s3.putObject({
    bucketName,
    contents,
    key,
  })

  return response
}

export function resolveUploadPath(options = {}) {
  if (typeof options === 'string') {
    options = { path: options }
  }

  const { runtime } = this
  const { path, baseFolder = 'public' } = options

  const relative = runtime.pathUtils.relative(runtime.join(baseFolder), path)

  return [
    runtime.currentPackage.name,
    runtime.currentPackage.version,
    runtime.gitInfo.branch,
    relative,
  ].join('/')
}

export async function discoverArtifacts(options = {}) {
  const { runtime } = this
  const { baseFolder = runtime.resolve('public') } = options

  const tree = runtime.skywalker.create({ baseFolder, bare: true })

  const { flatten, compact } = this.lodash

  const visit = (node = {}) => {
    const { _: info = {} } = node

    if (info.isDirectory) {
      return [info, ...compact(flatten(info.children.map(child => visit(child))))]
    } else {
      return [info]
    }
  }

  return new Promise((resolve, reject) => {
    tree.start((err, t) => {
      err ? reject(err) : resolve(t)
    })
  }).then(tree => visit(tree))
}

export async function discoverUploads(options = {}) {
  const { runtime } = this
  const { currentPackage, gitInfo } = runtime
  const {
    prefix = [currentPackage.name, currentPackage.version, gitInfo.branch].join('/'),
    bucketName = runtime.argv.bucket || runtime.argv.bucketName,
  } = options

  const bucketContents = await runtime.s3.listObjects(bucketName, {
    ...options,
    prefix,
  })

  if (options.debug) {
    return { prefix, bucketContents }
  }

  const results =
    prefix === false
      ? bucketContents
      : bucketContents.filter((object = {}) => {
          return object && object.Key && object.Key.startsWith(prefix)
        })

  return results
}
