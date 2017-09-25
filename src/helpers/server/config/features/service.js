export default function service(existing = {}, ...args) {
  if (arguments.length === 0) {
    return
  }

  let serviceName, config

  if (args.length === 2 && typeof args[0] === "string" && typeof args[1] === "object") {
    serviceName = args[0]
    config = args[1]
  } else if (args.length === 2 && typeof args[0] === "string" && typeof args[1] === "string") {
    serviceName = args[0]
    config = {}
  } else if (args.length === 2 && typeof args[0] === "string" && typeof args[1] === "function") {
    serviceName = args[0]
    config = args[1].call(this, this.options, this.context) || {}
  } else if (args.length === 1 && typeof args[0] === "object") {
    config = args[0]
    serviceName = config.serviceName || config.name || config.id
  } else if (args.length === 1 && typeof args[0] === "string") {
    serviceName = args[0]
    config = {}
  } else if (args.length === 1 && typeof args[0] === "function") {
    config = args[0].call(this, this.options, this.context) || {}
    serviceName = config.serviceName || config.name || config.id
  }

  return {
    ...existing,
    [serviceName]: { ...(existing[serviceName] || {}), ...config },
  }
}
