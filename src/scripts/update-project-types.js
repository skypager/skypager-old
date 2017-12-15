const skypagerVersion = skypager.currentPackage.version
const skypagerCliVersion = skypager.fsx.readJsonSync(skypager.join('src/cli-base/package.json'))
  .version

const projectTypes = ['semantic-react', 'standard']

print(`Skypager Version: ${skypagerVersion}`)
print(`Cli Version: ${skypagerCliVersion}`)

projectTypes.forEach(type => {
  const path = skypager.join(`src/project-types/${type}/files/package.json`)
  const pkg = require(path)

  print(`Updating ${type}`)
  skypager.fsx.writeFileSync(
    path,
    JSON.stringify(
      {
        ...pkg,
        devDependencies: {
          ...pkg.devDependencies,
          skypager: `^${skypagerVersion}`,
          'skypager-cli': `^${skypagerCliVersion}`,
        },
      },
      null,
      2
    )
  )
})
