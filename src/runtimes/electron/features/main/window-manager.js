/**
@param width Integer (optional) - Window’s width in pixels. Default is 800.
@param height Integer (optional) - Window’s height in pixels. Default is 600.
@param x Integer (optional) (required if y is used) - Window’s left offset from screen. Default is to center the window.
@param y Integer (optional) (required if x is used) - Window’s top offset from screen. Default is to center the window.
@param useContentSize Boolean (optional) - The width and height would be used as web page’s size, which means the actual window’s size will include window frame’s size and be slightly larger. Default is false.
@param center Boolean (optional) - Show window in the center of the screen.
@param minWidth Integer (optional) - Window’s minimum width. Default is 0.
@param minHeight Integer (optional) - Window’s minimum height. Default is 0.
@param maxWidth Integer (optional) - Window’s maximum width. Default is no limit.
@param maxHeight Integer (optional) - Window’s maximum height. Default is no limit.
@param resizable Boolean (optional) - Whether window is resizable. Default is true.
@param movable Boolean (optional) - Whether window is movable. This is not implemented on Linux. Default is true.
@param minimizable Boolean (optional) - Whether window is minimizable. This is not implemented on Linux. Default is true.
@param maximizable Boolean (optional) - Whether window is maximizable. This is not implemented on Linux. Default is true.
@param closable Boolean (optional) - Whether window is closable. This is not implemented on Linux. Default is true.
@param focusable Boolean (optional) - Whether the window can be focused. Default is true. On Windows setting focusable: false also implies setting skipTaskbar: true. On Linux setting focusable: false makes the window stop interacting with wm, so the window will always stay on top in all workspaces.
@param alwaysOnTop Boolean (optional) - Whether the window should always stay on top of other windows. Default is false.
@param fullscreen Boolean (optional) - Whether the window should show in fullscreen. When explicitly set to false the fullscreen button will be hidden or disabled on macOS. Default is false.
@param fullscreenable Boolean (optional) - Whether the window can be put into fullscreen mode. On macOS, also whether the maximize/zoom button should toggle full screen mode or maximize window. Default is true.
@param skipTaskbar Boolean (optional) - Whether to show the window in taskbar. Default is false.
@param kiosk Boolean (optional) - The kiosk mode. Default is false.
@param title String (optional) - Default window title. Default is "Electron".
@param icon (NativeImage | String) (optional) - The window icon. On Windows it is recommended to use ICO icons to get best visual effects, you can also leave it undefined so the executable’s icon will be used.
@param show Boolean (optional) - Whether window should be shown when created. Default is true.
@param frame Boolean (optional) - Specify false to create a Frameless Window. Default is true.
@param parent BrowserWindow (optional) - Specify parent window. Default is null.
@param modal Boolean (optional) - Whether this is a modal window. This only works when the window is a child window. Default is false.
@param acceptFirstMouse Boolean (optional) - Whether the web view accepts a single mouse-down event that simultaneously activates the window. Default is false.
@param disableAutoHideCursor Boolean (optional) - Whether to hide cursor when typing. Default is false.
@param autoHideMenuBar Boolean (optional) - Auto hide the menu bar unless the Alt key is pressed. Default is false.
@param enableLargerThanScreen Boolean (optional) - Enable the window to be resized larger than screen. Default is false.
@param backgroundColor String (optional) - Window’s background color as Hexadecimal value, like #66CD00 or #FFF or #80FFFFFF (alpha is supported). Default is #FFF (white).
@param hasShadow Boolean (optional) - Whether window should have a shadow. This is only implemented on macOS. Default is true.
@param darkTheme Boolean (optional) - Forces using dark theme for the window, only works on some GTK+3 desktop environments. Default is false.
@param transparent Boolean (optional) - Makes the window transparent. Default is false.
@param type String (optional) - The type of window, default is normal window. See more about this below.
  titleBarStyle String (optional) - The style of window title bar. Default is default. Possible values are:
  default - Results in the standard gray opaque Mac title bar.
  hidden - Results in a hidden title bar and a full size content window, yet the title bar still has the standard window controls (“traffic lights”) in the top left.
  hidden-inset - Results in a hidden title bar with an alternative look where the traffic light buttons are slightly more inset from the window edge.
@param thickFrame Boolean (optional) - Use WS_THICKFRAME style for frameless windows on Windows, which adds standard window frame. Setting it to false will remove window shadow and window animations. Default is true.
@param vibrancy String (optional) - Add a type of vibrancy effect to the window, only on macOS. Can be appearance-based, light, dark, titlebar, selection, menu, popover, sidebar, medium-light or ultra-dark.
@param zoomToPageWidth Boolean (optional) - Controls the behavior on macOS when option-clicking the green stoplight button on the toolbar or by clicking the Window > Zoom menu item. If true, the window will grow to the preferred width of the web page when zoomed, false will cause it to zoom to the width of the screen. This will also affect the behavior when calling maximize() directly. Default is false.
@param tabbingIdentifier String (optional) - Tab group name, allows opening the window as a native tab on macOS 10.12+. Windows with the same tabbing identifier will be grouped together.
*/

