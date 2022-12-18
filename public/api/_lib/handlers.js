const crypto = require('crypto');

function getLinkFromBrowser (date)  {
  const getNumberOfWeeksTillThisDate = (date) => {
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
 
  const currentYear = new Date(date).getFullYear();
  const numberOfWeeks = getNumberOfWeeksTillThisDate(date);

  return `https://wol.jw.org${linkToScheduleFromJWSplited?.join('/')}/${currentYear}/${numberOfWeeks}`;
};

function getProgramationFromBrowser () {
  const removeDirt = (text) => (text || '').replaceAll(/\:/g, '').trim();
  const getTextFrom = (query) => removeDirt(document.querySelector(query)?.textContent || '');
  const getManyTextsFrom = (query) => Array.from(document.querySelectorAll(query))?.map(node => removeDirt(node.textContent || ''))?.filter(text => text);
  const getChildrenFrom = (query) => Array.from(document.querySelector(query)?.children || []);

  const $4sectionNodes = getChildrenFrom('#section4 ul');
  $4sectionNodes.splice($4sectionNodes.length - 2, 1);//removing Final Comments part;

  const programationTree = {
    id: crypto.randomUUID().slice(0,6),
    songs: [
      { title: getTextFrom('#section1 #p3 a') },
      { title: Array.from($4sectionNodes.shift()?.querySelectorAll('strong') || [])
        .map(node => removeDirt(node.textContent))
        .filter(text => text)[0] },
      { title: Array.from($4sectionNodes.pop()?.querySelectorAll('strong') || [])
        .map(node => removeDirt(node.textContent))
        .filter(text => text)[0] },
    ],
    comments: [
      { title: 'Comentários iniciais', time: '(1 min)'},
      { title: 'Comentários finais', time: '(3 min)'},
    ],
    week: [{ title: getTextFrom('header #p1 strong') }],
    weekExcerpt: [{ title: getTextFrom('header #p2 strong') }],
    treasures: [
      { title: getManyTextsFrom('#section2 #p6 strong').join(''), time: '(10 min)' },
      { title: 'Joias espirituais', time: '(10 min)' },
      { title: "Leitura da Bíblia", time: '(4 min)' }
    ],
    ministry: getChildrenFrom('#section3 ul').map((li) => {
      const title = Array
        .from(li.querySelectorAll('strong'))
        .map(strong => strong.textContent)
        .join('');

      return {
        title: removeDirt(title),
        time: removeDirt((li.children[0].textContent?.match(/\(.+?\)/) || [])[0])
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

module.exports = { getLinkFromBrowser, getProgramationFromBrowser }