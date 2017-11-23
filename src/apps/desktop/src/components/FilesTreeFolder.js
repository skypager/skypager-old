import { types, Component } from '../globals'

export class FilesTreeFolder extends Component {
  static contextTypes = { fileManager: types.object, runtime: types.object }

  state = {
    expanded: false,
  }

  handleClick = e => {
    e.preventDefault()

    this.setState(current => ({
      ...current,
      expanded: !this.state.expanded,
    }))
  }

  render() {
    const { directoryId, onFileClick } = this.props
    const { fileManager } = this.context
    const { dirname } = fileManager.runtime.pathUtils
    const { expanded } = this.state
    const depth = directoryId.split('/').length
    const childDirectories = fileManager.directoryIds.filter(
      v => v.startsWith(directoryId) && v.split('/').length === depth + 1
    )

    const childFiles = fileManager.fileIds.filter(fileId => dirname(fileId) === directoryId)

    return (
      <List.Item key={directoryId}>
        <List.Icon
          onClick={this.handleClick}
          name={expanded ? `folder open outline` : 'folder outline'}
        />
        <List.Content>
          <List.Header onClick={this.handleClick}>{directoryId.split('/').pop()}</List.Header>
          {expanded && (
            <List.List>
              {childDirectories.map(dir => (
                <FilesTreeFolder onFileClick={onFileClick} key={dir} directoryId={dir} />
              ))}
              {childFiles.map(fileId => (
                <List.Item key={fileId} id={fileId} onClick={onFileClick}>
                  <List.Icon name="file outline" />
                  <List.Content>
                    <List.Header>{fileId.split('/').pop()}</List.Header>
                  </List.Content>
                </List.Item>
              ))}
            </List.List>
          )}
        </List.Content>
      </List.Item>
    )
  }
}

export default FilesTreeFolder
