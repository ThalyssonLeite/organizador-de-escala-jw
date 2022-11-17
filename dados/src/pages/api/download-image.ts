import { NextApiRequest, NextApiResponse } from "next";
import fs from 'fs';
import {pdfToPng} from 'pdf-to-png-converter';
import admzip from 'adm-zip';

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  const tempPath = './temp';
  const tempExists = fs.existsSync(tempPath);
  if (tempExists) fs.rmSync(tempPath, { recursive: true, force: true });
  fs.mkdirSync('./temp');

  const pdfPipe = req.pipe(fs.createWriteStream('./temp/Escala.pdf'));

  pdfPipe.on('finish', async () => {
    await pdfToPng('./temp/Escala.pdf', {
      outputFolder: './temp/images'
    })

    const images = fs.readdirSync('./temp/images');
    const zip = new admzip();
    images.forEach((image) => {
      zip.addLocalFile('./temp/images/'+image);
    })

    const zipName = 'Escala de Meio de Semana PNG.zip'
    const data = zip.toBuffer();

    res.setHeader('Content-Type','application/octet-stream');
    res.setHeader('Content-Disposition',`attachment; filename=${zipName}`);
    res.setHeader('Content-Length',data.length);
    res.end(data);
  })
}

export const config = {
  api: {
      responseLimit: '20mb',
      bodyParser: false
  }
}