import { types, Component } from '../../globals'
import TopMenuAppLayout from 'layouts/TopMenuAppLayout'

export class Home extends Component {
  static contextTypes = {
    main: types.object,
    runtime: types.object,
  }

  state = {}

  async componentWillMount() {
    const { runtime } = this.context
    const { history } = this.props

    runtime.history = history
    runtime.navigate = link => history.push(link)
  }

  render() {
    const { runtime } = this.context
    const { menuItems } = runtime.currentState
    return (
      <TopMenuAppLayout showTop menuItems={menuItems}>
        <div>HI. What up?</div>
      </TopMenuAppLayout>
    )
  }
}

export default Home
