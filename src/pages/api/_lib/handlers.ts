function getLinkFromBrowser (date: string)  {
  const getNumberOfWeeksTillThisDate = (date: string): number => {
    const currentDate = new Date(date);
    const startDate = new Date(currentDate.getFullYear(), 0, 1);
    const oneDayInMiliseconds = 24 * 60 * 60 * 1000;
    const days = Math.floor((+currentDate - +startDate - oneDayInMiliseconds) / oneDayInMiliseconds);
         
    const weekNumber = Math.ceil(days / 7);
    return weekNumber;
  };

  const linkToScheduleFromJW = document.querySelector('#menuToday a')?.getAttribute('href');
  const linkToScheduleFromJWSplited = linkToScheduleFromJW?.split('/');
  linkToScheduleFromJWSplited?.splice(linkToScheduleFromJWSplited.length - 2, 2);
 
  const currentYear = new Date().getFullYear();
  const numberOfWeeks = getNumberOfWeeksTillThisDate(date);

  return `https://wol.jw.org${linkToScheduleFromJWSplited?.join('/')}/${currentYear}/${numberOfWeeks}`;
};

function getProgramationFromBrowser () {
  const removeDirt = (text: string | null | undefined) => (text || '').replaceAll(/\:/g, '').trim();
  const getTextFrom = (query: string) => removeDirt(document.querySelector(query)?.textContent || '');
  const getManyTexstFrom = (query: string) => Array.from(document.querySelectorAll(query))?.map(node => removeDirt(node.textContent || ''))?.filter(text => text);
  const getChildrenFrom = (query: string) => Array.from(document.querySelector(query)?.children || []);

  const $4sectionNodes = getChildrenFrom('#section4 ul');
  $4sectionNodes.splice($4sectionNodes.length - 2, 1);//removing Final Comments part;

  const programationTree = {
    songs: [
      getTextFrom('#section1 #p3 a'),
      Array.from($4sectionNodes.shift()?.querySelectorAll('strong') || [])
        .map(node => removeDirt(node.textContent))
        .filter(text => text)[0],
      Array.from($4sectionNodes.pop()?.querySelectorAll('strong') || [])
        .map(node => removeDirt(node.textContent))
        .filter(text => text)[0],
    ],
    week: getTextFrom('header #p1 strong'),
    weekExcerpt: getTextFrom('header #p2 strong'),
    treasures: removeDirt(getTextFrom('#section2 #p6 a strong')),
    ministry: getChildrenFrom('#section3 ul').map(({children}) => {
      const [ title ] = Array.from(children[0].children);


      return {
        title: removeDirt(title.textContent),
        time: removeDirt((children[0].textContent?.match(/\(.+?\)/) || [])[0])
      };
    }),
    cristianLife: $4sectionNodes.map(node => {
      return {
        title: Array.from(node.querySelectorAll('strong'))?.map(strong => removeDirt(strong.textContent)).filter(text => text).join(''),
        time: removeDirt(node.textContent?.match(/\(.+?\)/)?.[0])
      }
    })
  };

  return programationTree;
};

export { getLinkFromBrowser, getProgramationFromBrowser }