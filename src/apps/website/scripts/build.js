async function main() {
  const { websiteCompiler: compiler } = skypager

  clear()
  randomBanner("Skypager", { font: "Slant" })
  print("Running website compiler", 4, 0, 2)
  await compiler.run()

  print("\n\n")
  print(
    compiler.stringifyStats({ reasons: false, modules: false, built: true, chunks: false }),
    4,
    0,
    2
  )
  print("\n\n")

  const index = skypager.page("bootstrap/dashboard-light", {
    dllScripts: [
      "https://cdn.skypager.io/packages/skypager-runtimes-react/latest/skypager-react.js"
    ],
    inject: "/app.js"
  })

  const content = await index.render()

  await skypager.fsx.writeFileAsync(
    skypager.join("public", "index.html"),
    content.toString(),
    "utf8"
  )

  print("Generated HTML")
}

main()
