import * as Markdown from 'docTypes/markdown'

export class MarkdownDocument extends Component {
  static contextTypes = baseContextTypes

  componentWillMount() {
    const { doc } = this.props

    doc.visit(node => {
      console.log('node', node.type, node)
    })
  }

  render() {
    const { runtime } = this.context
    const { doc, components = {} } = this.props

    const processor = Markdown.standard({
      remarkReactComponents: {
        a: (props = {}) => {
          const { children, href = '' } = props

          return href.match(/^http/i) ? (
            <a href={href} target="_blank">
              {children}
            </a>
          ) : (
            <a onClick={() => runtime.navTo(href)}>{children}</a>
          )
        },
        ...components,
      },
    })

    return <div>{processor.stringify(doc.ast)}</div>
  }
}

export default MarkdownDocument
