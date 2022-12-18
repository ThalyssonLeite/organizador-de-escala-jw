const fs = require('fs');
const { Poppler } = require("node-poppler");
const admzip = require('adm-zip');

function toBuffer(ab) {
  const buf = Buffer.alloc(ab.byteLength);
  const view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; ++i) {
      buf[i] = view[i];
  }
  return buf;
}

function toArrayBuffer(buf) {
  const ab = new ArrayBuffer(buf.length);
  const view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; ++i) {
      view[i] = buf[i];
  }
  return ab;
}

async function handler (pdfArrayBuffer) {
  const tempPath = './temp';
  const tempExists = fs.existsSync(tempPath);
  if (tempExists) fs.rmSync(tempPath, { recursive: true, force: true });
  fs.mkdirSync('./temp');
  fs.mkdirSync('./temp/images');

  const pdfBuffer = toBuffer(pdfArrayBuffer);
  fs.writeFileSync('./temp/Escala.pdf', pdfBuffer)

  const file = './temp/Escala.pdf';

  const poppler = new Poppler();
  const options = {
    pngFile: true,
  };

  const outputFile = `./temp/images/Escala`;

  await poppler.pdfToCairo(file, outputFile, options);

  const images = fs.readdirSync('./temp/images');
  const zip = new admzip();
  images.forEach((image) => {
    zip.addLocalFile('./temp/images/'+image);
  })

  const data = zip.toBuffer();

  return toArrayBuffer(data);
}

module.exports = handler;