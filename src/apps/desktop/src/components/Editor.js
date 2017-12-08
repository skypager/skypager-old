import AceEditor from 'react-ace'
import ace from 'brace'
import 'brace/mode/jsx'
import 'brace/mode/html'
import 'brace/mode/markdown'
import 'brace/theme/tomorrow'
import 'brace/theme/monokai'

const { types } = global

/**
import { parentComponents } from 'docs/app/utils'

// Set up custom completers by using a ace extension
// https://github.com/thlorenz/brace/issues/19
const languageTools = ace.acequire('ace/ext/language_tools')

const semanticUIReactCompleter = {
  getCompletions(editor, session, pos, prefix, callback) {
    const completions = []

    _.each(parentComponents, (component) => {
      const { name } = component._meta
      // Component
      completions.push({ caption: name, value: name, meta: 'Component' })

      // Its props (propTypes do not exist in prod, use handledProps added by babel)
      _.each(component.handledProps, (propName) => {
        // don't add duplicate prop completions
        if (_.find(completions, { value: propName })) return

        completions.push({ caption: propName, value: propName, meta: 'Component Prop' })
      })
    })
    callback(null, completions)
  },
}

languageTools.addCompleter(semanticUIReactCompleter)
*/

function Editor(props) {
  const { id, mode, value, onChange, theme = 'tomorrow', ...rest } = props

  return (
    <AceEditor
      name={id || 'empty-editor'}
      mode={mode}
      theme={theme}
      width="100%"
      height="95%"
      value={value}
      onChange={onChange}
      editorProps={{ $blockScrolling: Infinity }}
      highlightActiveLine={true}
      minLines={40}
      showGutter={true}
      showPrintMargin={false}
      wrapEnabled
      tabSize={2}
      {...rest}
    />
  )
}

Editor.propTypes = {
  id: types.string.isRequired,
  mode: types.oneOf(['html', 'jsx', 'markdown']),
  value: types.string.isRequired,
}

Editor.defaultProps = {
  mode: 'jsx',
}

export default Editor
