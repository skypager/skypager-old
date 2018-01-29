async function discoverLocalWebpackModules() {
  const { skywalker } = skypager

  await skywalker.projectWalker('src').run()

  const requireContext = skywalker.requireContext('src/webpacks/*', { glob: true })

  skypager.hide('localWebpackModules', requireContext)
}

discoverLocalWebpackModules().catch(error => {
  runtime.setState({ discoverLocalWebpackModulesError: error })
})

skypager.use(require('skypager-helpers-deployment')).use(require('skypager-deployments-aws'))
