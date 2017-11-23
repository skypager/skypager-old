export const questions = {
  componentName: {
    description: 'What is the class name of the Component?',
    required: true,
    pattern: /^[A-Z]/,
    message: 'The Component class name should be CamelCase.',
  },
  sourcePath: {
    description: 'Where should the component live?',
    default: 'src/components',
  },
}

export const run = async (params = {}, { runtime } = {}) => {
  const { sourcePath, componentName } = params
  const { print } = runtime.cli

  print(`Generating ${componentName} in ${sourcePath}/${componentName}.js`)

  await runtime.fsx.mkdirpAsync(runtime.resolve(sourcePath))
  await runtime.fsx.writeFileAsync(
    runtime.resolve(sourcePath, `${componentName}.js`),
    componentTemplate(params).trim() + '\n',
    'utf8'
  )

  return params
}

export const componentTemplate = ({ componentName } = {}) => `
import { types, Container, Component } from 'globals'

export class ${componentName} extends Component {
	static contextTypes = { runtime: types.object }
  state = {}

	componentWillMount() {
		const { runtime } = this.context
	}

  render() {
    return (
      <Container >
        This is the ${componentName} Component.
      </Container>
    )
  }
}

export default ${componentName}
`
