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

//SCALES
export async function downloadScaleAsPDF (e: any) {
  const $node = document.querySelector('*[data-id="programation-wrapper"]');
  const options = {
    overrideWidth: 1000,
    filename: 'Escala de Meio de Semana PDF'
  };

  $node.classList.add(S.toPrint);

  domToPdf($node, options, (pdf: any) => {
    $node.classList.remove(S.toPrint);
  })
};

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
  const filename = 'Escala de Meio de Semana TXT';

  downloadText(filename, finalFormatedText);
};

export async function downloadScaleAsPNG (e: any) {
  const $node = document.querySelector('div[data-id="programation-wrapper"]');
  const options = {
    overrideWidth: 1000,
    filename: 'Escala de Meio de Semana PDF',
    byPassDownload: true
  };

  $node.classList.add(S.toPrint);


  domToPdf($node, options, async (pdf: any) => {
    $node.classList.remove(S.toPrint);
    const pdfArrayBuffer = await pdf.output('blob').arrayBuffer();

    const imageZippedArrayBuffer = await (window as any).electronAPI.downloadImage(pdfArrayBuffer);

    const blob = new Blob([imageZippedArrayBuffer]);

    const a = document.createElement('a');
    document.body.appendChild(a);
    const url = URL.createObjectURL(blob);
    a.href = url;
    a.download = 'Escala de Meio de Semana PNG.zip';
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
};

//BACKUP
export function saveBackupHandler () {
  downloadText(
    'Backup de Escalas de Meio de Semana.backup',
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