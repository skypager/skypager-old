(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("skypager-runtimes-electron/renderer.js"), require("semanticUIReact"), require("ReactRouterDOM"), require("ReactDOM"), require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["skypager-runtimes-electron/renderer.js", "semanticUIReact", "ReactRouterDOM", "ReactDOM", "React"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("skypager-runtimes-electron/renderer.js"), require("semanticUIReact"), require("ReactRouterDOM"), require("ReactDOM"), require("React")) : factory(root["skypager-runtimes-electron/renderer.js"], root["semanticUIReact"], root["ReactRouterDOM"], root["ReactDOM"], root["React"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_0__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/babel-loader/lib/index.js?{\"babelrc\":true}!./src/renderer.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _globals = __webpack_require__(\"./src/globals.js\");\n\nvar _app = __webpack_require__(\"./src/app.js\");\n\n_globals.skypager.setState({\n  menuItems: [{\n    content: 'Home',\n    icon: 'home',\n    link: '/'\n  }, {\n    content: 'Packages',\n    icon: 'file outline',\n    link: '/package-browser'\n  }, {\n    content: 'Console',\n    icon: 'code',\n    link: '/console'\n  }]\n});\n\n_globals.skypager.renderApp = Component => _globals.ReactDOM.render(React.createElement(Component, { runtime: _globals.skypager }), document.getElementById('app'));\n\nmodule.exports = _globals.skypager;\n\n(0, _app.start)();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz97XCJiYWJlbHJjXCI6dHJ1ZX0hLi9zcmMvcmVuZGVyZXIuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL3JlbmRlcmVyLmpzPzUzMjYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2t5cGFnZXIsIFJlYWN0RE9NIH0gZnJvbSAnLi9nbG9iYWxzJ1xuaW1wb3J0IHsgc3RhcnQgfSBmcm9tICcuL2FwcCdcblxuc2t5cGFnZXIuc2V0U3RhdGUoe1xuICBtZW51SXRlbXM6IFtcbiAgICB7XG4gICAgICBjb250ZW50OiAnSG9tZScsXG4gICAgICBpY29uOiAnaG9tZScsXG4gICAgICBsaW5rOiAnLycsXG4gICAgfSxcbiAgICB7XG4gICAgICBjb250ZW50OiAnUGFja2FnZXMnLFxuICAgICAgaWNvbjogJ2ZpbGUgb3V0bGluZScsXG4gICAgICBsaW5rOiAnL3BhY2thZ2UtYnJvd3NlcicsXG4gICAgfSxcbiAgICB7XG4gICAgICBjb250ZW50OiAnQ29uc29sZScsXG4gICAgICBpY29uOiAnY29kZScsXG4gICAgICBsaW5rOiAnL2NvbnNvbGUnLFxuICAgIH0sXG4gIF0sXG59KVxuXG5za3lwYWdlci5yZW5kZXJBcHAgPSBDb21wb25lbnQgPT5cbiAgUmVhY3RET00ucmVuZGVyKDxDb21wb25lbnQgcnVudGltZT17c2t5cGFnZXJ9IC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpXG5cbm1vZHVsZS5leHBvcnRzID0gc2t5cGFnZXJcblxuc3RhcnQoKVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9yZW5kZXJlci5qcyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFIQTtBQU1BO0FBQ0E7QUFDQTtBQUhBO0FBTUE7QUFDQTtBQUNBO0FBSEE7QUFaQTtBQUNBO0FBbUJBO0FBQ0E7QUFFQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/babel-loader/lib/index.js?{\"babelrc\":true}!./src/renderer.js\n");

/***/ }),

/***/ "./node_modules/expose-loader/index.js?runtime!./src/renderer.js-exposed":
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = global[\"runtime\"] = __webpack_require__(\"./node_modules/babel-loader/lib/index.js?{\\\"babelrc\\\":true}!./src/renderer.js\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvZXhwb3NlLWxvYWRlci9pbmRleC5qcz9ydW50aW1lIS4vc3JjL3JlbmRlcmVyLmpzLWV4cG9zZWQuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcmVuZGVyZXIuanMtZXhwb3NlZD9mZjEwIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsW1wicnVudGltZVwiXSA9IHJlcXVpcmUoXCItIS9Vc2Vycy9qb24vUHJvamVjdHMvc2t5cGFnZXIvc3JjL2FwcHMvZGVza3RvcC9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0wLTAhLi9yZW5kZXJlci5qc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZXhwb3NlLWxvYWRlcj9ydW50aW1lIS4vc3JjL3JlbmRlcmVyLmpzLWV4cG9zZWRcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2V4cG9zZS1sb2FkZXIvaW5kZXguanM/cnVudGltZSEuL3NyYy9yZW5kZXJlci5qcy1leHBvc2VkXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/expose-loader/index.js?runtime!./src/renderer.js-exposed\n");

/***/ }),

