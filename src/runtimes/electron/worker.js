process.noAsar = true

const { basename, resolve, join, dirname } = require("path")
const { mkdirpSync, existsSync, writeFileSync, appendFileSync } = require("fs")

const projectPath = process.env.SKYPAGER_WORKER_CWD || process.cwd()
const workerName = process.env.SKYPAGER_WORKER_NAME || basename(projectPath)
const logsPath = process.env.SKYPAGER_WORKER_LOGS_PATH || projectPath
const frameworkPath = process.env.SKYPAGER_FRAMEWORK_PATH || getFrameworkPath()
const logFilePath = join(logsPath, `${workerName}.worker.log`)

const { Logger, transports } = require("winston")

let project

if (!existsSync(logsPath)) {
  mkdirpSync(logsPath)
}
if (!existsSync(logFilePath)) {
  writeFileSync(logFilePath)
}

let logger = new Logger({
  level: "debug",
  transports: [
    new transports.File({
      name: workerName,
      filename: logFilePath,
      colorize: true,
      json: false,
      timestamp: false,
    }),
  ],
})

logger.info("Skypager Project Worker Started", {
  frameworkPath,
  workerName,
  logFilePath,
})

process.on("message", function(message = {}) {
  try {
    if (!project) {
      project = loadProject()
    }

    project.debug(`Received message via worker`, message)

    try {
      handleWorkerMessage(message, project)
    } catch (error) {
      project.error(`Handle Worker Message Error`, {
        error,
      })
    }
  } catch (error) {
    log(`Message Receipt Error`, { error, projectPath })
    process.exit(5)
  }
})

function loadProject(cwd = projectPath) {
  try {
    const Framework = require(frameworkPath).default
    const project = Framework.load(cwd)

    return project
  } catch (error) {
    log(`Error while loading project`, {
      error,
      cwd,
    })
    process.exit(4)
  }
}

function log(message, data = {}) {
  try {
    appendFileSync(logFilePath, `${message}\n\n${require("util").inspect(data)}\n`)
  } catch (error) {
    process.exit(3)
  }
}

function getFrameworkPath() {
  try {
    return require.resolve("skypager")
  } catch (error) {
    process.exit(2)
  }
}

function handleWorkerMessage(message = {}, project) {
  const { type = "UNKNOWN" } = message

  switch (type) {
    case "RUN_CODE":
      handleRunner(project, message)
      break

    case "SELECTOR":
      handleSelector(project, message)
      break

    case "UNKOWN":
    default:
      project.debug(`Received invalid message via worker`, message)
  }
}

function handleSelector(project, message = {}) {
  const { messageId, selector, args = [] } = message

  try {
    const result = project.select(selector, ...args)

    process.send({
      messageId,
      selector,
      result,
      asString: JSON.stringify(result, null, 2),
      empty: typeof result === "undefined",
      type: "SELECTOR_RESPONSE",
      pid: process.pid,
    })
  } catch (error) {
    process.send({
      messageId,
      selector,
      args,
      type: "SELECTOR_RESPONSE_ERROR",
      error,
      pid: process.pid,
    })
  }
}

function handleRunner(project, message = {}) {
  const { messageId, code } = message

  const runner = project.createSandboxedScriptRunner(code)(message)

  runner
    .then(result => {
      process.send({
        messageId,
        code,
        result,
        type: "RUN_CODE_RESPONSE",
        pid: process.pid,
      })
    })
    .catch(error => {
      process.send({
        messageId,
        code,
        result: error.message,
        error,
        type: "RUN_CODE_ERROR",
        pid: process.pid,
      })
    })
}
