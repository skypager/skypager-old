const runtimeProject = skypager
  .spawn({ cwd: skypager.resolve('src/runtime') })
  .use('runtimes/node')
  .use('runtimes/development')

try {
  const babel = require(skypager.packageFinder.attemptResolve('skypager-document-types-babel'))
  runtimeProject.documentTypes.register('babel', babel)
} catch (error) {
  console.log(error)
  process.exit(1)
}

async function main() {
  await runtimeProject.select('files/asts')
  const files = runtimeProject.fileManager.selectMatches(/utils.*\.js$/)

  files.forEach(file => {
    runtimeProject.documents.register(file.relative, file)
  })

  const doc = runtimeProject.document(files[0].relative)

  await runtimeProject.repl('interactive').launch({
    ...runtimeProject.context,
    doc,
  })
}

main()