/***/ "./src/app.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.start = exports.App = undefined;\n\nvar _class, _temp;\n\nvar _globals = __webpack_require__(\"./src/globals.js\");\n\nvar _Home = __webpack_require__(\"./src/pages/Home/Home.js\");\n\nvar _Home2 = _interopRequireDefault(_Home);\n\nvar _PackageBrowser = __webpack_require__(\"./src/pages/PackageBrowser/PackageBrowser.js\");\n\nvar _PackageBrowser2 = _interopRequireDefault(_PackageBrowser);\n\nvar _Console = __webpack_require__(\"./src/pages/Console/Console.js\");\n\nvar _Console2 = _interopRequireDefault(_Console);\n\nvar _SidebarLayout = __webpack_require__(\"./src/layouts/SidebarLayout.js\");\n\nvar _SidebarLayout2 = _interopRequireDefault(_SidebarLayout);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\nconst { Route, Switch, MemoryRouter: Router } = _globals.ReactRouterDOM;\n\nlet App = exports.App = (_temp = _class = class App extends _globals.Component {\n\n  getChildContext() {\n    return {\n      runtime: this.props.runtime,\n      main: this.props.runtime.electronMain\n    };\n  }\n\n  componentWillMount() {\n    var _this = this;\n\n    return _asyncToGenerator(function* () {\n      const main = _this.props.runtime.electronMain;\n      yield main.fileManager.startAsync();\n      _this.setState({ fileManagerStarted: true });\n\n      main.on('stateDidChange', function () {\n        _this.setState({ stateVersion: main.stateVersion });\n      });\n    })();\n  }\n\n  render() {\n    const { runtime } = this.props;\n    const { menuItems = [] } = runtime.currentState;\n\n    return _globals.React.createElement(\n      Router,\n      null,\n      _globals.React.createElement(\n        _SidebarLayout2.default,\n        { visible: true, sidebarWidth: 'thin', menuItems: menuItems },\n        _globals.React.createElement(Route, { exact: true, path: '/', component: _Home2.default }),\n        _globals.React.createElement(Route, { path: '/package-browser', component: _PackageBrowser2.default }),\n        _globals.React.createElement(Route, { path: '/console', component: _Console2.default })\n      )\n    );\n  }\n}, _class.childContextTypes = {\n  runtime: _globals.types.object,\n  main: _globals.types.shape({\n    setState: _globals.types.func,\n    currentState: _globals.types.object\n  }).isRequired\n}, _class.propTypes = {\n  runtime: _globals.types.shape({\n    setState: _globals.types.func,\n    currentState: _globals.types.object\n  }).isRequired\n}, _temp);\nexports.default = App;\nconst start = exports.start = () => _globals.skypager.renderApp(App);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXBwLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9hcHAuanM/YmQ5YyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZWFjdCwgQ29tcG9uZW50LCB0eXBlcywgc2t5cGFnZXIsIFJlYWN0Um91dGVyRE9NIH0gZnJvbSAnLi9nbG9iYWxzJ1xuaW1wb3J0IEhvbWUgZnJvbSAnLi9wYWdlcy9Ib21lL0hvbWUnXG5pbXBvcnQgUGFja2FnZUJyb3dzZXIgZnJvbSAnLi9wYWdlcy9QYWNrYWdlQnJvd3Nlci9QYWNrYWdlQnJvd3NlcidcbmltcG9ydCBDb25zb2xlIGZyb20gJy4vcGFnZXMvQ29uc29sZS9Db25zb2xlJ1xuaW1wb3J0IFNpZGViYXJMYXlvdXQgZnJvbSAnbGF5b3V0cy9TaWRlYmFyTGF5b3V0J1xuXG5jb25zdCB7IFJvdXRlLCBTd2l0Y2gsIE1lbW9yeVJvdXRlcjogUm91dGVyIH0gPSBSZWFjdFJvdXRlckRPTVxuXG5leHBvcnQgY2xhc3MgQXBwIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIGNoaWxkQ29udGV4dFR5cGVzID0ge1xuICAgIHJ1bnRpbWU6IHR5cGVzLm9iamVjdCxcbiAgICBtYWluOiB0eXBlcy5zaGFwZSh7XG4gICAgICBzZXRTdGF0ZTogdHlwZXMuZnVuYyxcbiAgICAgIGN1cnJlbnRTdGF0ZTogdHlwZXMub2JqZWN0LFxuICAgIH0pLmlzUmVxdWlyZWQsXG4gIH1cblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIHJ1bnRpbWU6IHR5cGVzLnNoYXBlKHtcbiAgICAgIHNldFN0YXRlOiB0eXBlcy5mdW5jLFxuICAgICAgY3VycmVudFN0YXRlOiB0eXBlcy5vYmplY3QsXG4gICAgfSkuaXNSZXF1aXJlZCxcbiAgfVxuXG4gIGdldENoaWxkQ29udGV4dCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcnVudGltZTogdGhpcy5wcm9wcy5ydW50aW1lLFxuICAgICAgbWFpbjogdGhpcy5wcm9wcy5ydW50aW1lLmVsZWN0cm9uTWFpbixcbiAgICB9XG4gIH1cblxuICBhc3luYyBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgY29uc3QgbWFpbiA9IHRoaXMucHJvcHMucnVudGltZS5lbGVjdHJvbk1haW5cbiAgICBhd2FpdCBtYWluLmZpbGVNYW5hZ2VyLnN0YXJ0QXN5bmMoKVxuICAgIHRoaXMuc2V0U3RhdGUoeyBmaWxlTWFuYWdlclN0YXJ0ZWQ6IHRydWUgfSlcblxuICAgIG1haW4ub24oJ3N0YXRlRGlkQ2hhbmdlJywgKCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHN0YXRlVmVyc2lvbjogbWFpbi5zdGF0ZVZlcnNpb24gfSlcbiAgICB9KVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgcnVudGltZSB9ID0gdGhpcy5wcm9wc1xuICAgIGNvbnN0IHsgbWVudUl0ZW1zID0gW10gfSA9IHJ1bnRpbWUuY3VycmVudFN0YXRlXG5cbiAgICByZXR1cm4gKFxuICAgICAgPFJvdXRlcj5cbiAgICAgICAgPFNpZGViYXJMYXlvdXQgdmlzaWJsZSBzaWRlYmFyV2lkdGg9XCJ0aGluXCIgbWVudUl0ZW1zPXttZW51SXRlbXN9PlxuICAgICAgICAgIDxSb3V0ZSBleGFjdCBwYXRoPVwiL1wiIGNvbXBvbmVudD17SG9tZX0gLz5cbiAgICAgICAgICA8Um91dGUgcGF0aD1cIi9wYWNrYWdlLWJyb3dzZXJcIiBjb21wb25lbnQ9e1BhY2thZ2VCcm93c2VyfSAvPlxuICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL2NvbnNvbGVcIiBjb21wb25lbnQ9e0NvbnNvbGV9IC8+XG4gICAgICAgIDwvU2lkZWJhckxheW91dD5cbiAgICAgIDwvUm91dGVyPlxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHBcblxuZXhwb3J0IGNvbnN0IHN0YXJ0ID0gKCkgPT4gc2t5cGFnZXIucmVuZGVyQXBwKEFwcClcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvYXBwLmpzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBZUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQURBO0FBUUE7QUE5Q0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFTQTtBQUNBO0FBQ0E7QUFGQTtBQURBO0FBd0NBO0FBRUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/app.js\n");

