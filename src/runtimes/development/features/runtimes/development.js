export function featureWasEnabled() {
  const { runtime } = this

  /**

  TODO: Investigate whether I can do this

  runtime.lazy('webpacks', () => {
    runtime.use(require("skypager-helpers-webpack"))
    return runtime.webpacks
  })
  **/

  runtime
    .use(require('skypager-helpers-webpack'))
    .use(require('skypager-helpers-project-type'))
    .use(require('skypager-helpers-document'))
    .use(require('skypager-helpers-project'))
}
