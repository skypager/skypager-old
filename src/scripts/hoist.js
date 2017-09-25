await fileManager.whenActivated()

const configFeatures = await selectChain('files/tree', { rootNode: 'src/helpers/webpack/config/reducers' })

console.log('hi')

const removeDefaultExports = (code, id) =>
  code
    .replace(/export\ default/g, 'export')
    .replace(/function\ \w+/, `function ${id}`)

const combined = configFeatures
    .omit('index.js')
    .mapValues((file, id) => removeDefaultExports(file.content, id.replace(/\.js/,'')))
    .values()
    .join("\n")
    .value()

const { uniqBy } = lodash

const imports = uniqBy(
  combined.split("\n").filter(line => line.match(/import/)),
  (line) => line.replace(/from.*/,'').replace('import ', '')
)

const importsCode = imports.join("\n")
const combinedExports = combined.split("\n").filter(line => !line.match(/import\ .*from/)).join("\n")

await fs.writeFileAsync(
  skypager.join('src/helpers/webpack/reducers.js'),
  [importsCode, combinedExports].join("\n")
)
