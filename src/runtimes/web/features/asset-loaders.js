export const createGetter = "assetLoader"

export const featureMethods = ["injectScript"]

export function injectScript(src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, el) => (err ? reject(err) : resolve(el)))
  })
}

// eslint-disable
export function loadScript(src, callback) {
  var s, r, t
  r = false
  s = document.createElement("script")
  s.type = "text/javascript"
  s.src = src
  s.onload = s.onreadystatechange = function() {
    //console.log( this.readyState ); //uncomment this line to see which ready states are called.
    if (!r && (!this.readyState || this.readyState == "complete")) {
      r = true
      callback(null, s)
    }
  }
  t = document.getElementsByTagName("script")[0]
  t.parentNode.insertBefore(s, t)
}
