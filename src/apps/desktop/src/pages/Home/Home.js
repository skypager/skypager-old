import { types, Component } from '../../globals'

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
    return <div>HI. What up?</div>
  }
}

export default Home
