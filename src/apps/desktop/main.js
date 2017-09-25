async function main() {
  const { defaults } = skypager.lodash

  const controller = await skypager.windowManager.createForScript(
    defaults(
      {},
      { url: skypager.get("argv.scriptUrl", "http://localhost:8080/app.js") },
      skypager.argv,
      { windowName: "main", name: "main" },
      (show: false)
    )
  )

  skypager.debug("created script controller", {
    windowId: controller.windowId,
    windowName: controller.windowName
  })

  const initialUrl = skypager.get("argv.initialUrl", "/")

  await controller.webContents.executeJavaScript(`skypager.navigate("${initialUrl}")`)

  controller.getWindow().show()

  return controller
}

main()
