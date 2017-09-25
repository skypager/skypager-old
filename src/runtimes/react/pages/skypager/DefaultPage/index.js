import React from "react"

export function DefaultPage(props = {}, context = {}) {
  return (
    <div className="container">
      <div className="col-6">
        <h1>Skypager</h1>
        <hr />
        <h4>This is the Default Page.</h4>
        <p>Begin by configuring routing and adding your own pages</p>
      </div>
    </div>
  )
}

export default DefaultPage
