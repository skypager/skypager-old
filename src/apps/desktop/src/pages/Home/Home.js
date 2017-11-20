import { types, Component } from '../../globals'

export class Home extends Component {
  static contextTypes = {
    main: types.object,
    runtime: types.object,
  }

  render() {
    const { main } = this.context
    return <div>{main.cwd}</div>
  }
}

export default Home
