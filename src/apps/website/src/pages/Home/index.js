import { React, Component, baseContextTypes } from '../../globals'
import PageWrapper from 'layouts/PageWrapper'
import SkypagerLogo from 'components/SkypagerLogo'
import MarkdownDocument from 'components/MarkdownDocument'

export class Home extends Component {
  static contextTypes = baseContextTypes

  handleNavigationClick = () => this.context.runtime.navigate('/', 'replace')

  render() {
    const { runtime } = this.context
    const doc = runtime.docFiles.lookup('index')

    console.log('Doc', doc)
    return (
      <PageWrapper
        headerContent="Skypager"
        headerIcon="home"
        showToggle={false}>
        <div>Home</div>
      </PageWrapper>
    )
  }
}

export default Home
