async function handler(createPage, closePage) {
  const url = 'https://wol.jw.org';
  const language = '/pt';

  let page;
  
  try {
    //FIRST CALL TO PUPPETEER
    page = await createPage(url+language);

    const linkToPublications = await page.evaluate(() => {
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
      const year = document
        .querySelector(".row.card a");

      return {
        link: year?.getAttribute('href'),
        year: year?.innerText.trim().split(" ").pop(),
      };
    });

    //FORTH CALL TO PUPPETEER
    await page.goto(url+workbookInfo.link);

    const month = await page.evaluate(() => {
      return document
        .querySelector('.directory.navCard')
        ?.childElementCount || 0;
    });

    const normalDate = getNormalDate(workbookInfo.year, month);

    closePage(page);

    return normalDate;
  } catch (error) {
    console.log(error);
    closePage(page);
  } 
}

function getNormalDate(year, month) {
  const lastDayOfTheMonth = new Date(Number(year), Number(month) * 2, 0)
    .getDate();

  return `${Number(month) * 2}/${lastDayOfTheMonth}/${year}`;
};

module.exports = handler;