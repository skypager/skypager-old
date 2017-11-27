import { List, Grid, GridColumn as Column, Link, types, Component } from '../../globals'
import SidebarLayout from 'layouts/SidebarLayout'
import Editor from 'components/Editor'
import FilesTree from 'components/FilesTree'

export class Home extends Component {
  static contextTypes = {
    main: types.object,
    runtime: types.object,
  }

  state = {}

  async componentWillMount() {
    const { runtime } = this.context
    const { history } = this.props
    runtime.navigate = link => history.push(link)
  }

  render() {
    const { runtime } = this.context
    const { menuItems = [] } = runtime.currentState
    const { sortBy } = runtime.lodash

    const cards = sortBy(menuItems.filter(v => v.content !== 'Home'), 'content')

    return (
      <Card.Group itemsPerRow={3} style={{ margin: '24px auto', width: '95%' }}>
        {cards.map((item, i) => (
          <Card onClick={item.onClick} key={i}>
            <Card.Content>
              <Card.Header>
                <Icon name={item.icon} />
                {item.content}
              </Card.Header>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    )
  }
}

export default Home
