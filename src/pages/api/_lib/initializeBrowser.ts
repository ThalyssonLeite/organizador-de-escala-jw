import { Page } from 'puppeteer-core';
import { Browser } from 'puppeteer-core';
import newBrowser, { userAgent } from './chrome';

export interface ILaunchedBrowser {
  browser: Browser
  page: Page,
}

async function handler (url: string): Promise<ILaunchedBrowser> {
  const browser = await newBrowser();
  const page = await browser.newPage();
  await page.setUserAgent(userAgent);
  await page.goto(url);

  return {
    browser,
    page
  };
};

export default handler;