import { React, Component, baseContextTypes } from '../../globals'
import PageWrapper from 'layouts/PageWrapper'

export class Home extends Component {
  static contextTypes = baseContextTypes

  handleNavigationClick = () => this.context.runtime.navigate('/', 'replace')

  render() {
    return (
      <PageWrapper headerContent="Skypager" headerIcon="home">
        <div>HOME</div>
      </PageWrapper>
    )
  }
}

export default Home
