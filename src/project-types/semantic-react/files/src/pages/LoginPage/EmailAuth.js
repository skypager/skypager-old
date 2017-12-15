import { types, runtime, React, Component } from '../../globals.js'
import {
  Icon,
  Button,
  Header,
  Container,
  Form,
  Segment
} from '../../globals.js'

export class EmailAuthForm extends Component {
  static contextTypes = {
    runtime: types.object,
    database: types.object,
    auth: types.object,
    firebase: types.object
  }

  state = {
    email: '',
    password: ''
  }

  handleFieldChange = (e, { name, value } = {}) =>
    this.setState({ error: false, errorMessage: undefined, [name]: value })

  handleLoginClick = e => {
    e.preventDefault()

    const { email, password } = this.state
    const { runtime } = this.context

    this.setState({ error: false, errorMessage: undefined })

    runtime.login({ email, password, uid: email }).catch(error => {
      const { code, message } = error
      console.log('Error while logging in', error)
      this.setState({
        error: true,
        errorMessage: this.formatErrorMessage(code, message)
      })
    })
  }

  formatErrorMessage = (code, message) => {
    switch (code) {
      case 'auth/wrong-password':
      default:
        return 'The password is invalid'
    }
  }

  render() {
    const { error = false, errorMessage } = this.state

    return (
      <Segment>
        <Header as="h4" content="Login" icon="lock" />
        <Form error={error} onSubmit={e => e.preventDefault()}>
          {error && (
            <Message error header="Login Error" content={errorMessage} />
          )}
          <Form.Input
            name="email"
            type="email"
            key="email"
            label="E-Mail"
            placeholder="Enter your E-Mail address"
            onChange={this.handleFieldChange}
          />
          <Form.Input
            type="password"
            name="password"
            key="password"
            label="Password"
            placeholder="Enter your password"
            error={error}
            onChange={this.handleFieldChange}
          />
          <Segment clearing basic>
            <Button.Group floated="right">
              <Button onClick={this.handleLoginClick} primary>
                Login
              </Button>
            </Button.Group>
          </Segment>
        </Form>
      </Segment>
    )
  }
}

export default EmailAuthForm
