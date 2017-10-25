import { Icon, baseContextTypes, React, Component } from '../globals'

export class SidebarToggle extends Component {
  static contextTypes = baseContextTypes

  handleToggle = () => {
    const { runtime } = this.context
    const { sidebarIsVisible } = runtime.currentState
    runtime.state.set('sidebarIsVisible', !sidebarIsVisible)
  }

  render() {
    const hidden =
      !this.props.alwaysVisible && !!this.context.runtime.get('currentState.sidebarIsVisible')

    return (
      !hidden && (
        <div style={{ marginTop: '4px', marginLeft: '4px' }}>
          <Icon circular name="bars" onClick={this.handleToggle} />
        </div>
      )
    )
  }
}

export default SidebarToggle
