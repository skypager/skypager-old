export function featureWasEnabled() {
  const { runtime } = this

  runtime
    .use(require("skypager-helpers-project-type"))
    .use(require("skypager-helpers-webpack"))
    .use(require("skypager-helpers-document"))
    .use(require("skypager-helpers-project"))
    .use(require("skypager-features-document-database"))
}
