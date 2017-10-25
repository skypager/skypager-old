import { React, Component, baseContextTypes } from '../../globals'
import PageWrapper from 'layouts/PageWrapper'
import MarkdownDocument from 'components/MarkdownDocument'

export class ViewDocument extends Component {
  static contextTypes = baseContextTypes

  handleNavigationClick = () => this.context.runtime.navigate('/', 'replace')

  constructor(props = {}, context = {}) {
    super(props, context)

    const { match: { params } } = this.props
    const { pageId } = params

    this.state = { pageId }
  }

  componentWillReceiveProps({ match } = {}) {
    const { params = {} } = match
    const { pageId } = params
    const { params: current } = this.props.match

    if (current.pageId !== pageId) {
      try {
        this.setState({ pageId, doc: runtime.docFiles.lookup(pageId) })
      } catch (error) {
        this.setState({ pageId, error: `Error: ${error.message}`, doc: undefined })
      }
    }
  }

  render() {
    const { runtime } = this.context
    const { pageId, doc, error } = this.state

    return (
      <PageWrapper headerContent="Skypager" headerIcon="home" showToggle={false}>
        <div>
          {doc && !error && <MarkdownDocument doc={doc} />}
          {!doc && error && <Message style={{ width: '50%' }} content={error} />}
        </div>
      </PageWrapper>
    )
  }
}

export default ViewDocument
