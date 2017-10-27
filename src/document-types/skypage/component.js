export function component(options = {}, { React, runtime, types }) {
  return class Skypage extends React.Component {
    static childContextTypes = {
      runtime: types.object,
    }

    static propTypes = {
      runtime: types.object.isRequired,
      doc: types.object.isRequired,
      components: types.object,
    }

    static defaultProps = {
      runtime,
      components: {},
      wrapper: 'div',
    }

    getChildContext() {
      return {
        runtime: this.props.runtime,
      }
    }

    render() {
      const { wrapper, doc, components: remarkReactComponents, runtime } = this.props

      const children = runtime.documentTypes('skypage').compile(doc.ast, { remarkReactComponents })

      return React.createElement(wrapper, { doc, children })
    }
  }
}

export default component