/***/ }),

/***/ "./src/globals.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _skypagerRuntimesElectron = __webpack_require__(4);\n\nvar _skypagerRuntimesElectron2 = _interopRequireDefault(_skypagerRuntimesElectron);\n\nvar _react = __webpack_require__(0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(1);\n\nvar _reactDom2 = _interopRequireDefault(_reactDom);\n\nvar _reactRouterDom = __webpack_require__(2);\n\nvar _semanticUiReact = __webpack_require__(3);\n\nvar semanticUIReact = _interopRequireWildcard(_semanticUiReact);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst injections = Object.assign({}, semanticUIReact, {\n  Col: semanticUIReact.GridCol,\n  Row: semanticUIReact.GridRow,\n  Column: semanticUIReact.GridCol,\n  Component: _react2.default.Component,\n  types: PropTypes,\n  skypager: _skypagerRuntimesElectron2.default,\n  runtime: _skypagerRuntimesElectron2.default,\n  lodash: _skypagerRuntimesElectron2.default.lodash,\n  React: _react2.default,\n  ReactDOM: _reactDom2.default,\n  ReactRouterDOM,\n  Route: _reactRouterDom.Route,\n  Link: _reactRouterDom.Link,\n  NavLink: _reactRouterDom.NavLink\n});\n\n_skypagerRuntimesElectron2.default.React = _react2.default;\n_skypagerRuntimesElectron2.default.ReactDOM = _reactDom2.default;\n_skypagerRuntimesElectron2.default.ReactRouterDOM = ReactRouterDOM;\n\nObject.assign(window, injections);\n\nmodule.exports = injections;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZ2xvYmFscy5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvZ2xvYmFscy5qcz9hZDg3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBza3lwYWdlciBmcm9tICdza3lwYWdlci1ydW50aW1lcy1lbGVjdHJvbidcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nXG5pbXBvcnQgeyBSb3V0ZSwgTGluaywgTmF2TGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5pbXBvcnQgKiBhcyBzZW1hbnRpY1VJUmVhY3QgZnJvbSAnc2VtYW50aWMtdWktcmVhY3QnXG5cbmNvbnN0IGluamVjdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBzZW1hbnRpY1VJUmVhY3QsIHtcbiAgQ29sOiBzZW1hbnRpY1VJUmVhY3QuR3JpZENvbCxcbiAgUm93OiBzZW1hbnRpY1VJUmVhY3QuR3JpZFJvdyxcbiAgQ29sdW1uOiBzZW1hbnRpY1VJUmVhY3QuR3JpZENvbCxcbiAgQ29tcG9uZW50OiBSZWFjdC5Db21wb25lbnQsXG4gIHR5cGVzOiBQcm9wVHlwZXMsXG4gIHNreXBhZ2VyLFxuICBydW50aW1lOiBza3lwYWdlcixcbiAgbG9kYXNoOiBza3lwYWdlci5sb2Rhc2gsXG4gIFJlYWN0LFxuICBSZWFjdERPTSxcbiAgUmVhY3RSb3V0ZXJET00sXG4gIFJvdXRlLFxuICBMaW5rLFxuICBOYXZMaW5rLFxufSlcblxuc2t5cGFnZXIuUmVhY3QgPSBSZWFjdFxuc2t5cGFnZXIuUmVhY3RET00gPSBSZWFjdERPTVxuc2t5cGFnZXIuUmVhY3RSb3V0ZXJET00gPSBSZWFjdFJvdXRlckRPTVxuXG5PYmplY3QuYXNzaWduKHdpbmRvdywgaW5qZWN0aW9ucylcblxubW9kdWxlLmV4cG9ydHMgPSBpbmplY3Rpb25zXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2dsb2JhbHMuanMiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWRBO0FBQ0E7QUFnQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/globals.js\n");

