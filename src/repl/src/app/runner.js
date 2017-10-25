import blessed from 'blessed'

const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  smartCSR: true,
  fullUnicode: true,
  dockBorders: true,
  ignoreDockContrast: true,
});

// Let user quit the app
screen.key(['escape', 'q', 'C-c'], () => (
  process.exit(0)
))

// Don't overwrite the screen
console.log = function () { };
console.warn = function () { };
console.error = function () { };
console.info = function () { };
console.debug = function () { };

require('./signal')

setInterval(() => { }, 1000)
