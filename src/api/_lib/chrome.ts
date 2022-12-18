import path from 'path';
import puppeteer, { Browser } from 'puppeteer-core';

export const url = 'https://wol.jw.org/pt/wol/h/r5/lp-t';

let browser: Browser;

export function disconectBrowser() {
  if (browser && browser.isConnected()) browser.close();
};

export default async function newBrowser(): Promise<Browser> {
  if (!browser || !browser.isConnected()) browser = await puppeteer.launch({executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'});

  return browser;
};

export const userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36';