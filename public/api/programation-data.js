// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { getLinkFromBrowser, getProgramationFromBrowser } = require('./_lib/handlers');

async function handler(createPage, closePage, _date) {
  const url = 'https://wol.jw.org/pt';
  let page;

  const date = new Date(_date).toISOString(); 
  
  try {
    //FIRST CALL TO PUPPETEER
    page = await createPage(url);
    const link = await page.evaluate(getLinkFromBrowser, date);

    //SECOND CALL TO PUPPETEER
    await page.goto(link);
    
    const data = await page.evaluate(getProgramationFromBrowser, date);

    closePage(page);

    return data;
  } catch (error) {
    console.log(error);
    if (browser) closePage(page);
  } 
};

module.exports = handler;