/***/ }),

/***/ "./src/layouts/SidebarLayout.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.SidebarLayout = undefined;\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _class, _temp;\n\nvar _globals = __webpack_require__(\"./src/globals.js\");\n\nlet SidebarLayout = exports.SidebarLayout = (_temp = _class = class SidebarLayout extends _globals.Component {\n\n  render() {\n    const {\n      sidebarAnimation = 'push',\n      sidebarWidth = 'thin',\n      visible = false,\n      children,\n      menuItems = [],\n      sidebarProps = { icon: 'labeled' }\n    } = this.props;\n\n    return React.createElement(\n      _globals.Sidebar.Pushable,\n      { as: _globals.Segment, basic: true },\n      React.createElement(\n        _globals.Sidebar,\n        _extends({\n          as: _globals.Menu,\n          inverted: true,\n          vertical: true\n        }, sidebarProps, {\n          width: sidebarWidth,\n          animation: sidebarAnimation,\n          visible: visible\n        }),\n        menuItems.map((menuItem, key) => React.createElement(SidebarLayout.MenuItem, _extends({ key: key }, menuItem)))\n      ),\n      React.createElement(\n        _globals.Sidebar.Pusher,\n        { style: { height: '100%', width: '100%', overflow: 'scroll' } },\n        React.createElement(\n          'div',\n          { style: { maxWidth: '85%' } },\n          children\n        )\n      )\n    );\n  }\n}, _class.contextTypes = {\n  main: _globals.types.object,\n  runtime: _globals.types.object\n}, _temp);\n\n\nSidebarLayout.MenuItem = ({ content, link, name, active, icon, onClick } = {}) => {\n  const clickHandler = typeof onClick === 'function' ? onClick : link && (() => _globals.runtime.navigate(link));\n\n  return React.createElement(\n    _globals.Menu.Item,\n    { active: active, onClick: clickHandler },\n    React.createElement(_globals.Icon, { name: icon }),\n    content || _globals.runtime.stringUtils.capitalize(name)\n  );\n};\n\nexports.default = SidebarLayout;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbGF5b3V0cy9TaWRlYmFyTGF5b3V0LmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9sYXlvdXRzL1NpZGViYXJMYXlvdXQuanM/MWJhYiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBydW50aW1lLCBDb21wb25lbnQsIHR5cGVzLCBJY29uLCBTaWRlYmFyLCBNZW51LCBTZWdtZW50IH0gZnJvbSAnLi4vZ2xvYmFscydcblxuZXhwb3J0IGNsYXNzIFNpZGViYXJMYXlvdXQgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgIG1haW46IHR5cGVzLm9iamVjdCxcbiAgICBydW50aW1lOiB0eXBlcy5vYmplY3QsXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgc2lkZWJhckFuaW1hdGlvbiA9ICdwdXNoJyxcbiAgICAgIHNpZGViYXJXaWR0aCA9ICd0aGluJyxcbiAgICAgIHZpc2libGUgPSBmYWxzZSxcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgbWVudUl0ZW1zID0gW10sXG4gICAgICBzaWRlYmFyUHJvcHMgPSB7IGljb246ICdsYWJlbGVkJyB9LFxuICAgIH0gPSB0aGlzLnByb3BzXG5cbiAgICByZXR1cm4gKFxuICAgICAgPFNpZGViYXIuUHVzaGFibGUgYXM9e1NlZ21lbnR9IGJhc2ljPlxuICAgICAgICA8U2lkZWJhclxuICAgICAgICAgIGFzPXtNZW51fVxuICAgICAgICAgIGludmVydGVkXG4gICAgICAgICAgdmVydGljYWxcbiAgICAgICAgICB7Li4uc2lkZWJhclByb3BzfVxuICAgICAgICAgIHdpZHRoPXtzaWRlYmFyV2lkdGh9XG4gICAgICAgICAgYW5pbWF0aW9uPXtzaWRlYmFyQW5pbWF0aW9ufVxuICAgICAgICAgIHZpc2libGU9e3Zpc2libGV9XG4gICAgICAgID5cbiAgICAgICAgICB7bWVudUl0ZW1zLm1hcCgobWVudUl0ZW0sIGtleSkgPT4gPFNpZGViYXJMYXlvdXQuTWVudUl0ZW0ga2V5PXtrZXl9IHsuLi5tZW51SXRlbX0gLz4pfVxuICAgICAgICA8L1NpZGViYXI+XG5cbiAgICAgICAgPFNpZGViYXIuUHVzaGVyIHN0eWxlPXt7IGhlaWdodDogJzEwMCUnLCB3aWR0aDogJzEwMCUnLCBvdmVyZmxvdzogJ3Njcm9sbCcgfX0+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXhXaWR0aDogJzg1JScgfX0+e2NoaWxkcmVufTwvZGl2PlxuICAgICAgICA8L1NpZGViYXIuUHVzaGVyPlxuICAgICAgPC9TaWRlYmFyLlB1c2hhYmxlPlxuICAgIClcbiAgfVxufVxuXG5TaWRlYmFyTGF5b3V0Lk1lbnVJdGVtID0gKHsgY29udGVudCwgbGluaywgbmFtZSwgYWN0aXZlLCBpY29uLCBvbkNsaWNrIH0gPSB7fSkgPT4ge1xuICBjb25zdCBjbGlja0hhbmRsZXIgPVxuICAgIHR5cGVvZiBvbkNsaWNrID09PSAnZnVuY3Rpb24nID8gb25DbGljayA6IGxpbmsgJiYgKCgpID0+IHJ1bnRpbWUubmF2aWdhdGUobGluaykpXG5cbiAgcmV0dXJuIChcbiAgICA8TWVudS5JdGVtIGFjdGl2ZT17YWN0aXZlfSBvbkNsaWNrPXtjbGlja0hhbmRsZXJ9PlxuICAgICAgPEljb24gbmFtZT17aWNvbn0gLz5cbiAgICAgIHtjb250ZW50IHx8IHJ1bnRpbWUuc3RyaW5nVXRpbHMuY2FwaXRhbGl6ZShuYW1lKX1cbiAgICA8L01lbnUuSXRlbT5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBTaWRlYmFyTGF5b3V0XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2xheW91dHMvU2lkZWJhckxheW91dC5qcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQUNBO0FBUUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFQQTtBQVNBO0FBVEE7QUFZQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREE7QUFiQTtBQWtCQTtBQW5DQTtBQUVBO0FBQ0E7QUFGQTtBQUNBO0FBQ0E7QUFtQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/layouts/SidebarLayout.js\n");

