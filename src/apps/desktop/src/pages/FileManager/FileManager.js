import { types, Component } from '../../globals'
import SplitColumnLayout from 'layouts/SplitColumnLayout'
import FilesTree from 'components/FilesTree'
import FileViewer from './FileViewer'

export class FileManager extends Component {
  static contextTypes = {
    main: types.object,
    runtime: types.object,
  }

  state = {
    directoryIds: [],
    fileIds: [],
    loaded: false,
  }

  async componentWillMount() {
    const { runtime } = this.context
    const { history } = this.props
    runtime.navigate = link => history.push(link)
  }

  async componentDidMount() {
    const { main } = this.context
    await main.fileManager.whenActivated()
  }

  handleFileClick = async (e, { id: currentFile }) => {
    e.preventDefault()

    const { main } = this.context
    const { fileManager = main.fileManager } = this.props

    const file = fileManager.file(currentFile)
  }

  render() {
    const { main } = this.context
    const { currentFile } = this.state
    const { fileManager = main.fileManager } = this.props

    return (
      <SplitColumnLayout widths={[3, 13]}>
        <FilesTree fileManager={main.fileManager} onFileClick={this.handleFileClick} />
        {currentFile ? <FileViewer file={fileManager.file(currentFile)} /> : <div />}
      </SplitColumnLayout>
    )
  }
}

export default FileManager
