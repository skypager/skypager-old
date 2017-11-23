(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory((function webpackLoadOptionalExternalModule() { try { return require("babel-register"); } catch(e) {} }()));
	else if(typeof define === 'function' && define.amd)
		define(["babel-register"], factory);
	else {
		var a = typeof exports === 'object' ? factory((function webpackLoadOptionalExternalModule() { try { return require("babel-register"); } catch(e) {} }())) : factory(root["babel-register"]);
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

/***/ "./src/features/main .js$":
/***/ (function(module, exports) {

eval("function webpackEmptyContext(req) {\n\tthrow new Error(\"Cannot find module '\" + req + \"'.\");\n}\nwebpackEmptyContext.keys = function() { return []; };\nwebpackEmptyContext.resolve = webpackEmptyContext;\nmodule.exports = webpackEmptyContext;\nwebpackEmptyContext.id = \"./src/features/main .js$\";//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZmVhdHVyZXMvbWFpbiAuanMkLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2ZlYXR1cmVzL21haW4gbm9ucmVjdXJzaXZlIC5qcyQ/NjkzNyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiB3ZWJwYWNrRW1wdHlDb250ZXh0KHJlcSkge1xuXHR0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInLlwiKTtcbn1cbndlYnBhY2tFbXB0eUNvbnRleHQua2V5cyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gW107IH07XG53ZWJwYWNrRW1wdHlDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrRW1wdHlDb250ZXh0O1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrRW1wdHlDb250ZXh0O1xud2VicGFja0VtcHR5Q29udGV4dC5pZCA9IFwiLi9zcmMvZmVhdHVyZXMvbWFpbiAuanMkXCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZmVhdHVyZXMvbWFpbiBub25yZWN1cnNpdmUgLmpzJFxuLy8gbW9kdWxlIGlkID0gLi9zcmMvZmVhdHVyZXMvbWFpbiAuanMkXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/features/main .js$\n");

/***/ }),

/***/ "./src/main.js":
/***/ (function(module, exports, __webpack_require__) {

eval("try {\n  __webpack_require__(0)\n} catch (error) {}\n\nconst skypager = require('skypager-runtimes-electron')\nconst url = skypager.get('argv.url', `file://${__dirname}/index.html`)\n\nskypager.features.add(__webpack_require__(\"./src/features/main .js$\"))\n\nskypager.debug(\n  `Skypager Desktop Editor App Main Entry Point Reached. Waiting for skypager to start`\n)\n\nskypager.whenStarted(() => {\n  const { windowManager } = skypager\n\n  const mainWindow = windowManager.browserWindow({\n    name: 'main',\n    windowName: 'main',\n    height: 900,\n    width: 1200,\n    show: process.env.SKYPAGER_DEV,\n  })\n\n  const win = mainWindow.getWindow()\n\n  skypager.debug(`Loading URL: ${url}`)\n  win.loadURL(url)\n\n  win.once('ready-to-show', () => win.show())\n\n  if (skypager.argv.interactive || skypager.argv.repl) {\n    skypager.repl('interactive').launch()\n  }\n})\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbWFpbi5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9tYWluLmpzPzM0NzkiXSwic291cmNlc0NvbnRlbnQiOlsidHJ5IHtcbiAgcmVxdWlyZSgnYmFiZWwtcmVnaXN0ZXInKVxufSBjYXRjaCAoZXJyb3IpIHt9XG5cbmNvbnN0IHNreXBhZ2VyID0gX19ub25fd2VicGFja19yZXF1aXJlX18oJ3NreXBhZ2VyLXJ1bnRpbWVzLWVsZWN0cm9uJylcbmNvbnN0IHVybCA9IHNreXBhZ2VyLmdldCgnYXJndi51cmwnLCBgZmlsZTovLyR7X19kaXJuYW1lfS9pbmRleC5odG1sYClcblxuc2t5cGFnZXIuZmVhdHVyZXMuYWRkKHJlcXVpcmUuY29udGV4dCgnLi9mZWF0dXJlcy9tYWluJywgZmFsc2UsIC8uanMkLykpXG5cbnNreXBhZ2VyLmRlYnVnKFxuICBgU2t5cGFnZXIgRGVza3RvcCBFZGl0b3IgQXBwIE1haW4gRW50cnkgUG9pbnQgUmVhY2hlZC4gV2FpdGluZyBmb3Igc2t5cGFnZXIgdG8gc3RhcnRgXG4pXG5cbnNreXBhZ2VyLndoZW5TdGFydGVkKCgpID0+IHtcbiAgY29uc3QgeyB3aW5kb3dNYW5hZ2VyIH0gPSBza3lwYWdlclxuXG4gIGNvbnN0IG1haW5XaW5kb3cgPSB3aW5kb3dNYW5hZ2VyLmJyb3dzZXJXaW5kb3coe1xuICAgIG5hbWU6ICdtYWluJyxcbiAgICB3aW5kb3dOYW1lOiAnbWFpbicsXG4gICAgaGVpZ2h0OiA5MDAsXG4gICAgd2lkdGg6IDEyMDAsXG4gICAgc2hvdzogcHJvY2Vzcy5lbnYuU0tZUEFHRVJfREVWLFxuICB9KVxuXG4gIGNvbnN0IHdpbiA9IG1haW5XaW5kb3cuZ2V0V2luZG93KClcblxuICBza3lwYWdlci5kZWJ1ZyhgTG9hZGluZyBVUkw6ICR7dXJsfWApXG4gIHdpbi5sb2FkVVJMKHVybClcblxuICB3aW4ub25jZSgncmVhZHktdG8tc2hvdycsICgpID0+IHdpbi5zaG93KCkpXG5cbiAgaWYgKHNreXBhZ2VyLmFyZ3YuaW50ZXJhY3RpdmUgfHwgc2t5cGFnZXIuYXJndi5yZXBsKSB7XG4gICAgc2t5cGFnZXIucmVwbCgnaW50ZXJhY3RpdmUnKS5sYXVuY2goKVxuICB9XG59KVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbWFpbi5qc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvbWFpbi5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/main.js\n");

/***/ }),

/***/ 0:
/***/ (function(module, exports) {

eval("module.exports = require(\"babel-register\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJlZ2lzdGVyXCI/ODYwNSJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1yZWdpc3RlclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImJhYmVsLXJlZ2lzdGVyXCJcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///0\n");

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.js");


/***/ })

/******/ });
});