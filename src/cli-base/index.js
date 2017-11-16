export const currentEnv =
  process.env.SKYPAGER_ENV || (process.env.NODE_ENV = process.env.NODE_ENV || 'development')

if (!process.env.DISABLE_SKYPAGER_BABEL && isModAvailable('babel-register')) {
  try {
    __non_webpack_require__('babel-register')
  } catch (error) {}
}

export function isModAvailable(mod) {
  try {
    return __non_webpack_require__.resolve(mod)
  } catch (error) {
    return false
  }
}

export const availableRuntimes = () => ({
  base: isModAvailable('skypager/runtime') || isModAvailable('skypager-runtime'),
  node: isModAvailable('runtimes/node') || isModAvailable('skypager-runtimes-node'),
  universal: isModAvailable('runtimes/universal') || isModAvailable('skypager-runtimes-universal'),
  development:
    isModAvailable('runtimes/development') || isModAvailable('skypager-runtimes-development'),
  web: isModAvailable('runtimes/web') || isModAvailable('skypager-runtimes-web'),
  electron: isModAvailable('runtimes/electron') || isModAvailable('skypager-runtimes-electron'),
  react: isModAvailable('runtimes/react') || isModAvailable('skypager-runtimes-react'),
})

export async function main(argv = {}) {
  const available = availableRuntimes()

  if (!available.node && !available.base && !available.universal && !available.development) {
    throw new Error('Missing any valid skypager runtimes. Install the skypager package')
  }

  const base =
    currentEnv === 'development'
      ? __non_webpack_require__('skypager-runtimes-development')
      : __non_webpack_require__('skypager-runtimes-node')

  await base.start()

  return base
}

export default main
