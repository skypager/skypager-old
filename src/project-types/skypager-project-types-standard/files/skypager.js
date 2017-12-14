try {
  skypager.webpacks.register('dev', () =>
    require(skypager.join('src', 'webpacks', 'dev.js'))
  )
  skypager.webpacks.register('prod', () =>
    require(skypager.join('src', 'webpacks', 'prod.js'))
  )
} catch (error) {
  skypager.REGISTRATION_ERROR = error
}

try {
  skypager.hide(
    'axios',
    require(skypager.packageFinder.attemptResolve('axios'))
  )

  skypager.fsx
    .readdirSync(skypager.resolve('src', 'selectors'))
    .map(file => [
      file.replace('.js', ''),
      skypager.resolve('src', 'selectors', file)
    ])
    .forEach(entry => {
      const [id, path] = entry

      try {
        skypager.selectors.register(id, require(path))
      } catch (error) {
        skypager.set(['selectorErrors', id], error)
      }
    })
} catch (error) {
  skypager.SELECTORS_ERROR = error
}
