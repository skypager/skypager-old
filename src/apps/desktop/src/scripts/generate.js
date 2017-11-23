const questions = {
  generatorType: {
    description: 'Which generator do you want to run? page, component',
    ask: () => !runtime.get('argv._[2]', '').length,
  },
}

const { randomBanner, clear, print, prompt } = runtime.cli // eslint-disable-line
const { mapKeys, invert, values, keys } = runtime.lodash // eslint-disable-line

const component = require(skypager.resolve('src/generators/component.js'))
const page = require(skypager.resolve('src/generators/page.js'))

async function main() {
  clear()

  randomBanner('Skypager', { font: 'Slant' })

  prompt.start()

  prompt.message = ''
  prompt.delimter = ''

  const initial = await ask(questions)

  let { generatorType } = initial

  if (generatorType.length === 0) {
    generatorType = runtime.get('argv._[2]')
  }

  if (generatorType === 'page') {
    const pageData = await ask(page.questions)
    await page.run(pageData, this).catch(e => {
      print(`Error: ${e.message}`)
    })
  } else if (generatorType === 'component') {
    const componentData = await ask(component.questions)
    await component.run(componentData, this).catch(e => {
      print(`Error: ${e.message}`)
    })
  } else {
    print(`Unknown generator type: ${generatorType}`)
  }
}

function ask(schema) {
  return new Promise((resolve, reject) => {
    prompt.get({ properties: schema }, (err, results) => (err ? reject(err) : resolve(results)))
  })
}

runtime.fileManager
  .whenActivated()
  .then(main)
  .catch(e => {
    print(`Error: ${e.message}`)
  }) // eslint-disable-line