export const VALID_BROWSER_WINDOW_OPTIONS = [
  "width",
  "height",
  "x",
  "y",
  "useContentSize",
  "center",
  "minWidth",
  "minHeight",
  "maxWidth",
  "maxHeight",
  "resizable",
  "movable",
  "minimizable",
  "maximizable",
  "closable",
  "focusable",
  "alwaysOnTop",
  "fullscreen",
  "fullscreenable",
  "skipTaskbar",
  "kiosk",
  "title",
  "icon",
  "show",
  "frame",
  "parent",
  "modal",
  "acceptFirstMouse",
  "disableAutoHideCursor",
  "autoHideMenuBar",
  "enableLargerThanScreen",
  "backgroundColor",
  "hasShadow",
  "darkTheme",
  "transparent",
  "type",
  "thickFrame",
  "vibrancy",
  "zoomToPageWidth",
  "tabbingIdentifier"
]

/**
@param devTools Boolean (optional) - Whether to enable DevTools. If it is set to false, can not use BrowserWindow.webContents.openDevTools() to open DevTools. Default is true.
@param nodeIntegration Boolean (optional) - Whether node integration is enabled. Default is true.
@param nodeIntegrationInWorker Boolean (optional) - Whether node integration is enabled in web workers. Default is false. More about this can be found in Multithreading.
@param preload String (optional) - Specifies a script that will be loaded before other scripts run in the page. This script will always have access to node APIs no matter whether node integration is turned on or off. The value should be the absolute file path to the script. When node integration is turned off, the preload script can reintroduce Node global symbols back to the global scope. See example here.
@param sandbox Boolean (optional) - If set, this will sandbox the renderer associated with the window, making it compatible with the Chromium OS-level sandbox and disabling the Node.js engine. This is not the same as the nodeIntegration option and the APIs available to the preload script are more limited. Read more about the option here. Note: This option is currently experimental and may change or be removed in future Electron releases.
@param session Session (optional) - Sets the session used by the page. Instead of passing the Session object directly, you can also choose to use the partition option instead, which accepts a partition string. When both session and partition are provided, session will be preferred. Default is the default session.
@param partition String (optional) - Sets the session used by the page according to the session’s partition string. If partition starts with persist:, the page will use a persistent session available to all pages in the app with the same partition. If there is no persist: prefix, the page will use an in-memory session. By assigning the same partition, multiple pages can share the same session. Default is the default session.
@param zoomFactor Number (optional) - The default zoom factor of the page, 3.0 represents 300%. Default is 1.0.
@param javascript Boolean (optional) - Enables JavaScript support. Default is true.
@param webSecurity Boolean (optional) - When false, it will disable the same-origin policy (usually using testing websites by people), and set allowRunningInsecureContent to true if this options has not been set by user. Default is true.
@param allowRunningInsecureContent Boolean (optional) - Allow an https page to run JavaScript, CSS or plugins from http URLs. Default is false.
@param images Boolean (optional) - Enables image support. Default is true.
@param textAreasAreResizable Boolean (optional) - Make TextArea elements resizable. Default is true.
@param webgl Boolean (optional) - Enables WebGL support. Default is true.
@param webaudio Boolean (optional) - Enables WebAudio support. Default is true.
@param plugins Boolean (optional) - Whether plugins should be enabled. Default is false.
@param experimentalFeatures Boolean (optional) - Enables Chromium’s experimental features. Default is false.
@param experimentalCanvasFeatures Boolean (optional) - Enables Chromium’s experimental canvas features. Default is false.
@param scrollBounce Boolean (optional) - Enables scroll bounce (rubber banding) effect on macOS. Default is false.
@param blinkFeatures String (optional) - A list of feature strings separated by ,, like CSSVariables,KeyboardEventKey to enable. The full list of supported feature strings can be found in the RuntimeEnabledFeatures.json5 file.
@param disableBlinkFeatures String (optional) - A list of feature strings separated by ,, like CSSVariables,KeyboardEventKey to disable. The full list of supported feature strings can be found in the RuntimeEnabledFeatures.json5 file.
@param defaultFontFamily Object (optional) - Sets the default font for the font-family.
  standard String (optional) - Defaults to Times New Roman.
  serif String (optional) - Defaults to Times New Roman.
  sansSerif String (optional) - Defaults to Arial.
  monospace String (optional) - Defaults to Courier New.
  cursive String (optional) - Defaults to Script.
  fantasy String (optional) - Defaults to Impact.
@param defaultFontSize Integer (optional) - Defaults to 16.
@param defaultMonospaceFontSize Integer (optional) - Defaults to 13.
@param minimumFontSize Integer (optional) - Defaults to 0.
@param defaultEncoding String (optional) - Defaults to ISO-8859-1.
@param backgroundThrottling Boolean (optional) - Whether to throttle animations and timers when the page becomes background. Defaults to true.
@param offscreen Boolean (optional) - Whether to enable offscreen rendering for the browser window. Defaults to false. See the offscreen rendering tutorial for more details.
@param contextIsolation Boolean (optional) - Whether to run Electron APIs and the specified preload script in a separate JavaScript context. Defaults to false. The context that the preload script runs in will still have full access to the document and window globals but it will use its own set of JavaScript builtins (Array, Object, JSON, etc.) and will be isolated from any changes made to the global environment by the loaded page. The Electron API will only be available in the preload script and not the loaded page. This option should be used when loading potentially untrusted remote content to ensure the loaded content cannot tamper with the preload script and any Electron APIs being used. This option uses the same technique used by Chrome Content Scripts. You can access this context in the dev tools by selecting the ‘Electron Isolated Context’ entry in the combo box at the top of the Console tab. Note: This option is currently experimental and may change or be removed in future Electron releases.
*/