/***/ }),

/***/ "./src/pages/Console/Console.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.Console = undefined;\n\nvar _class, _temp;\n\nvar _globals = __webpack_require__(\"./src/globals.js\");\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\nlet Console = exports.Console = (_temp = _class = class Console extends _globals.Component {\n\n  componentWillMount() {\n    var _this = this;\n\n    return _asyncToGenerator(function* () {\n      const { runtime } = _this.context;\n      const { history } = _this.props;\n      runtime.navigate = function (link) {\n        return history.push(link);\n      };\n    })();\n  }\n\n  render() {\n    return React.createElement(\n      Segment,\n      { basic: true },\n      React.createElement(Header, {\n        dividing: true,\n        as: \"h2\",\n        icon: \"code\",\n        content: \"Console\",\n        subheader: \"Interactive Project REPL\"\n      })\n    );\n  }\n}, _class.contextTypes = {\n  main: _globals.types.object,\n  runtime: _globals.types.object\n}, _temp);\nexports.default = Console;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvQ29uc29sZS9Db25zb2xlLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9wYWdlcy9Db25zb2xlL0NvbnNvbGUuanM/N2ZlYyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0eXBlcywgQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vZ2xvYmFscydcblxuZXhwb3J0IGNsYXNzIENvbnNvbGUgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgIG1haW46IHR5cGVzLm9iamVjdCxcbiAgICBydW50aW1lOiB0eXBlcy5vYmplY3QsXG4gIH1cblxuICBhc3luYyBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgY29uc3QgeyBydW50aW1lIH0gPSB0aGlzLmNvbnRleHRcbiAgICBjb25zdCB7IGhpc3RvcnkgfSA9IHRoaXMucHJvcHNcbiAgICBydW50aW1lLm5hdmlnYXRlID0gbGluayA9PiBoaXN0b3J5LnB1c2gobGluaylcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPFNlZ21lbnQgYmFzaWM+XG4gICAgICAgIDxIZWFkZXJcbiAgICAgICAgICBkaXZpZGluZ1xuICAgICAgICAgIGFzPVwiaDJcIlxuICAgICAgICAgIGljb249XCJjb2RlXCJcbiAgICAgICAgICBjb250ZW50PVwiQ29uc29sZVwiXG4gICAgICAgICAgc3ViaGVhZGVyPVwiSW50ZXJhY3RpdmUgUHJvamVjdCBSRVBMXCJcbiAgICAgICAgLz5cbiAgICAgIDwvU2VnbWVudD5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29uc29sZVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9wYWdlcy9Db25zb2xlL0NvbnNvbGUuanMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7OztBQUNBO0FBQ0E7QUFLQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFIQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBREE7QUFVQTtBQXhCQTtBQUVBO0FBQ0E7QUFGQTtBQTBCQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/Console/Console.js\n");

