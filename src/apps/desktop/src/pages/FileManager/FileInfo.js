import { types, Grid, Row, Column, Component } from '../../globals'
import Inspector from 'react-json-inspector'

export class FileInfo extends Component {
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
      this.setState({ file: undefined })
    }
  }

  async readFile(currentFile) {
    const { main } = this.context
    const { fileManager } = main
    const file = currentFile && fileManager.file(currentFile)

    if (file) {
      this.setState({ file, currentFile })

      if (file.extension === '.json') {
        const data = await main.fsx.readJsonAsync(file.path).catch(error => {
          error: error.message
        })
        this.setState({ data })
      }
    }

    return { file, currentFile }
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
    const { runtime } = this.context
    const { currentFile, file = {} } = this.state
    const { keys = ['file'] } = this.props

    return (
      <div style={{ height: '100%', width: '100%', margin: 0, padding: '0.5rem' }}>
        {!!(currentFile && currentFile.length) && <Inspector search={false} data={data} />}
      </div>
    )
  }
}

export default FileInfo
