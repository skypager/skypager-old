export function appWillMount(app) {
  const { fileManager, packageManager } = this.runtime
  const { hostname, port } = this

  app.get("/projects", (req, res) => {
    res.json(packageManager.packageData)
  })

  app.get("/project-version-map", (req, res) => {
    res.json(packageManager.versionMap)
  })

  app.get("/projects/:projectName", (req, res) => {
    const project = packageManager.findByName(req.params.projectName)
    if (!project) {
      res.status(404)
      return
    }
    res.json(project)
  })

  app.get("/projects/:projectName/files", (req, res) => {
    const project = packageManager.findByName(req.params.projectName)
    if (!project) {
      res.status(404)
      return
    }

    const relativePath = this.runtime.relative(project._file.dir)
    const fileIds = fileManager.fileIds.filter(f => f.startsWith(relativePath))
    res.json(
      fileIds.map(fileId => ({
        fileId,
        url: `http://${hostname}:${port}/projects/${req.params.projectName}/file/${fileId.replace(
          relativePath + "/",
          ""
        )}`
      }))
    )
  })

  app.get("/projects/:projectName/directories", (req, res) => {
    const project = packageManager.findByName(req.params.projectName)
    if (!project) {
      res.status(404)
      return
    }

    const relativePath = this.runtime.relative(project._file.dir)
    const directoryIds = fileManager.directories.keys().filter(key => key.startsWith(relativePath))

    res.json(
      directoryIds.map(directoryId => ({
        directoryId,
        url: `http://${hostname}:${port}/projects/${req.params
          .projectName}/directory/${directoryId.replace(relativePath + "/", "")}`
      }))
    )
  })

  app.get("/projects/:projectName/directory/*", async (req, res) => {
    const directoryId = req.params["0"].replace(/^\//, "")
    const project = packageManager.findByName(req.params.projectName)
    if (!project) {
      res.status(404)
      return
    }

    const relativePath = this.runtime.relative(project._file.dir)

    let directory = fileManager.directories.get(`${relativePath}/${directoryId}`)

    if (directory) {
      const fileIds = fileManager.fileIds.filter(f => f.startsWith(relativePath))
      const files = fileIds.map(fileId => ({
        fileId,
        url: `http://${hostname}:${port}/projects/${req.params.projectName}/file/${fileId.replace(
          relativePath + "/",
          ""
        )}`
      }))

      res.json({
        ...directory,
        files
      })
    } else {
      res.status(404).json({
        notFound: true,
        directoryId,
        relativePath,
        project: typeof project !== "undefined"
      })
    }
  })

  app.get("/projects/:projectName/file-content/*", async (req, res) => {
    const fileId = req.params["0"].replace(/^\//, "")
    const project = packageManager.findByName(req.params.projectName)
    if (!project) {
      res.status(404)
      return
    }

    const relativePath = this.runtime.relative(project._file.dir)
    let file = fileManager.file(`${relativePath}/${fileId}`)

    if (file.content) {
      res.json({ fileId: file.relative, content: file.content })
    } else {
      res.status(404)
    }
  })

  app.get("/projects/:projectName/file-ast/*", async (req, res) => {
    const fileId = req.params["0"].replace(/^\//, "")
    const project = packageManager.findByName(req.params.projectName)
    if (!project) {
      res.status(404)
      return
    }

    const relativePath = this.runtime.relative(project._file.dir)
    let file = fileManager.file(`${relativePath}/${fileId}`)

    if (file.ast) {
      res.json({ fileId: file.relative, ast: file.ast })
    } else {
      res.status(404)
    }
  })

  app.get("/projects/:projectName/file/*", async (req, res) => {
    const fileId = req.params["0"].replace(/^\//, "")
    const project = packageManager.findByName(req.params.projectName)
    if (!project) {
      res.status(404)
      return
    }

    const relativePath = this.runtime.relative(project._file.dir)

    let file = fileManager.file(`${relativePath}/${fileId}`)

    const { omit } = this.lodash

    if (file) {
      const directoryId = this.runtime.relative(file.dir)

      res.json({
        ...omit(file, "content", "ast"),
        urls: {
          content: `http://${hostname}:${port}/projects/${req.params
            .projectName}/file-content/${fileId}`,
          ast: `http://${hostname}:${port}/projects/${req.params.projectName}/file-ast/${fileId}`,
          directory: `http://${hostname}:${port}/projects/${req.params
            .projectName}/directory/${directoryId}`
        }
      })
    } else {
      res
        .status(404)
        .json({ notFound: true, fileId, relativePath, project: typeof project !== "undefined" })
    }
  })

  if (this.runtime.isDevelopment) {
    require("../development").appWillMount.call(this, app)
  } else {
    require("../history").appWillMount.call(this, app)
  }

  return app
}
