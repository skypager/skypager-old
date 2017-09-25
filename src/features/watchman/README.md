```javascript

skypager.feature('watchman').enable()

// this will do the following whenever a file changes
skypager.watchman.on("receivedFileNotification", ((resp, {
  // the options that were passed to the watchman subscription
  subOptions,
  // the name of the watchman subscription
  name,
  // the extensions that are being watched
  extensions,
  // the patterns being watched
  patterns,
  // globs being watched
  globs,
  // fields subscribed to
  fields,
  // the path that triggered the notification
  relativePath
} = {}) => {
  
})
```
