export default async function selectComponents(chain, options = {}) {
  return chain
    .get("fileManager.fileIds", [])
    .filter(f => f.match(/components\/[A-Z]\w+(\/index\.js|\.js)/))
    .keyBy(f => f)
    .mapKeys(fileId => fileId.replace(/components\//, "").replace(/(\/index\.js|\.js)/, ""))
}
