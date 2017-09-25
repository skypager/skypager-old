export async function selectFileTypes(chain) {
  const skypager = this
  const { parse } = skypager.pathUtils

  return chain.invoke("fileManager.fileObjects").map(file => parse(file.path).ext).uniq()
}
