import { List, Grid, GridColumn as Column, Link, types, Component } from '../../globals'
import SidebarLayout from 'layouts/SidebarLayout'
import Editor from 'components/Editor'
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
    await main.select('files/asts')
    this.setState({ loaded: true })
  }

  handleFileClick = async (e, { id: currentFile }) => {
    e.preventDefault()

    const { main } = this.context
    const { fileManager = main.fileManager } = this.props

    await fileManager.readContent({ include: [currentFile] })

    this.setState({ currentFile })
  }

  render() {
    const { main } = this.context
    const { loaded } = this.state
    const { fileManager = main.fileManager } = this.props

    return (
      <Segment basic>
        <Header
          as="h2"
          icon="file outline"
          dividing
          content="FileManager"
          subheader="Browse Project Files"
        />
        <Loader active={!loaded} />
        <Grid as="div" divided="vertical" style={{ height: '100%' }}>
          <Column width={3}>
            <FilesTree fileManager={main.fileManager} onFileClick={this.handleFileClick} />
          </Column>
          <Column width={13} style={{ overflowY: 'scroll' }}>
            {this.state.currentFile && (
              <FileViewer file={fileManager.file(this.state.currentFile)} />
            )}
          </Column>
        </Grid>
      </Segment>
    )
  }
}

export default FileManager
