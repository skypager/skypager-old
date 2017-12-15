async function discoverLocalWebpackModules() {
  const { skywalker } = skypager

  await skywalker.projectWalker('src').run()

  const requireContext = skywalker.requireContext('src/webpacks/*', { glob: true })

  console.log(requireContext.keys())

  skypager.hide('localWebpackModules', requireContext)
}

discoverLocalWebpackModules().catch(error => {
  runtime.setState({ discoverLocalWebpackModulesError: error })
})