/***/ }),

/***/ "./src/pages/Home/Home.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.Home = undefined;\n\nvar _class, _temp;\n\nvar _globals = __webpack_require__(\"./src/globals.js\");\n\nvar _SidebarLayout = __webpack_require__(\"./src/layouts/SidebarLayout.js\");\n\nvar _SidebarLayout2 = _interopRequireDefault(_SidebarLayout);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\nlet Home = exports.Home = (_temp = _class = class Home extends _globals.Component {\n\n  componentWillMount() {\n    var _this = this;\n\n    return _asyncToGenerator(function* () {\n      const { runtime } = _this.context;\n      const { history } = _this.props;\n      runtime.navigate = function (link) {\n        return history.push(link);\n      };\n    })();\n  }\n\n  render() {\n    const { main, runtime } = this.context;\n    const { version, name = main.name } = main.get('currentPackage');\n\n    return React.createElement(\n      Segment,\n      { basic: true },\n      React.createElement(Header, {\n        as: 'h2',\n        icon: 'home',\n        dividing: true,\n        content: 'Project Home',\n        subheader: name + ' ' + (version ? `v${version}` : '')\n      })\n    );\n  }\n}, _class.contextTypes = {\n  main: _globals.types.object,\n  runtime: _globals.types.object\n}, _temp);\nexports.default = Home;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvSG9tZS9Ib21lLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9wYWdlcy9Ib21lL0hvbWUuanM/Yjg5ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMaW5rLCB0eXBlcywgQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vZ2xvYmFscydcbmltcG9ydCBTaWRlYmFyTGF5b3V0IGZyb20gJ2xheW91dHMvU2lkZWJhckxheW91dCdcblxuZXhwb3J0IGNsYXNzIEhvbWUgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgIG1haW46IHR5cGVzLm9iamVjdCxcbiAgICBydW50aW1lOiB0eXBlcy5vYmplY3QsXG4gIH1cblxuICBhc3luYyBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgY29uc3QgeyBydW50aW1lIH0gPSB0aGlzLmNvbnRleHRcbiAgICBjb25zdCB7IGhpc3RvcnkgfSA9IHRoaXMucHJvcHNcbiAgICBydW50aW1lLm5hdmlnYXRlID0gbGluayA9PiBoaXN0b3J5LnB1c2gobGluaylcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IG1haW4sIHJ1bnRpbWUgfSA9IHRoaXMuY29udGV4dFxuICAgIGNvbnN0IHsgdmVyc2lvbiwgbmFtZSA9IG1haW4ubmFtZSB9ID0gbWFpbi5nZXQoJ2N1cnJlbnRQYWNrYWdlJylcblxuICAgIHJldHVybiAoXG4gICAgICA8U2VnbWVudCBiYXNpYz5cbiAgICAgICAgPEhlYWRlclxuICAgICAgICAgIGFzPVwiaDJcIlxuICAgICAgICAgIGljb249XCJob21lXCJcbiAgICAgICAgICBkaXZpZGluZ1xuICAgICAgICAgIGNvbnRlbnQ9XCJQcm9qZWN0IEhvbWVcIlxuICAgICAgICAgIHN1YmhlYWRlcj17bmFtZSArICcgJyArICh2ZXJzaW9uID8gYHYke3ZlcnNpb259YCA6ICcnKX1cbiAgICAgICAgLz5cbiAgICAgIDwvU2VnbWVudD5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSG9tZVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9wYWdlcy9Ib21lL0hvbWUuanMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFBQTtBQUNBOzs7Ozs7O0FBQ0E7QUFDQTtBQUtBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUhBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFEQTtBQVVBO0FBM0JBO0FBRUE7QUFDQTtBQUZBO0FBNkJBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/Home/Home.js\n");

