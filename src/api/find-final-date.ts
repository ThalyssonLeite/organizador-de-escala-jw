import { Page } from 'puppeteer-core';
import { disconectBrowser } from './_lib/chrome';
import initializeBrowser from './_lib/initializeBrowser';

export default async function handler() {
  const url = 'https://wol.jw.org';
  const language = '/pt';

  let browser;
  let page: Page;
  
  try {
    //FIRST CALL TO PUPPETEER
    let lauchedBrowser = await initializeBrowser(url+language);
    browser = lauchedBrowser.browser;
    page = lauchedBrowser.page;

    const linkToPublications = await page.evaluate((): string => {
      const linkToPublications = document.querySelector('#menuPublications a')?.getAttribute('href') || '';

      return linkToPublications;
    });

    //SECOND CALL TO PUPPETEER
    await page.goto(url+linkToPublications);

    const workbookLink = await page.evaluate(() => {
      const publications = Array.from(
        document
        .querySelectorAll(".row.card a")
      );

      const workbook = publications
      .find(a => a.getAttribute('href')?.includes('apostilas'));

      return workbook
        ?.getAttribute('href') || '';
    });

    //THIRD CALL TO PUPPETEER
    await page.goto(url+workbookLink);

    const workbookInfo = await page.evaluate(() => {
      const year: any = document
        .querySelector(".row.card a");

      return {
        link: year?.getAttribute('href'),
        year: year?.innerText.trim().split(" ").pop(),
      };
    });

    //FORTH CALL TO PUPPETEER
    await page.goto(url+workbookInfo.link);

    const month = await page.evaluate((): number => {
      return document
        .querySelector('.directory.navCard')
        ?.childElementCount || 0;
    });

    const normalDate = getNormalDate(workbookInfo.year, month);

    disconectBrowser();

    return normalDate;
  } catch (error) {
    console.log(error);
    if (browser) disconectBrowser();
  } 
}

function getNormalDate(year: number, month: number) {
  const lastDayOfTheMonth = new Date(Number(year), Number(month) * 2, 0)
    .getDate();

  return `${Number(month) * 2}/${lastDayOfTheMonth}/${year}`;
};