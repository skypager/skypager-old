const cwd = skypager.cwd
const parts = cwd.split("/").slice(1)
parts[0] = `/${parts[0]}`

const testPaths = []

while (parts.length) {
  testPaths.push([...parts, "skypager.js"].join("/"))

  parts.pop()
}

const matches = skypager.fsx.existingSync(...testPaths)

if (matches.length) {
  print("Found skypager projects:")
  print(matches.map(p => `- ${p}`), 2)
}
