require("./preload-utils").decorateWindow(window)

const { additionalScripts = [] } = window.__args__

additionalScripts.forEach(script => {
  require(script)
})
