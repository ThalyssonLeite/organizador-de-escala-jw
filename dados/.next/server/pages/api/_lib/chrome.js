"use strict";
(() => {
var exports = {};
exports.id = 173;
exports.ids = [173];
exports.modules = {

/***/ 250:
/***/ ((module) => {

module.exports = import("puppeteer-core");;

/***/ }),

/***/ 924:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ newBrowser),
/* harmony export */   "disconectBrowser": () => (/* binding */ disconectBrowser),
/* harmony export */   "url": () => (/* binding */ url),
/* harmony export */   "userAgent": () => (/* binding */ userAgent)
/* harmony export */ });
/* harmony import */ var puppeteer_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(250);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([puppeteer_core__WEBPACK_IMPORTED_MODULE_0__]);
puppeteer_core__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const url = "https://wol.jw.org/pt/wol/h/r5/lp-t";
let browser;
function disconectBrowser() {
    if (browser && browser.isConnected()) browser.close();
}
async function newBrowser() {
    if (!browser || !browser.isConnected()) browser = await puppeteer_core__WEBPACK_IMPORTED_MODULE_0__["default"].launch({
        executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
    });
    return browser;
}
const userAgent = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36";

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(924));
module.exports = __webpack_exports__;

})();