export const VALID_WEB_PREFERENCES_OPTIONS = [
  "devTools",
  "nodeIntegration",
  "nodeIntegrationInWorker",
  "preload",
  "sandbox",
  "session",
  "partition",
  "zoomFactor",
  "javascript",
  "webSecurity",
  "allowRunningInsecureContent",
  "images",
  "textAreasAreResizable",
  "webgl",
  "webaudio",
  "plugins",
  "experimentalFeatures",
  "experimentalCanvasFeatures",
  "scrollBounce",
  "blinkFeatures",
  "disableBlinkFeatures",
  "defaultFontFamily",
  "defaultFontSize",
  "defaultMonospaceFontSize",
  "minimumFontSize",
  "defaultEncoding",
  "backgroundThrottling",
  "offscreen",
  "contextIsolation"
]

export function featureWasEnabled() {}

const privateData = new WeakMap()

export const createGetter = ["windowManager"]
export const hostMethods = ["getMainWindow"]

export const featureMethods = [
  "createNativeBrowserWindow",
  "createBrowserWindow",
  "browserWindow",
  "getAllWindows",
  "createURL",
  "findById",
  "findByName",
  "getByName",
  "getWebContentsByName",
  "getControllersByName",
  "start",
  "createForScript",
  "controllerFor"
]

export async function start() {
  return this
}

export async function createForScript(options = {}) {
  const { runtime } = this

  if (typeof options === "string") {
    options = { url: options }
  }

  options = {
    ...skypager.argv,
    ...options
  }

  const {
    readyToShow,
    url,
    htmlPath = skypager.resolve(skypager.electronMainRoot, "welcome.html")
  } = options

  const { windowName = runtime.hashObject({ url }), protocol = "file" } = options

  const controller = this.browserWindow({
    windowName,
    name: windowName,
    ...options
  })

  const browserWindow = controller.getWindow()

  const windowURL = this.createURL({
    url: htmlPath.startsWith("http") ? htmlPath : skypager.resolve(htmlPath),
    protocol,
    args: { injectScripts: [this.createURL(url)] }
  })

  browserWindow.once("ready-to-show", () => {
    readyToShow && readyToShow.call && readyToShow.call(this, browserWindow, controller)
  })

  browserWindow.loadURL(windowURL)

  return controller
}

export function observables(options = {}, context = {}) {
  return {
    browserWindows: ["map", []],
    windowsAreVisible: false,
    windowsHaveFocus: false
  }
}

