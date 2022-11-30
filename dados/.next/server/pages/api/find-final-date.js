"use strict";
(() => {
var exports = {};
exports.id = 697;
exports.ids = [697,173,333];
exports.modules = {

/***/ 462:
/***/ ((module) => {

module.exports = import("puppeteer");;

/***/ }),

/***/ 17:
/***/ ((module) => {

module.exports = require("path");

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
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var puppeteer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(462);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([puppeteer__WEBPACK_IMPORTED_MODULE_1__]);
puppeteer__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const url = "https://wol.jw.org/pt/wol/h/r5/lp-t";
let browser;
function disconectBrowser() {
    if (browser && browser.isConnected()) browser.close();
}
async function newBrowser() {
    if (!browser || !browser.isConnected()) browser = await puppeteer__WEBPACK_IMPORTED_MODULE_1__["default"].launch({
        executablePath: path__WEBPACK_IMPORTED_MODULE_0___default().join(__dirname, "..", "..", "..", "..", "/chrome/chrome.exe")
    });
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

/***/ 811:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _lib_chrome__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(924);
/* harmony import */ var _lib_initializeBrowser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(259);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_chrome__WEBPACK_IMPORTED_MODULE_0__, _lib_initializeBrowser__WEBPACK_IMPORTED_MODULE_1__]);
([_lib_chrome__WEBPACK_IMPORTED_MODULE_0__, _lib_initializeBrowser__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


async function handler(req, res) {
    const url = "https://wol.jw.org";
    const language = "/pt";
    let browser;
    let page;
    try {
        //FIRST CALL TO PUPPETEER
        let lauchedBrowser = await (0,_lib_initializeBrowser__WEBPACK_IMPORTED_MODULE_1__["default"])(url + language);
        browser = lauchedBrowser.browser;
        page = lauchedBrowser.page;
        const linkToPublications = await page.evaluate(()=>{
            const linkToPublications = document.querySelector("#menuPublications a")?.getAttribute("href") || "";
            return linkToPublications;
        });
        //SECOND CALL TO PUPPETEER
        await page.goto(url + linkToPublications);
        const workbookLink = await page.evaluate(()=>{
            const publications = Array.from(document.querySelectorAll(".row.card a"));
            const workbook = publications.find((a)=>a.getAttribute("href")?.includes("apostilas"));
            return workbook?.getAttribute("href") || "";
        });
        //THIRD CALL TO PUPPETEER
        await page.goto(url + workbookLink);
        const workbookInfo = await page.evaluate(()=>{
            const year = document.querySelector(".row.card a");
            return {
                link: year?.getAttribute("href"),
                year: year?.innerText.trim().split(" ").pop()
            };
        });
        //FORTH CALL TO PUPPETEER
        await page.goto(url + workbookInfo.link);
        const month = await page.evaluate(()=>{
            return document.querySelector(".directory.navCard")?.childElementCount || 0;
        });
        const normalDate = getNormalDate(workbookInfo.year, month);
        (0,_lib_chrome__WEBPACK_IMPORTED_MODULE_0__.disconectBrowser)();
        res.status(200).end(normalDate);
    } catch (error) {
        console.log(error);
        if (browser) (0,_lib_chrome__WEBPACK_IMPORTED_MODULE_0__.disconectBrowser)();
        res.status(400).end();
    }
}
function getNormalDate(year, month) {
    const lastDayOfTheMonth = new Date(Number(year), Number(month) * 2, 0).getDate();
    return `${Number(month) * 2}/${lastDayOfTheMonth}/${year}`;
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
var __webpack_exports__ = (__webpack_exec__(811));
module.exports = __webpack_exports__;

})();