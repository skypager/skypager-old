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

  print(`Skypager has detected the following updated packages:`)
  print(packageNames.map(name => `- ${name}`), 2)

  const buildOrder = packageNames.filter(
    packageName => packageName !== 'skypager' && packageName !== 'skypager-runtime'
  )

  const buildLines = ['skypager-runtime', ...buildOrder]
    .map(name => `  ${skypager.cwd}/bin/run ${name} buildPackage`)
    .concat('  bin/export')

  const publishLines = packageNames
    .filter(packageName => packageName !== 'skypager')
    .concat(['skypager'])
    .map(name => `  cd ${skypager.cwd}/packages/${name} && npm publish`)

  const allLines = [
    `  lerna publish --skip-npm --yes --repo-version=${repoVersion}`,
    ...buildLines,
    ...publishLines,
  ]

  const scriptContent = lines => `main() {\n${lines.map(line => `  ${line}`).join('\n')}\n\n}\nmain`

  skypager.fsx.writeFileSync(
    skypager.join('changed-packages.json'),
    JSON.stringify(packageNames, null, 2),
    'utf8'
  )

  skypager.fsx.writeFileSync(
    skypager.join('build-changed-packages.sh'),
    scriptContent(buildLines).trim() + '\n',
    'utf-8'
  )

  skypager.fsx.writeFileSync(
    skypager.join('publish-changed-packages.sh'),
    scriptContent(publishLines).trim() + '\n',
    'utf-8'
  )

  skypager.fsx.writeFileSync(
    skypager.join('release.sh'),
    scriptContent(allLines).trim() + '\n',
    'utf-8'
  )

  skypager.proc.execSync(
    `chmod +x build-changed-packages.sh release.sh publish-changed-packages.sh`
  )

  if (skypager.argv.release) {
    skypager.proc.spawnSync(skypager.join('release.sh'), {
      stdio: 'inherit',
    })
  }
}

eachOutput().then(() => process.exit(0))
