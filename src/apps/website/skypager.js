skypager.webpacks.register('dev', () =>
  require(skypager.join('src', 'webpacks', 'dev.js'))
)
skypager.webpacks.register('prod', () =>
  require(skypager.join('src', 'webpacks', 'prod.js'))
)
