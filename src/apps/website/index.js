const React = skypager.React
const { render } = require("react-dom")
const { Component } = React
const { observer } = skypager.mobxReact

@observer
class Website extends Component {
  state = {}

  render() {
    return (
      <div className="container">
        <div className="row">
          <h1>Hi</h1>
        </div>
      </div>
    )
  }
}

render(<Website />, document.getElementById("app"))
