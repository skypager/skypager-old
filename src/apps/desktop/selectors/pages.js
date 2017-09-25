export default async function selectPages(chain, options = {}) {
  return chain
    .get("fileManager.fileIds", [])
    .filter(f => f.match(/pages\/[A-Z]\w+(\/index\.js|\.js)/))
    .keyBy(f => f)
    .mapKeys(fileId => fileId.replace(/pages\//, "").replace(/(\/index\.js|\.js)/, ""))
}
