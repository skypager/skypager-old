export const rules = [/\.(json|yml|yaml)$/]

export const compile = (code, options = {}) => {
  return typeof code === "string" ? JSON.parse(code) : code
}

export const toAST = (code, options = {}) => {
  return typeof code === "string" ? JSON.parse(code) : code
}
