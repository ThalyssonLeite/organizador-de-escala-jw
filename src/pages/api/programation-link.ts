// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import initializeBrowser from './_lib/initializeBrowser';

export type IDataProgramationLink = {
  link?: string;
  message?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<IDataProgramationLink>) {
  const url = 'https://wol.jw.org/pt';
  
  try {
    const {browser, page} = await initializeBrowser(url);

    const date: any = req.query.date;

    const data = await page.evaluate((
      date: string,
    ) => {
      const getNumberOfWeeksTillThisDate = (date: string): number => {
        const currentDate = new Date(date);
        const startDate = new Date(currentDate.getFullYear(), 0, 1);
        const days = Math.floor((+currentDate - +startDate) /
            (24 * 60 * 60 * 1000));
             
        const weekNumber = Math.ceil(days / 7);
        return weekNumber;
      };

      const linkToScheduleFromJW = document.querySelector('#menuToday a')?.getAttribute('href');
      const linkToScheduleFromJWSplited = linkToScheduleFromJW?.split('/');
      linkToScheduleFromJWSplited?.splice(linkToScheduleFromJWSplited.length - 2, 2);
     
      const currentYear = new Date().getFullYear();
      const numberOfWeeks = getNumberOfWeeksTillThisDate(date);

      return `https://wol.jw.org${linkToScheduleFromJWSplited?.join('/')}/${currentYear}/${numberOfWeeks}`;
    }, date);

    res.status(200).json({ link: data });
  
    browser.close();
  } catch (e) {
    console.log(e)

    res.status(400).json({ message: 'error my son, AN ERROR' });
  } 
};
