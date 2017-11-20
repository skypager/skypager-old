(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("skypager-runtimes-electron/main.js"));
	else if(typeof define === 'function' && define.amd)
		define(["skypager-runtimes-electron/main.js"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("skypager-runtimes-electron/main.js")) : factory(root["skypager-runtimes-electron/main.js"]);
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

eval("/* WEBPACK VAR INJECTION */(function(skypager) {const { windowManager } = skypager\n\nconst mainWindow = windowManager.browserWindow({\n  name: 'main',\n  windowName: 'main',\n  height: 900,\n  width: 1200,\n})\n\nskypager.debug('Main Window', { mainWindow: mainWindow.windowId })\n\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbWFpbi5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9tYWluLmpzPzM0NzkiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyB3aW5kb3dNYW5hZ2VyIH0gPSBza3lwYWdlclxuXG5jb25zdCBtYWluV2luZG93ID0gd2luZG93TWFuYWdlci5icm93c2VyV2luZG93KHtcbiAgbmFtZTogJ21haW4nLFxuICB3aW5kb3dOYW1lOiAnbWFpbicsXG4gIGhlaWdodDogOTAwLFxuICB3aWR0aDogMTIwMCxcbn0pXG5cbnNreXBhZ2VyLmRlYnVnKCdNYWluIFdpbmRvdycsIHsgbWFpbldpbmRvdzogbWFpbldpbmRvdy53aW5kb3dJZCB9KVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbWFpbi5qc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvbWFpbi5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/main.js\n");

/***/ }),

/***/ 0:
/***/ (function(module, exports) {

eval("module.exports = require(\"skypager-runtimes-electron/main.js\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCBcInNreXBhZ2VyLXJ1bnRpbWVzLWVsZWN0cm9uL21haW4uanNcIj9mNjU2Il0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNreXBhZ2VyLXJ1bnRpbWVzLWVsZWN0cm9uL21haW4uanNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJza3lwYWdlci1ydW50aW1lcy1lbGVjdHJvbi9tYWluLmpzXCJcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///0\n");

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.js");


/***/ })

/******/ });
});