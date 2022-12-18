import React from 'react';
import { useEffect, useRef, useState } from 'react';
import Programation from './components/Programation/Programation';
import S from './App.module.scss';

import {WeeksManager} from './components/WeeksManager/WeeksManager';
import classNames from 'classnames';
import Desgination from './components/Designations/Designation';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const domToPdf = require('./libs/dom-to-pdf');

async function crawlDataFromJW(date: Date) {
  const dataProgamation = await (window as any).electronAPI.programationData(date.toISOString());

  return dataProgamation;
};

async function getMaxDateForWorkBooks(callback: (date: Date) => void) {
  let maxWorkbookDate;

  try {
    maxWorkbookDate = await (window as any).electronAPI.findFinalDate();
  } catch (e) {}

  if (!maxWorkbookDate) return;

  const data = {
    maxWorkbookDate: new Date(maxWorkbookDate)
  };

  localStorage.setItem('maxDateLastUpdate', JSON.stringify(data));

  callback(data.maxWorkbookDate);
};

export function downloadText(filename: string, text: string, formart: string = 'plain') {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/'+formart+';charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

const App: React.FunctionComponent = (props: any) => {
  const localStorageWeeksKey = 'weeks';

  const [weeks, setWeeks] = useState<any>(getWeeksFromLocalStorage());
  const [loading, setLoading] = useState(false);
  const [maxDate, setMaxDate] = useState<Date | undefined>(undefined);
  const [designationsState, setDesignationsState] = useState<boolean>(false);

  function getWeeksFromLocalStorage() {
    const weeksStored = JSON.parse(localStorage.getItem(localStorageWeeksKey) || '[]');

    return weeksStored;
  }

  useEffect(() => {
    getMaxDateForWorkBooks(setMaxDate);
  }, []);

  useEffect(() => {
    localStorage.setItem('version', '1.0.0');
  }, []);

  const onAddWeek = async (date: Date, noMeeting: false | string) => {
    setLoading(true);

    const data = await crawlDataFromJW(date);

    if (!data) return;

    const newWeeks = [
      ...weeks,
      {...data, noMeeting}
    ];

    localStorage.setItem(localStorageWeeksKey, JSON.stringify(newWeeks));
    
    setLoading(false);
    setWeeks(newWeeks);
  };

  const onDeleteWeek = (i: number) => () => {
    const _weeks = [...weeks];
    _weeks.splice(i, 1);

    localStorage.setItem(localStorageWeeksKey, JSON.stringify(_weeks));
    setWeeks(_weeks);
  };

  
  const $wrapper = useRef<any>(null);

  const downloadAsPDF = async (e: any) => {
    const $node = $wrapper.current;
    const options = {
      overrideWidth: 1000,
      filename: 'Escala de Meio de Semana PDF'
    };

    $node.classList.add(S.toPrint);

    domToPdf($node, options, (pdf: any) => {
      $node.classList.remove(S.toPrint);
    })
  };

  const downloadAsPNG = async (e: any) => {
    const $node = $wrapper.current;
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

  const downloadAsTXT = () => {
    const $endNode = document.createElement('div');
    $endNode.innerHTML = '$end';

    const programationWrappers = Array.from($wrapper.current.childNodes);
    const allMainElements = programationWrappers
      .map((node: any) => [...Array.from(node.childNodes), $endNode])
      .flat(2);
    const arrayOfTexts = allMainElements
      .map((node: any) => node.innerText)
      .map(text => text.split('\n'))
      .map(([label, ...rest]) => {
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

  const onWriteWeekData = (i: number) => (changedWeekData: any) => {
    const _weeks = [...weeks];
    _weeks.splice(i, 1, changedWeekData);

    localStorage.setItem(localStorageWeeksKey, JSON.stringify(_weeks));
  };

  const importBackup = async (e: any) => {
    const file = await e.currentTarget.files[0].text();
    const backup = JSON.parse(file);

    if (Array.isArray(backup)) {
      const fromLS = JSON.parse(localStorage.getItem(localStorageWeeksKey) || '[]');
      const weeks = [...fromLS, ...backup];
      localStorage.setItem(localStorageWeeksKey, JSON.stringify(weeks));

      setWeeks(weeks);
    }
  };

  return (
    <div className={S.appWrapper}>
      <Header/>

      <Sidebar>
        <Route
          path='/'
          element={
            <WeeksManager
              weeks={weeks}
              addWeek={onAddWeek}
              setWeeks={setWeeks}
              loading={loading}
              removeWeek={onDeleteWeek}
              maxDate={maxDate}
            />
          }
        />
      </Sidebar>
      
      <div data-id='programations-wrapper' className={S.mainContent}>
        <h2 className='sr-only'>Programação das reuniões</h2>

        <div className={S.programationWrapper} ref={$wrapper}>
          {weeks.map((data: any, i: number) => {
            return (
              <Programation
                key={data.date}
                index={i}
                data={data}
                className={classNames({bordered: i % 2 !== 0})}
                onWriteData={onWriteWeekData(i)}
              />
            )
          })}
        </div>

        <div className={S.buttonsArea}>
          {
            Boolean(weeks.length) && (
              <>
                <div className={S.area}>
                  <h4>Área de Download</h4>
                  <button className={classNames(S.saveAs, S.pdf)} onClick={downloadAsPDF}>
                    Salvar como PDF
                  </button>

                  <button className={classNames(S.saveAs, S.png)} onClick={downloadAsPNG}>
                    Salvar como PNG
                  </button>
                  
                  <button className={classNames(S.saveAs, S.text)} onClick={downloadAsTXT}>
                    Salvar como TXT
                  </button>
                </div>

                <div className={S.area}>
                  <h4>Área de Designações</h4>

                  <button className={classNames(S.saveAs, S.designation)} onClick={() => setDesignationsState(!designationsState)}>
                    Ver Designações
                  </button>
                </div>
              
                <div className={S.area}>
                  <h4>Área de Backup</h4>
                  <button
                    className={classNames(S.saveAs, S.backup)}
                    onClick={() => downloadText('Backup Reunião de Meio de Semana.backup', localStorage.getItem(localStorageWeeksKey) || '[]')}
                  >
                    Baixar Backup
                  </button>

                  <label htmlFor="import-backup" className={S.backup}>Importar Backup</label>
                  <input type="file" accept='.backup' name="photo" id="import-backup" onChange={importBackup}/>
                </div>
              </>
            )
          }

          {
            !Boolean(weeks.length) && (
              <div className={S.area}>
                <h4>Área de Backup</h4>

                <label htmlFor="import-backup" className={S.backup}>Importar Backup</label>
                <input type="file"accept='.backup' name="photo" id="import-backup" onChange={importBackup}/>
              </div>
          )}
        </div>
        
        <Desgination state={designationsState} toggleState={setDesignationsState}/>
      </div>
    </div>
  )
}

export default App;
