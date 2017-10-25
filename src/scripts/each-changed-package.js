async function eachOutput() {
  const cmd = skypager.argv._.slice(2).join(' ')

  skypager.use(skypager.join('packages', 'skypager-features-lerna-adapter'))

  let packageNames = await skypager.lerna.updatedPackageNames()

  // publish this one last. also reverse them since theyre in dependnecy order
  packageNames = packageNames.filter(f => f !== 'skypager').reverse()

  const lines = packageNames
    .map(name => `  ${skypager.cwd}/bin/run ${name} ${cmd}`)
    .join('\n')
    .trim()

  const scriptContent = `
  main() {
  ${lines}
  }

  main
  `.trim()

  skypager.fsx.writeFileSync(skypager.join('each-changed-package.sh'), scriptContent, 'utf-8')
  skypager.proc.execSync('chmod +x each-changed-package.sh')
}

eachOutput().then(() => process.exit(0))
