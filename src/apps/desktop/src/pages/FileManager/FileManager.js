import { types, Component } from '../../globals'
import CollapsibleColumnLayout from 'layouts/CollapsibleColumnLayout'
import FilesTree from 'components/FilesTree'
import FileViewer from './FileViewer'
import FileInfo from './FileInfo'

export class FileManager extends Component {
  static contextTypes = {
    main: types.object,
    runtime: types.object,
  }

  state = {
    directoryIds: [],
    fileIds: [],
    loaded: false,
    showFilesTree: true,
    showFileInfo: false,
  }

  async componentWillMount() {
    const { runtime } = this.context
    const { history } = this.props
    runtime.navigate = link => history.push(link)

    runtime.keybindings.bind('mod+k mod+b', () => {
      this.setState({ showFilesTree: !this.state.showFilesTree })
    })
  }

  componentWillUnmount() {
    runtime.keybindings.unbind('mod+k mod+b')
  }

  async componentDidMount() {
    const { main } = this.context
    await main.fileManager.whenActivated()
  }

  async handleFileClick(e, { id: currentFile } = {}) {
    e.preventDefault()
    this.setState({ currentFile })
  }

  render() {
    const { main } = this.context
    const { currentFile } = this.state
    const { fileManager = main.fileManager } = this.props

    return (
      <CollapsibleColumnLayout
        leftWidth={3}
        rightWidth={6}
        showLeft={this.state.showFilesTree}
        showRight={this.state.showFileInfo}
        right={<div>RIGHT</div>}
        leftProps={{
          inverted: true,
          style: { height: '100%', padding: '1em 0em 0em 1em', margin: 0 },
        }}
        left={
          <FilesTree
            style={{ padding: '1em', overflowY: 'scroll', height: '100%', width: '100%' }}
            fileManager={fileManager}
            onFileClick={this.handleFileClick.bind(this)}
          />
        }
        right={<FileInfo currentFile={currentFile} />}
      >
        <FileViewer
          currentFile={currentFile}
          toggleFilesTree={() => this.setState({ showFilesTree: !this.state.showFilesTree })}
          toggleFileInfo={() => this.setState({ showFileInfo: !this.state.showFileInfo })}
        />
      </CollapsibleColumnLayout>
    )
  }
}

export default FileManager
