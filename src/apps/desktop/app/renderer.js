(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("skypager-runtimes-electron/renderer.js"));
	else if(typeof define === 'function' && define.amd)
		define(["skypager-runtimes-electron/renderer.js"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("skypager-runtimes-electron/renderer.js")) : factory(root["skypager-runtimes-electron/renderer.js"]);
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

/***/ "./node_modules/babel-loader/lib/index.js?{\"babelrc\":true}!./src/renderer.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(skypager) {\n\nconst { PropTypes, React, ReactDOM, ReactRouterDOM, semanticUIReact } = window;\n\nObject.assign(window, semanticUIReact, {\n  Col: semanticUIReact.GridCol,\n  Row: semanticUIReact.GridRow,\n  Column: semanticUIReact.GridCol,\n  Component: React.Component,\n  types: PropTypes,\n  React,\n  ReactDOM,\n  ReactRouterDOM,\n  Route: ReactRouterDOM.Route,\n  Link: ReactRouterDOM.Link,\n  NavLink: ReactRouterDOM.NavLink\n});\n\nskypager.React = React;\nskypager.ReactDOM = ReactDOM;\nskypager.ReactRouterDOM = ReactRouterDOM;\n\nskypager.renderApp = Component => ReactDOM.render(React.createElement(Component, { runtime: skypager }), document.getElementById('app'));\n\nmodule.exports = skypager;\n\n__webpack_require__(\"./src/app.js\").start();\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz97XCJiYWJlbHJjXCI6dHJ1ZX0hLi9zcmMvcmVuZGVyZXIuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL3JlbmRlcmVyLmpzPzUzMjYiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBQcm9wVHlwZXMsIFJlYWN0LCBSZWFjdERPTSwgUmVhY3RSb3V0ZXJET00sIHNlbWFudGljVUlSZWFjdCB9ID0gd2luZG93XG5cbk9iamVjdC5hc3NpZ24od2luZG93LCBzZW1hbnRpY1VJUmVhY3QsIHtcbiAgQ29sOiBzZW1hbnRpY1VJUmVhY3QuR3JpZENvbCxcbiAgUm93OiBzZW1hbnRpY1VJUmVhY3QuR3JpZFJvdyxcbiAgQ29sdW1uOiBzZW1hbnRpY1VJUmVhY3QuR3JpZENvbCxcbiAgQ29tcG9uZW50OiBSZWFjdC5Db21wb25lbnQsXG4gIHR5cGVzOiBQcm9wVHlwZXMsXG4gIFJlYWN0LFxuICBSZWFjdERPTSxcbiAgUmVhY3RSb3V0ZXJET00sXG4gIFJvdXRlOiBSZWFjdFJvdXRlckRPTS5Sb3V0ZSxcbiAgTGluazogUmVhY3RSb3V0ZXJET00uTGluayxcbiAgTmF2TGluazogUmVhY3RSb3V0ZXJET00uTmF2TGluayxcbn0pXG5cbnNreXBhZ2VyLlJlYWN0ID0gUmVhY3RcbnNreXBhZ2VyLlJlYWN0RE9NID0gUmVhY3RET01cbnNreXBhZ2VyLlJlYWN0Um91dGVyRE9NID0gUmVhY3RSb3V0ZXJET01cblxuc2t5cGFnZXIucmVuZGVyQXBwID0gQ29tcG9uZW50ID0+XG4gIFJlYWN0RE9NLnJlbmRlcig8Q29tcG9uZW50IHJ1bnRpbWU9e3NreXBhZ2VyfSAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNreXBhZ2VyXG5cbnJlcXVpcmUoJy4vYXBwLmpzJykuc3RhcnQoKVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9yZW5kZXJlci5qcyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBWEE7QUFDQTtBQWFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/babel-loader/lib/index.js?{\"babelrc\":true}!./src/renderer.js\n");

/***/ }),

