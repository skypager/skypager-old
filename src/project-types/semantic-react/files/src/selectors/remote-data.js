const REMOTE_URL = ''

export default (async function selectRemoteData(chain, options = {}) {
  const runtime = this

  const { url = REMOTE_URL } = options
  const { axios = global.axios } = runtime
  const { omit } = runtime.lodash

  if (!url.length) {
    throw new Error(`Must supply a remote endpointURL`)
  }

  const data = await axios
    .get(url)
    .then(resp => resp.data || [])
    .catch(error => {
      console.log('Error fetching data', error)
      return []
    })

  // DATA Cleanup Format Pipeline

  return data
})
