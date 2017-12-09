export default function env(existing, env) {
  const { project } = this

  return env || (project && project.env) || process.env.NODE_ENV || "development"
}
