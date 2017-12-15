import { types, runtime, React, Component } from '../../globals.js'
import {
  Icon,
  Button,
  Header,
  Container,
  Form,
  Segment
} from '../../globals.js'

export class MultiProviderAuthForm extends Component {
  static contextTypes = {
    runtime: types.object,
    database: types.object,
    storage: types.object,
    auth: types.object,
    firebase: types.object
  }

  state = {
    email: '',
    password: ''
  }

  handleFieldChange = (e, { name, value } = {}) =>
    this.setState({ [name]: value })

  handleLoginClick = () => {
    const { email, password } = this.state

    this.context.auth
      .signInWithEmailAndPassword(email, password)
      .then(currentUser => {
        // console.log('Current User', currentUser)
      })
      .catch(err => {
        const { code, message } = err
      })
  }

  handleGoogleLogin = () => {
    const { auth } = this.context.firebase
    const { GoogleAuthProvider } = auth
    const provider = new GoogleAuthProvider()

    provider.addScope('email')
    provider.addScope('offline')
    provider.addScope('https://www.googleapis.com/auth/drive')
    provider.addScope('https://www.googleapis.com/auth/spreadsheets')

    this.context.auth
      .signInWithPopup(provider)
      .then(result => {
        console.log('Logged in with Google', result)
      })
      .catch(err => {
        console.error('Error in google auth flow', err)
      })
  }

  handleGithubLogin = () => {
    const { auth } = this.context.firebase
    const { GithubAuthProvider } = auth
    const provider = new GithubAuthProvider()

    this.context.auth
      .signInWithPopup(provider)
      .then(result => {
        console.log('Logged in with Github', result)
      })
      .catch(err => {
        console.error('Error in github auth flow', err)
      })
  }

  render() {
    return (
      <Container style={{ paddingTop: '40px' }}>
        <Segment>
          <Header as="h1" content="Login" icon="lock" />
          <Grid
            columns="sixteen"
            style={{ paddingTop: '20px', paddingBottom: '20px' }}>
            <Col width={8}>
              <Form>
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
            </Col>
            <Col width={2}>
              <Divider vertical>OR</Divider>
            </Col>
            <Col width={6}>
              <Button color="red" onClick={this.handleGoogleLogin}>
                <Icon name="google" />&nbsp;Login with Google
              </Button>
              <div style={{ marginTop: '16px' }} />
              <Button color="black" onClick={this.handleGithubLogin}>
                <Icon name="github" />&nbsp;Login with Github
              </Button>
            </Col>
          </Grid>
        </Segment>
      </Container>
    )
  }
}

export default MultiProviderAuthForm
