try {
  skypager.use(require(skypager.packageFinder.attemptResolve('skypage')), 'INITIALIZING')
} catch (error) {
  skypager.mainError = error
}
