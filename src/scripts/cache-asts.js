const toAST = content => require("skypager-document-types-markdown").toAST(content || "")

async function doIt() {
  await skypager.fileManager.startAsync()
  await fileManager.packageManager.startAsync()
  await skypager.fileManager.readContent({ include: /.md$/ })
  const files = await skypager.fileManager.selectMatches(/.md$/)

  try {
    const asts = await files.map(file => {
      file.ast = toAST(file.content)
      return file.ast
    })

    console.log(asts)
  } catch (error) {}
}

doIt()
