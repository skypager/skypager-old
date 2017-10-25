import 'colors'

import React, { Component } from 'react' // eslint-disable-line

export class App extends Component {
  render() {
    return (
      <box width="100%" height="100%">
        <terminal
          parent={this.props.screen}
          cursor='line'
          cursorBlink
          screenKeys={false}
          label={'FreshREPL'.rainbow}
          border={{type: 'line'}}
          width='100%'
          height='50%'
          top='51%'
        />
      </box>
    )
  }
}

export default App