/***/ }),

/***/ "./src/pages/PackageBrowser/PackageBrowser.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.PackageBrowser = undefined;\n\nvar _class, _temp;\n\nvar _globals = __webpack_require__(\"./src/globals.js\");\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\nlet PackageBrowser = exports.PackageBrowser = (_temp = _class = class PackageBrowser extends _globals.Component {\n\n  componentWillMount() {\n    var _this = this;\n\n    return _asyncToGenerator(function* () {\n      const { runtime } = _this.context;\n      const { history } = _this.props;\n      runtime.navigate = function (link) {\n        return history.push(link);\n      };\n    })();\n  }\n\n  render() {\n    return React.createElement(\n      Segment,\n      { basic: true },\n      React.createElement(Header, {\n        dividing: true,\n        as: \"h2\",\n        icon: \"file outline\",\n        content: \"Package Browser\",\n        subheader: \"For working with any subpackages\"\n      })\n    );\n  }\n}, _class.contextTypes = {\n  main: _globals.types.object,\n  runtime: _globals.types.object\n}, _temp);\nexports.default = PackageBrowser;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvUGFja2FnZUJyb3dzZXIvUGFja2FnZUJyb3dzZXIuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL3BhZ2VzL1BhY2thZ2VCcm93c2VyL1BhY2thZ2VCcm93c2VyLmpzPzRkYmUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdHlwZXMsIENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2dsb2JhbHMnXG5cbmV4cG9ydCBjbGFzcyBQYWNrYWdlQnJvd3NlciBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgbWFpbjogdHlwZXMub2JqZWN0LFxuICAgIHJ1bnRpbWU6IHR5cGVzLm9iamVjdCxcbiAgfVxuXG4gIGFzeW5jIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICBjb25zdCB7IHJ1bnRpbWUgfSA9IHRoaXMuY29udGV4dFxuICAgIGNvbnN0IHsgaGlzdG9yeSB9ID0gdGhpcy5wcm9wc1xuICAgIHJ1bnRpbWUubmF2aWdhdGUgPSBsaW5rID0+IGhpc3RvcnkucHVzaChsaW5rKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8U2VnbWVudCBiYXNpYz5cbiAgICAgICAgPEhlYWRlclxuICAgICAgICAgIGRpdmlkaW5nXG4gICAgICAgICAgYXM9XCJoMlwiXG4gICAgICAgICAgaWNvbj1cImZpbGUgb3V0bGluZVwiXG4gICAgICAgICAgY29udGVudD1cIlBhY2thZ2UgQnJvd3NlclwiXG4gICAgICAgICAgc3ViaGVhZGVyPVwiRm9yIHdvcmtpbmcgd2l0aCBhbnkgc3VicGFja2FnZXNcIlxuICAgICAgICAvPlxuICAgICAgPC9TZWdtZW50PlxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQYWNrYWdlQnJvd3NlclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9wYWdlcy9QYWNrYWdlQnJvd3Nlci9QYWNrYWdlQnJvd3Nlci5qcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTs7O0FBQ0E7QUFDQTtBQUtBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUhBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFEQTtBQVVBO0FBeEJBO0FBRUE7QUFDQTtBQUZBO0FBMEJBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/PackageBrowser/PackageBrowser.js\n");

