async function eachOutput() {
  skypager.use(skypager.join('packages', 'skypager-features-lerna-adapter'))

  let packageNames = await skypager.lerna.updatedPackageNames()
  const repoVersion = skypager.get(
    'argv.repoVersion',
    skypager.get(
      'currentPackage.version',
      skypager.fsx.readJsonSync(skypager.join('lerna.json')).version
    )
  )

  const lines = [
    `lerna publish --skip-npm --yes --repo-version=${repoVersion}`,
    ...packageNames.map(name => `  ${skypager.cwd}/bin/run ${name} buildPackage`),
    `bin/export`,
    ...packageNames.map(name => `cd ${skypager.cwd}/packages/${name} && npm publish`),
  ]

  const scriptContent = `
  main() {
  ${lines.map(line => `  ${line}`).join('\n')}
  }

  main
  `

  skypager.fsx.writeFileSync(
    skypager.join('publish-packages.sh'),
    scriptContent.trim() + '\n',
    'utf-8'
  )

  skypager.proc.execSync(`chmod +x publish-packages.sh`)

  if (skypager.argv.confirm) {
    skypager.proc.spawnSync(skypager.join('publish-packages.sh'), {
      stdio: 'inherit',
    })
  }
}

eachOutput().then(() => process.exit(0))
