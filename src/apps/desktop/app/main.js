(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("skypager-runtimes-electron"));
	else if(typeof define === 'function' && define.amd)
		define(["skypager-runtimes-electron"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("skypager-runtimes-electron")) : factory(root["skypager-runtimes-electron"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.js":
/***/ (function(module, exports, __webpack_require__) {

eval("const skypager = __webpack_require__(0)\nconst url = skypager.get('argv.url', `file://${__dirname}/index.html`)\n\nskypager.debug(\n  `Skypager Desktop Editor App Main Entry Point Reached. Waiting for skypager to start`\n)\n\nskypager.whenStarted(() => {\n  const { windowManager } = skypager\n\n  const mainWindow = windowManager.browserWindow({\n    name: 'main',\n    windowName: 'main',\n    height: 900,\n    width: 1200,\n    show: false,\n  })\n\n  const win = mainWindow.getWindow()\n\n  skypager.debug(`Loading URL: ${url}`)\n  win.loadURL(url)\n\n  win.once('ready-to-show', () => win.show())\n\n  if (skypager.argv.interactive || skypager.argv.repl) {\n    skypager.repl('interactive').launch()\n  }\n})\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbWFpbi5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9tYWluLmpzPzM0NzkiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc2t5cGFnZXIgPSByZXF1aXJlKCdza3lwYWdlci1ydW50aW1lcy1lbGVjdHJvbicpXG5jb25zdCB1cmwgPSBza3lwYWdlci5nZXQoJ2FyZ3YudXJsJywgYGZpbGU6Ly8ke19fZGlybmFtZX0vaW5kZXguaHRtbGApXG5cbnNreXBhZ2VyLmRlYnVnKFxuICBgU2t5cGFnZXIgRGVza3RvcCBFZGl0b3IgQXBwIE1haW4gRW50cnkgUG9pbnQgUmVhY2hlZC4gV2FpdGluZyBmb3Igc2t5cGFnZXIgdG8gc3RhcnRgXG4pXG5cbnNreXBhZ2VyLndoZW5TdGFydGVkKCgpID0+IHtcbiAgY29uc3QgeyB3aW5kb3dNYW5hZ2VyIH0gPSBza3lwYWdlclxuXG4gIGNvbnN0IG1haW5XaW5kb3cgPSB3aW5kb3dNYW5hZ2VyLmJyb3dzZXJXaW5kb3coe1xuICAgIG5hbWU6ICdtYWluJyxcbiAgICB3aW5kb3dOYW1lOiAnbWFpbicsXG4gICAgaGVpZ2h0OiA5MDAsXG4gICAgd2lkdGg6IDEyMDAsXG4gICAgc2hvdzogZmFsc2UsXG4gIH0pXG5cbiAgY29uc3Qgd2luID0gbWFpbldpbmRvdy5nZXRXaW5kb3coKVxuXG4gIHNreXBhZ2VyLmRlYnVnKGBMb2FkaW5nIFVSTDogJHt1cmx9YClcbiAgd2luLmxvYWRVUkwodXJsKVxuXG4gIHdpbi5vbmNlKCdyZWFkeS10by1zaG93JywgKCkgPT4gd2luLnNob3coKSlcblxuICBpZiAoc2t5cGFnZXIuYXJndi5pbnRlcmFjdGl2ZSB8fCBza3lwYWdlci5hcmd2LnJlcGwpIHtcbiAgICBza3lwYWdlci5yZXBsKCdpbnRlcmFjdGl2ZScpLmxhdW5jaCgpXG4gIH1cbn0pXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9tYWluLmpzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9tYWluLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/main.js\n");

/***/ }),

/***/ 0:
/***/ (function(module, exports) {

eval("module.exports = require(\"skypager-runtimes-electron\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCBcInNreXBhZ2VyLXJ1bnRpbWVzLWVsZWN0cm9uXCI/MjE5MSJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJza3lwYWdlci1ydW50aW1lcy1lbGVjdHJvblwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInNreXBhZ2VyLXJ1bnRpbWVzLWVsZWN0cm9uXCJcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///0\n");

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.js");


/***/ })

/******/ });
});