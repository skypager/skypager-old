export const questions = {
  featureName: {
    description:
      'What is the name of the feature? You can namespace this with a slash if you want.',
    required: true
  },
  sourcePath: {
    description: 'Where should the feature live?',
    default: 'src/features'
  }
}

export const run = async (params = {}, { runtime } = {}) => {
  const { sourcePath, featureName } = params
  const { print } = runtime.cli

  print(`Generating ${featureName} in ${sourcePath}/${featureName}.js`)

  await runtime.fsx.mkdirpAsync(
    runtime.pathUtils.dirname(runtime.resolve(sourcePath, `${featureName}.js`))
  )

  await runtime.fsx.writeFileAsync(
    runtime.resolve(sourcePath, `${featureName}.js`),
    featureTemplate(params, runtime).trim() + '\n',
    'utf8'
  )

  return params
}

export const featureTemplate = ({ featureName } = {}, runtime) => {
  return `
// Creates a getter on runtime that lets you interact with your feature
export const shortcut = "${runtime.stringUtils.camelCase(
    featureName.replace(/\//g, '_')
  )}"

/**
  Feature Methods are the public interface for your feature.

  They should reference functions or values that are exported by your module.
*/
export const featureMethods = [
  // this will be available as runtime.${runtime.stringUtils.camelCase(
    featureName.replace(/\//g, '_')
  )}.myFunction()
  'myFunction',
  // this will create a getter property. Useful for computed properties which don't change often, or aliases to other things
  'getMyAttribute',
  // this will create a getter property which is only run once.
  'lazyLoadedAttribute'
]

/**
  Host Methods are similar to featureMethods, except they get placed on the runtime.
*/
export const hostMethods = [
  'myHostExtension'
]

// will be available as runtime.myHostExtension()
export function myHostExtension(options = {}, context = {}) { }

// will be available as runtime.${runtime.stringUtils.camelCase(
    featureName.replace(/\//g, '_')
  )}.myFunction
export function myFunction(options = {}, context = {}) {}

// will be available as runtime.${runtime.stringUtils.camelCase(
    featureName.replace(/\//g, '_')
  )}.myAttribute
export function getMyAttribute(options = {}, context = {}) {}

// will be available as runtime.${runtime.stringUtils.camelCase(
    featureName.replace(/\//g, '_')
  )}.loadedAttribute
export function lazyLoadedAttribute(options = {}, context = {}) {}

/** OPTIONAL CUSTOMIZATIONS **/
/**
controls how the featureMethod functions are applied to your feature.
Mainly the purpose is to control the arguments these functions are called with.

Feel free to delete this if you don't need it.

export function featureMixinOptions() {
  return {
    // these values will automaticaly be appended or prepended to the function when called
    partial: [this.runtime.context],
    // when right is true, we use partialRight instead of partial
    right: true,
    // insert options will automatically pass an options hash by default to your function
    // You can should disable this when you want absolute control over the method arguments.
    insertOptions: true,
    // transformKeys is responsible for converting functions which are prefixed with get or lazy
    // into the desired attribute type, using skypager.propUtils
    transformKeys: true,
    // if hidden is true, the featureMethods will be created as non-enumerable properties
    hidden: true
    // scope controls the binding that will be used for the feature method
    scope: this
  }
}
*/


// Same as featureMixinOptions. Delete if you don't need it.
/**
export function hostMixinOptions() {
  return {
    scope: this.runtime,
    partial: [this.runtime.context],
    insertOptions: true,
    hidden: false,
    transformKeys: true
  }
}
*/

`
}
