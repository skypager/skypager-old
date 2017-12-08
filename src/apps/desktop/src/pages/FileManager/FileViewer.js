import { types, Grid, Row, Column, Component } from '../../globals'
import Editor from 'components/Editor'
import Inspector from 'react-json-inspector'

export class FileViewer extends Component {
  static contextTypes = {
    runtime: types.object,
    main: types.object,
  }

  constructor(props = {}, context = {}) {
    super(props, context)

    const { currentFile } = this.props

    this.state = {
      currentFile,
      file: {},
      mode: 'markdown',
      content: undefined,
    }
  }

  componentWillReceiveProps(nextProps = {}) {
    const { currentFile } = nextProps

    if (currentFile && currentFile !== this.state.currentFile) {
      this.readFile(currentFile).then(() => {
        this.setState({ loaded: true })
      })
    } else if (!currentFile || !currentFile.length) {
      this.setState({ content: '' })
    }
  }

  async readFile(currentFile) {
    const { main } = this.context
    const { fileManager } = main
    const file = currentFile && fileManager.file(currentFile)

    if (file) {
      this.setState({ file, currentFile })
    }

    if (file) {
      await main.fsx.readFileAsync(file.path).then(buffer => {
        const content = buffer.toString()
        this.setState({ content })
        return content
      })
    }

    return { currentFile }
  }

  async handleSave() {
    const { main } = this.context
    const { file = {}, content } = this.state

    this.setState({ saving: true })
    await main.fsx.writeFileAsync(file.path, content, 'utf8')
    this.setState({ saving: false })
  }

  handleFileChange(newContent) {
    console.log(newContent.length)
    this.setState({ content: newContent })
  }

  async componentDidMount() {
    const { main } = this.context
    const { fileManager } = main
    const { currentFile } = this.state

    const file = currentFile && fileManager.file(currentFile)

    if (file && currentFile) {
      await this.readFile(currentFile)
    }
  }

  render() {
    const { currentFile, file = {}, content } = this.state
    const { relative = currentFile, extension = '.md' } = file
    let { mode } = this.state

    if (extension === '.md') {
      mode = 'markdown'
    } else if (extension === '.js') {
      mode = 'jsx'
    } else {
      mode = 'markdown'
    }

    return (
      <div style={{ height: '100%', width: '100%', margin: 0, padding: 0 }}>
        <Menu attached="top">
          <Menu.Item icon="list" onClick={this.props.toggleFilesTree} />
          <Menu.Item loading={this.state.saving} icon="save" onClick={this.handleSave.bind(this)} />
          <Menu.Menu style={{ float: 'right' }}>
            <Menu.Item
              disabled={!currentFile || !currentFile.length}
              icon="info"
              onClick={this.props.toggleFileInfo}
            />
          </Menu.Menu>
        </Menu>
        <Editor
          onChange={this.handleFileChange.bind(this)}
          mode={mode}
          id={relative}
          value={content || ''}
        />
      </div>
    )
  }
}

export default FileViewer
