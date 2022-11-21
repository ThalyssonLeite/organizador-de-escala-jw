"use strict";
(() => {
var exports = {};
exports.id = 950;
exports.ids = [950,173,333];
exports.modules = {

/***/ 462:
/***/ ((module) => {

module.exports = import("puppeteer");;

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
/* harmony import */ var puppeteer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(462);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([puppeteer__WEBPACK_IMPORTED_MODULE_0__]);
puppeteer__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const url = "https://wol.jw.org/pt/wol/h/r5/lp-t";
let browser;
function disconectBrowser() {
    if (browser && browser.isConnected()) browser.close();
}
async function newBrowser() {
    if (!browser || !browser.isConnected()) browser = await puppeteer__WEBPACK_IMPORTED_MODULE_0__["default"].launch();
    return browser;
}
const userAgent = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36";

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 259:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _chrome__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(924);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_chrome__WEBPACK_IMPORTED_MODULE_0__]);
_chrome__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

async function handler(url) {
    const browser = await (0,_chrome__WEBPACK_IMPORTED_MODULE_0__["default"])();
    const page = await browser.newPage();
    await page.setUserAgent(_chrome__WEBPACK_IMPORTED_MODULE_0__.userAgent);
    await page.goto(url);
    return {
        browser,
        page
    };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handler);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 748:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _lib_chrome__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(924);
/* harmony import */ var _lib_handlers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(756);
/* harmony import */ var _lib_initializeBrowser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(259);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_chrome__WEBPACK_IMPORTED_MODULE_0__, _lib_initializeBrowser__WEBPACK_IMPORTED_MODULE_1__]);
([_lib_chrome__WEBPACK_IMPORTED_MODULE_0__, _lib_initializeBrowser__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction



async function handler(req, res) {
    const url = "https://wol.jw.org/pt";
    let browser;
    let page;
    try {
        //FIRST CALL TO PUPPETEER
        let lauchedBrowser = await (0,_lib_initializeBrowser__WEBPACK_IMPORTED_MODULE_1__["default"])(url);
        browser = lauchedBrowser.browser;
        page = lauchedBrowser.page;
        const date = req.query.date;
        const link = await page.evaluate(_lib_handlers__WEBPACK_IMPORTED_MODULE_2__.getLinkFromBrowser, date);
        //SECOND CALL TO PUPPETEER
        await page.goto(link);
        const data = await page.evaluate(_lib_handlers__WEBPACK_IMPORTED_MODULE_2__.getProgramationFromBrowser, date);
        (0,_lib_chrome__WEBPACK_IMPORTED_MODULE_0__.disconectBrowser)();
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        if (browser) (0,_lib_chrome__WEBPACK_IMPORTED_MODULE_0__.disconectBrowser)();
        res.status(400).end();
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [756], () => (__webpack_exec__(748)));
module.exports = __webpack_exports__;

})();