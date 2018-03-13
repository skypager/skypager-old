/*
const url = await ngrok.connect({
    proto: 'http', // http|tcp|tls, defaults to http
    addr: 8080, // port or network address, defaultst to 80
    auth: 'user:pwd', // http basic authentication for tunnel
    subdomain: 'alex', // reserved tunnel name https://alex.ngrok.io
    authtoken: '12345', // your authtoken from ngrok.com
    region: 'us', // one of ngrok regions (us, eu, au, ap), defaults to us
    configPath: '~/git/project/ngrok.yml' // custom path for ngrok config file
    binPathReplacer: ['app.asar/bin', 'app.asar.unpacked/bin'] // path replacer when using for production in electron
});
*/

import ngrok from 'ngrok'

export const shortcut = 'tunnel'

export const featureMethods = ['start', 'getNgrok']

export function getNgrok() {
  return ngrok
}

export async function start(options = {}) {
  const { runtime } = this
  let { authToken } = options

  if (!authToken) {
    if (runtime.fsx.existsSync(runtime.join('secrets', 'ngrok.json'))) {
      options = {
        ...runtime.fsx.readJsonSync(runtime.join('secrets', 'ngrok.json')),
        ...options
      }
    }

    authToken = options.authToken || runtime.get('environment.NGROK_AUTH_TOKEN')
  }

  if (!authToken) {
    throw new Error('Missing Ngrok Auth Token')
  }

  options = {
    authToken,
    ...this.options,
    ...options
  }

  const url = await ngrok.connect(options)

  if (options.openInBrowser || options.open) {
    Promise.resolve(runtime.opener.openInBrowser(url))
  }

  return url
}
