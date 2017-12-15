import { Segment, Container, types, Component } from 'globals'
import MainHeader from 'components/MainHeader'

export class PublicHome extends Component {
  state = {}

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
      <Container>
        <MainHeader />
        <Segment piled>
          <Link to="/" children="Home" />
          <br />
          <Link to="/about-us" children="About" />
          <br />
          <Link to="/contact" children="Contact" />
          <br />
          <Link to="/faq" children="FAQ" />
          <br />
          <Link to="/industries" children="Industries" />
          <br />
          <Link to="/industries/plastics" children="Industry Page" />
          <br />
          <Link to="/privacy" children="Privacy" />
          <br />
          <Link to="/purchase-agreement" children="Purchase Agreement" />
          <br />
          <Link to="/referral" children="Referral" />
          <br />
          <Link to="/refunds-and-returns" children="Refunds" />
          <br />
          <Link to="/terms-of-use" children="Terms" />
          <br />
          <Link to="/testimonials" children="Testimonials" />
        </Segment>
      </Container>
    )
  }
}

export default PublicHome
