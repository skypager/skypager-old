import component from './component'
import Document from 'skypager-helpers-document'
import * as docType from './docType'

export function initializer(next) {
  try {
    const runtime = this

    Document.attach(runtime)

    runtime.documentTypes.register('skypage', () => docType)

    runtime.lazy('Skypage', () =>
      component(
        {},
        {
          runtime,
          React: runtime.get('React', global.React),
          types: runtime.get('reactPropTypes', global.ReactPropTypes || global.types),
        }
      )
    )

    next()

    return runtime
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export default initializer
