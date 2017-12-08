try {
  const args = skypager.get('argv._', []).slice(2)

  const component = args[0] && args[0].match(/^[A-Z]/) ? args[0] : skypager.argv.component

  if (!component) {
    print(`Must specify a component`)
    process.exit(1)
  }

  let componentModule = require(skypager.join('src', 'components', `${component}.js`))
  let componentClass = componentModule.default
    ? componentModule.default
    : componentModule[component]

  console.log('Component Class', componentClass)
} catch (error) {
  print(error.message)
  process.exit(1)
}
