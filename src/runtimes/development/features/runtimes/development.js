export function featureWasEnabled() {
  const { runtime } = this

  /**

  TODO: Investigate whether I can do this

  runtime.lazy('webpacks', () => {
    runtime.use(require("skypager-helpers-webpack"))
    return runtime.webpacks
  })
  **/

  const attached = {}

  const lazyAttach = (baseName, fn) => {
    runtime.lazy(baseName, () => {
      if (attached[baseName]) {
        return runtime[baseName]
      }

      fn()
      attached[baseName] = true

      return runtime[baseName]
    })

    runtime.lazy(`${baseName}s`, () => {
      if (attached[baseName]) {
        return runtime[`${baseName}s`]
      }

      fn()
      attached[baseName] = true

      return runtime[`${baseName}s`]
    })
  }

  runtime.hideGetter('attachedDevHelpers', () => attached)

  if (runtime.commandBase === 'webpack' || runtime.argv.webpack || runtime.argv.SKYPAGER_DEV) {
    runtime.use(require('skypager-helpers-webpack'))
  } else {
    lazyAttach('webpack', () => {
      runtime.use(require('skypager-helpers-webpack'))
    })
  }

  lazyAttach('projectType', () => {
    runtime.use(require('skypager-helpers-project-type'))
  })

  lazyAttach('document', () => {
    runtime.use(require('skypager-helpers-document'))
  })

  lazyAttach('project', () => {
    runtime.use(require('skypager-helpers-project'))
  })

  lazyAttach('deployment', () => {
    runtime.use(require('skypager-helpers-deployment'))
  })
}
