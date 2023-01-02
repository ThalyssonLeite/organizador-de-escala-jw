const domToPdf = require('../../../libs/dom-to-pdf');
import S from '../../../App.module.scss';

//UTIL
export function downloadText(filename: string, text: string, formart: string = 'plain') {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/'+formart+';charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function getFilePrefix () {
  return location.pathname === '/' ? 'Escalas' : 'Designações';
};

function getMonthWindow () {
  const weeks = JSON.parse(localStorage.getItem('weeks'));
  
  let weeksTitles = weeks.map(week => week.week[0].title.split(' ').pop());
  weeksTitles = [...new Set(weeksTitles)];
  
  const firstWeek = weeksTitles[0];
  const lastWeek = weeksTitles[weeksTitles.length - 2];
  
  return weeksTitles.length > 2
    ? `${firstWeek}${firstWeek !== lastWeek ? ` - ${lastWeek}`: ''}`
    : firstWeek;
};

//BOTH
export async function downloadAsPDF (e: any) {
  let $node: any = document.querySelector('*[data-id="programation-wrapper"]').cloneNode(true);

  $node.classList.add(S.toPrint);

  const options = {
    overrideWidth: 1000,
    filename: `${getFilePrefix()} para ${getMonthWindow()} PDF`,
    compression: 'SLOW'
  };

  domToPdf($node, options);

  $node = null;
};

export async function downloadAsPNG (e: any) {
  let $node: any = document.querySelector('div[data-id="programation-wrapper"]').cloneNode(true);
  const options = {
    overrideWidth: 1000,
    filename: `${getFilePrefix()} de Meio de Semana PNG`,
    compression: 'SLOW',
    byPassDownload: true
  };

  $node.classList.add(S.toPrint);

  domToPdf($node, options, async (pdf: any) => {
    const pdfArrayBuffer = await pdf.output('blob').arrayBuffer();

    const imageZippedArrayBuffer = await (window as any).electronAPI.downloadImage(pdfArrayBuffer);

    const blob = new Blob([imageZippedArrayBuffer]);

    const a = document.createElement('a');
    document.body.appendChild(a);
    const url = URL.createObjectURL(blob);
    a.href = url;
    a.download = `${getFilePrefix()} para ${getMonthWindow()} PNG.zip`;
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  $node = null;
};

//SCALES
export function downloadScalesAsText () {
  const $endNode = document.createElement('div');
  $endNode.innerHTML = '$end';
  const $wrapper = document.querySelector('*[data-id="programation-wrapper"]');

  const programationWrappers = Array.from($wrapper.childNodes);
  const allMainElements = programationWrappers
    .map((node: any) => [...Array.from(node.childNodes), $endNode])
    .flat(2);
  const arrayOfTexts = allMainElements
    .map((node: any) => node.innerText)
    .map(text => text.split('\n'))
    .map(([label, ...rest]) => {
      label = label.replace('(', ' (')
      const thereIsRest = rest[0];
      const restOfTheText = thereIsRest
        ? ` | ${rest.join(' ')}`
        : '';
      const endNodeLineSpecialBreak = label === '$end'
        ? '\n'
        : '';

      return `${endNodeLineSpecialBreak || label}${restOfTheText}`
    })
  
  const finalFormatedText = arrayOfTexts.join('\n');
  const filename = `Escalas para ${getMonthWindow()} TXT`;

  downloadText(filename, finalFormatedText);
};

//DESIGNATIONS
export function downloadDesignationsAsText () {
  const designations = JSON.parse(localStorage.getItem('designations'));
  const designationKeys = Object.keys(designations);
  const justRoomA = designationKeys
    .flatMap(key => designations[key])
    .every(part => part.room === 'A');

  const text = `${designationKeys.map((participant, i) => {
    return `${i ? '\n\n' : ''}Designação para ${participant}
      ${designations[participant].map((designation: any, i: number) => {
        return `
Semana: ${designation?.week}
Parte: ${designation?.title}
Designado${designation.plural ? 's' : ''}: ${designation?.participants}${justRoomA ? '' : `\nSala: ${designation.room}\n`}`
      }).join('')}`
  }).join('')}`

  downloadText(`Designações para ${getMonthWindow()} TXT`, text);
};

//BACKUP
export function saveBackupHandler () {
  downloadText(
    `Backup de Escalas para ${getMonthWindow()}.backup`,
    localStorage.getItem('weeks') || '[]'
  );
};

export async function importBackup (e: any) {
  e.stopPropagation();
  const $target = e.currentTarget;
  const file = await $target.files[0].text();
  const backupWeeks = JSON.parse(file);

  if (Array.isArray(backupWeeks)) {
    localStorage.setItem('weeks', JSON.stringify(backupWeeks));

    $target.value = null;
    (window as any).setWeeks(backupWeeks);
  }
};