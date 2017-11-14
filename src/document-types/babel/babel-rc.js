import pick from 'lodash/pick'

module.exports = function(options = {}) {
  const {
    node = '6.11.1',
    browsers = [
      'Chrome >= 52',
      'FireFox >= 44',
      'Safari >= 7',
      'Explorer 11',
      'last 4 Edge versions',
    ],
    additionalPlugins = [],
    plugins = [
      'transform-decorators-legacy',
      'transform-class-properties',
      'syntax-class-properties',
    ],
  } = options

  const targets = {}

  if (node !== false) {
    targets.node = node
  }

  if (browsers !== false) {
    targets.browsers = browsers
  }

  return {
    presets: [
      [
        'env',
        {
          targets: {
            node,
            browsers,
          },
          useBuiltIns: true,
          ...pick(options, 'modules', 'debug', 'useBuiltIns'),
        },
      ],
      'stage-0',
      'react',
    ],
    plugins: [...(plugins === false ? [] : plugins), ...additionalPlugins],
  }
}
