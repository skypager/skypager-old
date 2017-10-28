import { React, Component, baseContextTypes } from '../../globals'
import PageWrapper from 'layouts/PageWrapper'
import MarkdownDocument from 'components/MarkdownDocument'
import Editor from 'components/Editor'

export class ViewDocument extends Component {
  static contextTypes = baseContextTypes

  handleNavigationClick = () => this.context.runtime.navigate('/', 'replace')

  constructor(props = {}, context = {}) {
    super(props, context)

    const { match: { params } } = this.props
    const { pageId } = params

    this.state = { pageId }
  }

  componentDidMount() {
    const { match } = this.props
    const { params = {} } = match
    const { pageId } = params

    if (!pageId) {
      this.setState({ doc: undefined, error: `Must supply a pageId parameter` })
      return
    }

    try {
      this.setState({ pageId, doc: runtime.docFiles.lookup(pageId), error: undefined })
    } catch (error) {
      this.setState({ pageId, error: `Error: ${error.message}`, doc: undefined })
    }
  }

  componentWillReceiveProps({ match } = {}) {
    const { params = {} } = match
    const { pageId } = params
    const { params: current } = this.props.match

    if (current.pageId !== pageId) {
      try {
        this.setState({ pageId, doc: runtime.docFiles.lookup(pageId), error: undefined })
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
        <Segment piled style={{ width: '80%' }}>
          {doc && !error && <MarkdownDocument doc={doc} />}
          {!doc && error && <Message style={{ width: '50%' }} content={error} />}
        </Segment>
      </PageWrapper>
    )
  }
}

export default ViewDocument
