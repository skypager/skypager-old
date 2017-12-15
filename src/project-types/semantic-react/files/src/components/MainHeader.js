import { types, Component, Header, Image } from 'globals'

export class MainHeader extends Component {
  state = {}

  static contextTypes = {
    runtime: types.object
  }

  static defaultProps = {
    subheader: 'Web Boilerplate Project',
    title: 'Skypager'
  }

  render() {
    const { runtime } = this.context
    const { title, subheader } = this.props
    return (
      <Header as="h2" onClick={() => runtime.history.push('/')}>
        <Header.Content onClick={() => runtime.history.push('/')}>
          {title}
          <Header.Subheader>{subheader}</Header.Subheader>
        </Header.Content>
      </Header>
    )
  }
}

export default MainHeader
