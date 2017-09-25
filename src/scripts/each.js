async function eachOutput() {
  const cmd = skypager.argv._.slice(2).join(" ")

  skypager.use(skypager.join("packages", "skypager-features-lerna-adapter"))

  let packageNames = await skypager.lerna.updatedPackageNames()

  // publish this one last. also reverse them since theyre in dependnecy order
  packageNames = packageNames.filter(f => f !== "skypager").reverse()

  console.log("#!/bin/sh")
  console.log("\n\n\n")
  console.log(packageNames.map(name => `${skypager.cwd}/bin/run ${name} ${cmd}`).join("\n").trim())
  console.log("\n\n\n")
}

eachOutput().then(() => process.exit(0))
