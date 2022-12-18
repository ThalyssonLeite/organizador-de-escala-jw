// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Browser, Page } from 'puppeteer-core';
import { disconectBrowser } from './_lib/chrome';
import { getLinkFromBrowser, getProgramationFromBrowser } from './_lib/handlers';
import initializeBrowser from './_lib/initializeBrowser';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const url = 'https://wol.jw.org/pt';
  let browser;
  let page: Page;
  
  try {
    //FIRST CALL TO PUPPETEER
    let lauchedBrowser = await initializeBrowser(url);
    browser = lauchedBrowser.browser;
    page = lauchedBrowser.page;

    const date: any = req.query.date;

    const link = await page.evaluate(getLinkFromBrowser, date);

    //SECOND CALL TO PUPPETEER
    await page.goto(link);

    const data = await page.evaluate(getProgramationFromBrowser, date);

    disconectBrowser();

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    if (browser) disconectBrowser();

    res.status(400).end();
  } 
};
