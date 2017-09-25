export default async function selectTemplateContent(chain, options = {}) {
  const content = await this.bootstrapThemes.renderTemplate(id, options)
  return chain.plant({ id, options, content })
}