/***/ "./node_modules/expose-loader/index.js?runtime!./src/renderer.js-exposed":
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = global[\"runtime\"] = __webpack_require__(\"./node_modules/babel-loader/lib/index.js?{\\\"babelrc\\\":true}!./src/renderer.js\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvZXhwb3NlLWxvYWRlci9pbmRleC5qcz9ydW50aW1lIS4vc3JjL3JlbmRlcmVyLmpzLWV4cG9zZWQuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcmVuZGVyZXIuanMtZXhwb3NlZD9mZjEwIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsW1wicnVudGltZVwiXSA9IHJlcXVpcmUoXCItIS9Vc2Vycy9qb24vUHJvamVjdHMvc2t5cGFnZXIvc3JjL2FwcHMvZGVza3RvcC9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0wLTAhLi9yZW5kZXJlci5qc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZXhwb3NlLWxvYWRlcj9ydW50aW1lIS4vc3JjL3JlbmRlcmVyLmpzLWV4cG9zZWRcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2V4cG9zZS1sb2FkZXIvaW5kZXguanM/cnVudGltZSEuL3NyYy9yZW5kZXJlci5qcy1leHBvc2VkXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/expose-loader/index.js?runtime!./src/renderer.js-exposed\n");

/***/ }),

/***/ "./src/app.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _class, _temp;\n\nconst { React, Component, types, skypager } = global;\n\nlet App = exports.App = (_temp = _class = class App extends Component {\n\n  getChildContext() {\n    return {\n      runtime: this.props.runtime\n    };\n  }\n\n  render() {\n    return React.createElement(\n      Container,\n      { style: { width: '90%', margin: '20px auto' } },\n      React.createElement(\n        Segment,\n        { piled: true },\n        React.createElement(\n          Header,\n          { as: 'h1' },\n          'Welcome'\n        )\n      )\n    );\n  }\n}, _class.childContextTypes = {\n  runtime: types.object\n}, _class.propTypes = {\n  runtime: types.shape({\n    setState: types.func,\n    currentState: types.object\n  }).isRequired\n}, _temp);\nexports.default = App;\nconst start = exports.start = () => skypager.renderApp(App);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXBwLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9hcHAuanM/YmQ5YyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IFJlYWN0LCBDb21wb25lbnQsIHR5cGVzLCBza3lwYWdlciB9ID0gZ2xvYmFsXG5cbmV4cG9ydCBjbGFzcyBBcHAgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXMgPSB7XG4gICAgcnVudGltZTogdHlwZXMub2JqZWN0LFxuICB9XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBydW50aW1lOiB0eXBlcy5zaGFwZSh7XG4gICAgICBzZXRTdGF0ZTogdHlwZXMuZnVuYyxcbiAgICAgIGN1cnJlbnRTdGF0ZTogdHlwZXMub2JqZWN0LFxuICAgIH0pLmlzUmVxdWlyZWQsXG4gIH1cblxuICBnZXRDaGlsZENvbnRleHQoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJ1bnRpbWU6IHRoaXMucHJvcHMucnVudGltZSxcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxDb250YWluZXIgc3R5bGU9e3sgd2lkdGg6ICc5MCUnLCBtYXJnaW46ICcyMHB4IGF1dG8nIH19PlxuICAgICAgICA8U2VnbWVudCBwaWxlZD5cbiAgICAgICAgICA8SGVhZGVyIGFzPVwiaDFcIj5XZWxjb21lPC9IZWFkZXI+XG4gICAgICAgIDwvU2VnbWVudD5cbiAgICAgIDwvQ29udGFpbmVyPlxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHBcblxuZXhwb3J0IGNvbnN0IHN0YXJ0ID0gKCkgPT4gc2t5cGFnZXIucmVuZGVyQXBwKEFwcClcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvYXBwLmpzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBV0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREE7QUFEQTtBQU1BO0FBMUJBO0FBRUE7QUFEQTtBQUtBO0FBQ0E7QUFDQTtBQUZBO0FBREE7QUF3QkE7QUFFQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/app.js\n");

/***/ }),

/***/ 0:
/***/ (function(module, exports) {

eval("module.exports = require(\"skypager-runtimes-electron/renderer.js\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCBcInNreXBhZ2VyLXJ1bnRpbWVzLWVsZWN0cm9uL3JlbmRlcmVyLmpzXCI/YjBkNCJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJza3lwYWdlci1ydW50aW1lcy1lbGVjdHJvbi9yZW5kZXJlci5qc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInNreXBhZ2VyLXJ1bnRpbWVzLWVsZWN0cm9uL3JlbmRlcmVyLmpzXCJcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///0\n");

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./node_modules/expose-loader/index.js?runtime!./src/renderer.js-exposed");


/***/ })

/******/ });
});