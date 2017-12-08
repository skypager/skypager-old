import { types, List, Component } from '../globals'
import FilesTreeFolder from 'components/FilesTreeFolder'

export class FilesTree extends Component {
  static contextTypes = { main: types.object, runtime: types.object }

  static childContextTypes = {
    fileManager: types.object,
  }

  static propTypes = {
    fileManager: types.shape({
      files: types.object,
      directories: types.object,
      directoryObjects: types.arrayOf(
        types.shape({
          relative: types.string,
          path: types.string,
          states: types.object,
        })
      ),
      fileObjects: types.arrayOf(
        types.shape({
          relative: types.string,
          path: types.string,
          states: types.object,
        })
      ),
    }),
  }

  getChildContext() {
    return { fileManager: this.props.fileManager }
  }

  renderFolder = directoryId => (
    <FilesTreeFolder {...this.props} directoryId={directoryId} key={directoryId} />
  )

  shouldComponentUpdate() {
    return false
  }

  render() {
    const { onFileClick, fileManager, style = {}, listProps = {} } = this.props
    const directoryIds = fileManager.directoryIds.filter(v => v.length && v.split('/').length === 1)
    const fileIds = fileManager.fileIds.filter(v => v.length && v.split('/').length === 1)

    return (
      <List style={style} {...listProps}>
        {directoryIds.filter(v => v.length).map(this.renderFolder)}
        {fileIds.map(fileId => (
          <List.Item key={fileId} id={fileId} onClick={onFileClick}>
            <List.Icon name="file outline" />
            <List.Content onClick={onFileClick}>{fileId.split('/').pop()}</List.Content>
          </List.Item>
        ))}
      </List>
    )
  }
}

export default FilesTree
