export const questions = {
  componentName: {
    description: 'What is the class name of the Page?',
    required: true,
    pattern: /^[A-Z]/,
    message: 'The Page class name should be CamelCase.'
  },
  sourcePath: {
    description: 'Where should the page live?',
    default: 'src/pages'
  }
}

export const run = async (params = {}, { runtime } = {}) => {
  const { sourcePath, componentName } = params
  const { print } = runtime.cli

  print(
    `Generating ${componentName} in ${sourcePath}/${componentName}/index.js`
  )

  await runtime.fsx.mkdirpAsync(runtime.resolve(sourcePath, componentName))
  await runtime.fsx.writeFileAsync(
    runtime.resolve(sourcePath, componentName, 'index.js'),
    componentTemplate(params).trim() + '\n',
    'utf8'
  )

  return params
}

export const componentTemplate = ({ componentName } = {}) => `

import { Component } from 'react'
import types from 'prop-types'
import { Container, Segment, Header } from 'semantic-ui-react'

export class ${componentName} extends Component {
  state = {}

  render() {
    return (
      <Container page>
        <Header as="h1" content="Title" subheader="Subtitle" />

        <Segment piled>
          This is the ${componentName} Component.
        </Segment>
      </Container>
    )
  }
}

export default ${componentName}
`
