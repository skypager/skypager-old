// prettier-ignore
(async function() {
  await skypager.fileManager.startAsync()
  await skypager.packageManager.startAsync()

  const packageLocations = await skypager.select('package/locations')

  try {
    const missingReadmes = packageLocations.filter(loc => skypager.fileManager.file(`${loc}/README.md` || skypager.fileManager.file(`${loc}/readme.md`)))
    const packageData = skypager.lodash.keyBy(
      missingReadmes.map(p => skypager.packageManager.manifests.get(`${p}/package.json`)),
      '_packageId'
    )

    skypager.lodash.mapValues(packageData, (data, packageId) => {
      const packageName = data.title || skypager.stringUtils.titleize( skypager.stringUtils.humanize( data.name.replace(/-/g, ' ')))

      skypager.fsx.writeFileSync(
        skypager.resolve(packageId.replace('package.json', 'README.md')),
        [
        `# ${packageName}`,
        '',
        `** ${data.description || ''}`,
        '',
        'This is an auto-generated README.',
        '',
        '## TODO',
        ' - [ ] Write a proper readme describing what this package does'
        ].join("\n"),
        'utf8'
      )
    })
  } catch(e) {
    console.log(e)
  }
})()
