async function eachOutput() {
  skypager.use(skypager.join("packages", "skypager-features-lerna-adapter"))

  let packageNames = await skypager.lerna.updatedPackageNames()

  console.log("#!/bin/sh")
  console.log("\n\n\n")
  console.log("lerna publish --skip-npm --yes --repo-version=37.4.0")
  console.log("sky run each buildPackage > build-packages.sh")
  console.log("chmod +x build-packages.sh")
  console.log("./build-packages.sh")
  console.log("\n\n\n")
  console.log("bin/export")
  console.log(
    packageNames.map(name => `cd ${skypager.cwd}/packages/${name} && npm publish`).join("\n").trim()
  )
  console.log("\n\n\n")
  console.log("\n\n\n")
}

eachOutput().then(() => process.exit(0))
