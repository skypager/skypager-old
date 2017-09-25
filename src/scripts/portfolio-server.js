async function startPortfolioServer() {
  await skypager.fileManager.startAsync()
  await skypager.packageManager.startAsync()

  skypager.packageManager.registerProjects()

  await skypager.select("files/asts")

  await skypager.portfolioServer.start().then(() => {})
}

randomBanner("Skypager", { font: "Slant" })
print("Starting Portfolio Server")

startPortfolioServer().then(() => {
  print("Server Started.")
})
