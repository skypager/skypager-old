import { Grid, Row, Column, Component } from '../../globals'
import Editor from 'components/Editor'
import Inspector from 'react-json-inspector'

export class FileViewer extends Component {
  render() {
    const { relative, content, ast, extension } = this.props.file

    let mode

    if (extension === '.md') {
      mode = 'markdown'
    } else if (extension === '.js') {
      mode = 'jsx'
    }

    return (
      <Grid>
        <Row columns="one">
          <Column>
            <Editor mode={mode} id={relative} value={content} />
          </Column>
        </Row>
        <Row columns="one">
          <Column>
            <Inspector data={ast} />
          </Column>
        </Row>
      </Grid>
    )
  }
}

export default FileViewer
