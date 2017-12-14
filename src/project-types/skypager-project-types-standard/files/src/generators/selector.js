export const questions = {
  selectorName: {
    description:
      'What is the name of the selector? You can namespace this with a slash if you want.',
    required: true
  },
  sourcePath: {
    description: 'Where should the selector live?',
    default: 'src/selectors'
  }
}

export const run = async (params = {}, { runtime } = {}) => {
  const { sourcePath, selectorName } = params
  const { print } = runtime.cli

  print(`Generating ${selectorName} in ${sourcePath}/${selectorName}.js`)

  await runtime.fsx.mkdirpAsync(
    runtime.pathUtils.dirname(runtime.resolve(sourcePath, `${selectorName}.js`))
  )

  await runtime.fsx.writeFileAsync(
    runtime.resolve(sourcePath, `${selectorName}.js`),
    featureTemplate(params, runtime).trim() + '\n',
    'utf8'
  )

  return params
}

export const featureTemplate = ({ selectorName } = {}, runtime) => {
  return `
export default async function ${runtime.stringUtils.camelCase(
    selectorName.replace(/\//g, '_')
  )}(chain, options = {}) {
  // The selector must return the lodash chain that gets passed as our first argument
  return chain.plant(options)
}
`.trim()
}
