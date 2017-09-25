import docblock, {
  multilineTilTag,
  multilineTilEmptyLineOrTag,
  booleanTag,
  singleParameterTag,
  multiParameterTag,
} from "docblock-parser"

export const applyTo = (input = "/**\n*\n*\n**/", options = {}) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(
        docblock({
          tags: Object.assign(options, {
            providesModule: singleParameterTag,
            name: singleParameterTag,
          }),
        }).parse(input),
      )
    } catch (error) {
      reject(error)
    }
  })
}

export { docblock }

export const profiles = {
  docblock,
}