export function createURL(options = {}) {
  if (typeof options === "string") {
    options = { url: options }
  }
  const { args = {}, url, protocol = "file", slashes = true } = options
  const { runtime } = this

  const encodedArgs = Object.keys(args).length === 0 ? "" : encodeURIComponent(JSON.stringify(args))

  var u
  if (
    url.indexOf("http") === 0 ||
    url.indexOf("data") === 0 ||
    url.indexOf("file") === 0 ||
    url.indexOf("skypager") === 0
  ) {
    var urlData = runtime.urlUtils.parseUrl(url)
    var hash = urlData.hash || (encodedArgs && encodedArgs.length > 0) ? encodedArgs : undefined
    u = runtime.urlUtils.formatUrl(Object.assign(urlData, { hash: hash }))
  } else {
    u = runtime.urlUtils.formatUrl({
      protocol,
      pathname: url,
      slashes,
      hash: encodedArgs && encodedArgs.length > 0 ? encodedArgs : undefined
    })
  }

  return u
}

export function getMainWindow(options = {}) {
  return this.windowManager.browserWindow({
    windowName: "main",
    name: "main"
  })
}

export function getAllWindows() {
  return this.runtime.BrowserWindow.getAllWindows()
}

export function findByName(name) {
  const id = this.browserWindows.get(name)
  return this.runtime.BrowserWindow.fromId(id)
}

export function findById(id) {
  return this.runtime.BrowserWindow.fromId(id)
}

export function getByName() {
  return this.chain
    .invoke("browserWindows.toJSON")
    .mapValues((id, name) => this.runtime.BrowserWindow.fromId(id))
    .value()
}

export function getWebContentsByName() {
  return this.chain.get("byName").mapValues("webContents").value()
}

export function getControllersByName() {
  return this.chain
    .invoke("browserWindows.toJSON")
    .mapValues((id, name) => privateData.get(this.runtime.BrowserWindow.fromId(id)))
    .pickBy(v => v)
    .value()
}

export function browserWindow(options = {}) {
  if (typeof options === "string") {
    options = { name: options, windowName: options }
  }

  /*
  this.runtime.debug("Requesting window", {
    windowName,
    keys: this.browserWindows.keys(),
    ids: this.browserWindows.values(),
  })
  */

  const { windowName = options.name ? options.name : "main", name = "main" } = options

  if (this.browserWindows.has(windowName)) {
    const windowId = this.browserWindows.get(windowName)
    const nativeBrowserWindow = this.runtime.BrowserWindow.fromId(windowId)
    return privateData.get(nativeBrowserWindow)
  }

  const controller = createBrowserWindow.call(this, {
    windowName: name || options.windowName,
    name: name || options.windowName,
    ...options
  })

  this.fireHook("didCreateBrowserWindow", controller.getWindow(), controller, this)

  return controller
}

export function createBrowserWindow(options = {}) {
  const { windowName = options.name || "main" } = options

  //const ipcMain = this.runtime.electron.ipcMain
  const nativeBrowserWindow = this.createNativeBrowserWindow.call(this, options)

  this.browserWindows.set(windowName, nativeBrowserWindow.id)

  const Positioner = require("./positioner")

  privateData.set(nativeBrowserWindow, {
    windowId: nativeBrowserWindow.id,
    webContents: nativeBrowserWindow.webContents,
    name: windowName,
    windowName: windowName,
    positioner: new Positioner(nativeBrowserWindow),
    responder: this.runtime.ipcUtils.createResponder({ browserWindow: nativeBrowserWindow }),
    getController() {
      return controllerFor(nativeBrowserWindow)
    },
    getWindow() {
      return nativeBrowserWindow
    }
  })

  return privateData.get(nativeBrowserWindow)
}

export function controllerFor(nativeBrowserWindow) {
  return privateData.get(nativeBrowserWindow)
}

export function createNativeBrowserWindow(options = {}) {
  const { runtime } = this
  const { BrowserWindow } = runtime.electron
  const pick = runtime.lodash.pick

  const windowOptions = pick(options, VALID_BROWSER_WINDOW_OPTIONS)
  const webPreferences = pick(options, VALID_WEB_PREFERENCES_OPTIONS)

  const nativeBrowserWindow = new BrowserWindow({
    ...windowOptions,
    webPreferences: webPreferences
  })

  return nativeBrowserWindow
}
