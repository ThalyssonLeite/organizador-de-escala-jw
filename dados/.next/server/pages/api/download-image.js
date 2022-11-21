"use strict";
(() => {
var exports = {};
exports.id = 109;
exports.ids = [109];
exports.modules = {

/***/ 438:
/***/ ((module) => {

module.exports = require("node-poppler");

/***/ }),

/***/ 738:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "config": () => (/* binding */ config),
  "default": () => (/* binding */ handler)
});

;// CONCATENATED MODULE: external "fs"
const external_fs_namespaceObject = require("fs");
var external_fs_default = /*#__PURE__*/__webpack_require__.n(external_fs_namespaceObject);
;// CONCATENATED MODULE: external "adm-zip"
const external_adm_zip_namespaceObject = require("adm-zip");
var external_adm_zip_default = /*#__PURE__*/__webpack_require__.n(external_adm_zip_namespaceObject);
;// CONCATENATED MODULE: ./src/pages/api/download-image.ts

const { Poppler  } = __webpack_require__(438);

async function handler(req, res) {
    const tempPath = "./temp";
    const tempExists = external_fs_default().existsSync(tempPath);
    if (tempExists) external_fs_default().rmSync(tempPath, {
        recursive: true,
        force: true
    });
    external_fs_default().mkdirSync("./temp");
    external_fs_default().mkdirSync("./temp/images");
    const pdfPipe = req.pipe(external_fs_default().createWriteStream("./temp/Escala.pdf"));
    pdfPipe.on("finish", async ()=>{
        const file = "./temp/Escala.pdf";
        const poppler = new Poppler();
        const options = {
            pngFile: true
        };
        const outputFile = `./temp/images/Escala`;
        await poppler.pdfToCairo(file, outputFile, options);
        const images = external_fs_default().readdirSync("./temp/images");
        const zip = new (external_adm_zip_default())();
        images.forEach((image)=>{
            zip.addLocalFile("./temp/images/" + image);
        });
        const zipName = "Escala de Meio de Semana PNG.zip";
        const data = zip.toBuffer();
        res.setHeader("Content-Type", "application/octet-stream");
        res.setHeader("Content-Disposition", `attachment; filename=${zipName}`);
        res.setHeader("Content-Length", data.length);
        res.end(data);
    });
}
const config = {
    api: {
        responseLimit: "20mb",
        bodyParser: false
    }
};


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(738));
module.exports = __webpack_exports__;

})();