const React = skypager.React
const { Component } = React

import Logo from "../../assets/skypager-logo-1024.png"

export class Home extends Component {
  render() {
    return (
      <div className="page container">
        <h1>Alright where is this API</h1>
        <img src={Logo} height={512} width={512} />
      </div>
    )
  }
}

export default Home
