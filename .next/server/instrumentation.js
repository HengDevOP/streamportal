"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "instrumentation";
exports.ids = ["instrumentation"];
exports.modules = {

/***/ "(instrument)/./src/instrumentation.js":
/*!********************************!*\
  !*** ./src/instrumentation.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   register: () => (/* binding */ register)\n/* harmony export */ });\nasync function register() {\n    if (true) {\n        try {\n            const { initTelegramClients } = await Promise.all(/*! import() */[__webpack_require__.e(\"vendor-chunks/telegram\"), __webpack_require__.e(\"vendor-chunks/pako\"), __webpack_require__.e(\"vendor-chunks/htmlparser2\"), __webpack_require__.e(\"vendor-chunks/ip-address\"), __webpack_require__.e(\"vendor-chunks/socks\"), __webpack_require__.e(\"vendor-chunks/big-integer\"), __webpack_require__.e(\"vendor-chunks/smart-buffer\"), __webpack_require__.e(\"vendor-chunks/entities\"), __webpack_require__.e(\"vendor-chunks/mime\"), __webpack_require__.e(\"vendor-chunks/domutils\"), __webpack_require__.e(\"vendor-chunks/graceful-fs\"), __webpack_require__.e(\"vendor-chunks/domhandler\"), __webpack_require__.e(\"vendor-chunks/tslib\"), __webpack_require__.e(\"vendor-chunks/async-mutex\"), __webpack_require__.e(\"vendor-chunks/@cryptography\"), __webpack_require__.e(\"vendor-chunks/store2\"), __webpack_require__.e(\"vendor-chunks/node-localstorage\"), __webpack_require__.e(\"vendor-chunks/dom-serializer\"), __webpack_require__.e(\"vendor-chunks/imurmurhash\"), __webpack_require__.e(\"vendor-chunks/write-file-atomic\"), __webpack_require__.e(\"vendor-chunks/ts-custom-error\"), __webpack_require__.e(\"vendor-chunks/slide\"), __webpack_require__.e(\"vendor-chunks/domelementtype\"), __webpack_require__.e(\"_instrument_src_lib_telegramManager_js\")]).then(__webpack_require__.bind(__webpack_require__, /*! ./lib/telegramManager */ \"(instrument)/./src/lib/telegramManager.js\"));\n            await initTelegramClients();\n        } catch (err) {\n            console.error(\"Failed to auto-connect Telegram clients on boot:\", err);\n        }\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGluc3RydW1lbnQpLy4vc3JjL2luc3RydW1lbnRhdGlvbi5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQU8sZUFBZUE7SUFDcEIsSUFBSUMsSUFBcUMsRUFBRTtRQUN6QyxJQUFJO1lBQ0YsTUFBTSxFQUFFRyxtQkFBbUIsRUFBRSxHQUFHLE1BQU0sZzNDQUErQjtZQUNyRSxNQUFNQTtRQUNSLEVBQUUsT0FBT0MsS0FBSztZQUNaQyxRQUFRQyxLQUFLLENBQUMsb0RBQW9ERjtRQUNwRTtJQUNGO0FBQ0YiLCJzb3VyY2VzIjpbIi9Vc2Vycy9ob2NoZW5oZW5nL0Rlc2t0b3AvU3RyZWFtSW50ZXJncmF0aW9uL3NyYy9pbnN0cnVtZW50YXRpb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlZ2lzdGVyKCkge1xuICBpZiAocHJvY2Vzcy5lbnYuTkVYVF9SVU5USU1FID09PSAnbm9kZWpzJykge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGluaXRUZWxlZ3JhbUNsaWVudHMgfSA9IGF3YWl0IGltcG9ydCgnLi9saWIvdGVsZWdyYW1NYW5hZ2VyJyk7XG4gICAgICBhd2FpdCBpbml0VGVsZWdyYW1DbGllbnRzKCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGF1dG8tY29ubmVjdCBUZWxlZ3JhbSBjbGllbnRzIG9uIGJvb3Q6XCIsIGVycik7XG4gICAgfVxuICB9XG59XG4iXSwibmFtZXMiOlsicmVnaXN0ZXIiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9SVU5USU1FIiwiaW5pdFRlbGVncmFtQ2xpZW50cyIsImVyciIsImNvbnNvbGUiLCJlcnJvciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(instrument)/./src/instrumentation.js\n");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "constants":
/*!****************************!*\
  !*** external "constants" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("constants");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("net");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "websocket":
/*!****************************!*\
  !*** external "websocket" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("websocket");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("./webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(instrument)/./src/instrumentation.js"));
module.exports = __webpack_exports__;

})();