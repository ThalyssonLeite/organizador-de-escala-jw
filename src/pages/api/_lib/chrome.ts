import puppeteer, { Browser } from 'puppeteer-core';
import getOptions from './chromeOptions';

export const url = 'https://wol.jw.org/pt/wol/h/r5/lp-t';

let browser: Browser;

export function disconectBrowser() {
  if (browser && browser.isConnected()) browser.close();
};

export default async function newBrowser(): Promise<Browser> {
  const isDev = !process.env.AWS_REGION;
  const options = await getOptions(isDev);

  if (!browser || !browser.isConnected()) browser = await puppeteer.launch(options);

  return browser;
};

export const userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36';