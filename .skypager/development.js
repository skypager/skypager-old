async function discoverLocalWebpackModules() {
  const { skywalker } = skypager

  await skywalker.projectWalker('src').run()

  const requireContext = skywalker.requireContext('src/webpacks/*', { glob: true })

  skypager.hide('localWebpackModules', requireContext)
}

discoverLocalWebpackModules().catch(error => {
  skypager.setState({ discoverLocalWebpackModulesError: error })
})

try {
  skypager.use(skypager.packageFinder.attemptResolve('skypager-deployments-aws'))
} catch (error) {
  skypager.setState({ awsDeploymentsError: error })
}
