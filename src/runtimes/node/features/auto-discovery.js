export const shortcut = 'autoDiscovery'

export const featureMethods = [
  'discover',
  'discoverFeatures',
  'discoverProjectTypes',
  'discoverHelpers',
  'discoverRuntimes',
  'getPackageFinder',
  'find',
]

export function observables() {
  return {
    helpers: ['shallowMap', {}],
    runtimes: ['shallowMap', {}],
    projectTypes: ['shallowMap', {}],
    features: ['shallowMap', {}],
    discoveredHelpers: [
      'computed',
      function() {
        return Object.keys(this.helpers.toJSON())
      },
    ],
    discoveredRuntimes: [
      'computed',
      function() {
        return Object.keys(this.runtimes.toJSON())
      },
    ],
    discoveredProjectTypes: [
      'computed',
      function() {
        return Object.keys(this.projectTypes.toJSON())
      },
    ],
    discoveredFeatures: [
      'computed',
      function() {
        return Object.keys(this.features.toJSON())
      },
    ],
  }
}

export function getPackageFinder() {
  return this.runtime.packageFinder
}

export function find(...args) {
  return this.packageFinder.find(...args)
}

export async function discover(options = {}) {
  await this.discoverRuntimes()
  await this.discoverHelpers()
  await this.discoverFeatures()
  await this.discoverProjectTypes()

  return this
}

export async function discoverProjectTypes(options = {}) {
  const { prefix = 'skypager-project-types-' } = options
  const projectTypes = await this.find(new RegExp(prefix), { parse: 'matches' })

  projectTypes.forEach(projectType => {
    const id = projectType.name.replace(prefix, '')
    this.projectTypes.set(id, projectType)
  })

  return this.projectTypes.toJSON()
}

export async function discoverHelpers(options = {}) {
  const { prefix = 'skypager-helpers-' } = options
  const helpers = await this.find(new RegExp(prefix), { parse: 'matches' })

  helpers.forEach(helper => {
    const id = helper.name.replace(prefix, '')
    this.helpers.set(id, helper)
  })

  return this.helpers.toJSON()
}

export async function discoverFeatures(options = {}) {
  const { prefix = 'skypager-features-' } = options
  const features = await this.find(new RegExp(prefix), { parse: 'matches' })

  features.forEach(feature => {
    const id = feature.name.replace(prefix, '')
    this.features.set(id, feature)
  })

  return this.features.toJSON()
}

export async function discoverRuntimes(options = {}) {
  const { prefix = 'skypager-runtimes-' } = options
  const runtimes = await this.find(new RegExp(prefix), { parse: 'matches' })

  runtimes.forEach(runtime => {
    const id = runtime.name.replace(prefix, '')
    this.runtimes.set(id, runtime)
  })

  return this.runtimes.toJSON()
}
