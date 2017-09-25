const React = skypager.React
const { Component } = React

export class NotFound extends Component {
  render() {
    return (
      <div className="page container">
        <div className="row">
          <div className="col" />
          <div className="col-8" style={{ paddingTop: "40px" }}>
            <h4>Sorry</h4>
            <div style={{ paddingTop: "12px" }} className="">
              &nbsp;
            </div>
            <div style={{ paddingTop: "12px" }} className="alert alert-danger">
              The page could not be found
            </div>
          </div>
          <div className="col" />
        </div>
      </div>
    )
  }
}

export default NotFound
