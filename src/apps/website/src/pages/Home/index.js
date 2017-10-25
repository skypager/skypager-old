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

    return (
      <PageWrapper headerContent="Skypager" headerIcon="home" showToggle={false}>
        {this.props.location.pathname}
        <MarkdownDocument doc={doc} />
      </PageWrapper>
    )
  }
}

export default Home