/***/ }),

/***/ 0:
/***/ (function(module, exports) {

eval("(function() { module.exports = global[\"React\"]; }());//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCBcIlJlYWN0XCI/OWRlOSJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gZ2xvYmFsW1wiUmVhY3RcIl07IH0oKSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJSZWFjdFwiXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///0\n");

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

eval("(function() { module.exports = global[\"ReactDOM\"]; }());//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCBcIlJlYWN0RE9NXCI/NGFiNCJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gZ2xvYmFsW1wiUmVhY3RET01cIl07IH0oKSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJSZWFjdERPTVwiXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///1\n");

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

eval("(function() { module.exports = global[\"ReactRouterDOM\"]; }());//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCBcIlJlYWN0Um91dGVyRE9NXCI/MTJlNCJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gZ2xvYmFsW1wiUmVhY3RSb3V0ZXJET01cIl07IH0oKSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJSZWFjdFJvdXRlckRPTVwiXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///2\n");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

eval("(function() { module.exports = global[\"semanticUIReact\"]; }());//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCBcInNlbWFudGljVUlSZWFjdFwiPzJiMWUiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IGdsb2JhbFtcInNlbWFudGljVUlSZWFjdFwiXTsgfSgpKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInNlbWFudGljVUlSZWFjdFwiXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///3\n");

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

eval("module.exports = require(\"skypager-runtimes-electron/renderer.js\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCBcInNreXBhZ2VyLXJ1bnRpbWVzLWVsZWN0cm9uL3JlbmRlcmVyLmpzXCI/YjBkNCJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJza3lwYWdlci1ydW50aW1lcy1lbGVjdHJvbi9yZW5kZXJlci5qc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInNreXBhZ2VyLXJ1bnRpbWVzLWVsZWN0cm9uL3JlbmRlcmVyLmpzXCJcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///4\n");

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./node_modules/expose-loader/index.js?runtime!./src/renderer.js-exposed");


/***/ })

/******/ });
});