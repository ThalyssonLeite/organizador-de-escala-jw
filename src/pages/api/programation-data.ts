import { NextApiRequest, NextApiResponse } from "next";
import initializeBrowser from './_lib/initializeBrowser';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url: any = req.query.url || '';

  try {
    const {browser, page} = await initializeBrowser(url);

    const data = await page.evaluate(() => {

      return document.body.innerHTML;
    });

    browser.close();

    res.status(200).json({ html: data });
  } catch (e) {
    console.log(JSON.stringify(url))
    res.status(400).end();
  };
};

export default handler;