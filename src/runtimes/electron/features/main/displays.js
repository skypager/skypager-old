export const featureMethods = [
  "getAllDisplays",
  "getCursorPosition",
  "getCurrentDisplay",
  "getDisplaySize",
  "getPrimaryDisplay",
  "getIsMultiDisplay",
  "getIsTouchSupportAvailable",
  "getIsUsingPrimaryDisplay",
  "getIsUsingExternalDisplay",
  "getExternalDisplay",
]

export function getAllDisplays() {
  return this.runtime.electron.screen.getAllDisplays()
}

export function getCursorPosition() {
  return this.runtime.electron.screen.getCursorScreenPoint()
}

export function getCurrentDisplay() {
  return this.runtime.electron.screen.getDisplayNearestPoint(cursorPosition())
}

export function getDisplaySize() {
  return this.currentDisplay.size
}

export function getPrimaryDisplay() {
  return this.runtime.electron.screen.getPrimaryDisplay() || this.allDisplays[0]
}

export function getIsTouchSupportAvailable() {
  return this.currentDisplay.touchSupport === "available"
}

export function getIsMultiDisplay() {
  return this.allDisplays.length > 1
}

export function getCurrentDisplaySize() {
  return this.currentDisplay.workAreaSize
}

export function getIsUsingPrimaryDisplay() {
  if (!this.isMultiDisplay) return true
  return this.currentDisplay.id === this.primaryDisplay.id
}

export function getIsUsingExternalDisplay() {
  if (!this.isMultiDisplay) return false
  return this.currentDisplay.id === this.externalDisplay.id
}

export function getExternalDisplay() {
  return this.allDisplays.find(({ bounds } = {}) => bounds.x !== 0 || bounds.y !== 0)
}
