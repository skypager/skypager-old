module.exports = function(params = {}) {
  const {
    stylesheets = [],
    headScripts = [],
    bodyScripts = [],
    dllScripts = [],
    content = "",
    htmlClass = "",
    bodyClass = "",
    bodyId = "",
    headTop = "",
    headBottom = "",
    bodyTop = "",
    bodyBottom = "",
    containerId = "app",
    initialState = null
  } = params

  const publicPath = params.publicPath || ""
  const dllPublicPath = params.dllPublicPath || ""

  const styleTags = stylesheets.map(
    href => `<link class='template-stylesheet' rel="stylesheet" href="${publicPath}${href}" />`
  )

  const dllTags = dllScripts.map(
    href => `<script class='dll' src="${dllPublicPath}${href}"></script>`
  )

  const scriptTags = headScripts.map(
    href => `<script class='head' src="${publicPath}${href}"></script>`
  )

  const bodyScriptTags = bodyScripts.map(
    href => `<script class='body' src="${publicPath}${href}"></script>`
  )

  const injectState = typeof initialState === "object"
    ? `try { window.__INITIAL_STATE__ = ${JSON.stringify(
        initialState
      )}; } catch(error) { console.log('Error injecting initial state', error) }`
    : ""

  return `
<html lang="en" class="${htmlClass}">
<head>
  <meta charset="UTF-8" />
  <script type="text/javascript">
  if (typeof global === 'undefined') { window.global = window; }
  </script>
  ${headTop}
  ${styleTags.join("\n")}
  <script>${injectState}</script>
  ${scriptTags.join("\n")}
  ${headBottom}
</head>
<body id="${bodyId}" class="${bodyClass}">
  ${bodyTop}
  <div id="${containerId}">${content}</div>
  ${dllTags.join("")}
  ${bodyScriptTags.join("")}
  ${bodyBottom}
</body>
</html>`.trim()
}
