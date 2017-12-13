import { types, runtime, React, Component } from '../../globals.js'
import { Container, Grid, Column as Col, Row } from '../../globals.js'
import EmailAuthForm from './EmailAuth'
import MainHeader from 'components/MainHeader'

export class LoginPage extends Component {
  static contextTypes = {
    runtime: types.object
  }

  componentWillMount() {
    const { runtime } = this.context
    const { history } = this.props
    runtime.set('history', history)
  }

  render() {
    return (
      <Grid as={Container} fluid>
        <Row>
          <Col width={16}>
            <MainHeader />
          </Col>
        </Row>
        <Row>
          <Col width={16}>
            <EmailAuthForm />
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default LoginPage
