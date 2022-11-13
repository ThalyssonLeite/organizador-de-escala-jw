/* eslint-disable react-hooks/rules-of-hooks */
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import Programation from '../components/Programation/Programation';
import S from './index.module.scss';

import WeeksManager from '../components/WeeksManager/WeeksManager';
import axios from 'axios';
const domToPdf = require('dom-to-pdf');
import classNames from 'classnames';
import Desgination from '../components/Designations/Designation';

async function crawlDataFromJW(date: Date) {
  const resData = await fetch(`api/programation-data?date=${date}`);
  const dataProgamation: any = await resData.json();

  return dataProgamation;
};

async function getMaxDateForWorkBooks(callback: (date: Date) => void) {
  const res = await fetch('api/find-final-date');
  const maxWorkbookDate = await res.text();

  const data = {
    lastUpdate: new Date().toISOString(),
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

const Home: NextPage = (props: any) => {
  const localStorageWeeksKey = 'weeks';

  const [weeks, setWeeks] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [maxDate, setMaxDate] = useState<Date | undefined>(undefined);
  const [designationsState, setDesignationsState] = useState<boolean>(false);

  useEffect(() => {
    const weeksStored = JSON.parse(localStorage.getItem(localStorageWeeksKey) || '[]');

    if (!weeksStored.length) return;

    setWeeks(weeksStored);
  }, []);

  useEffect(() => {
    const maxDateLastUpdateFromLS = JSON.parse(localStorage.getItem('maxDateLastUpdate') || '{}');
    const lastMaxDateUpdate = new Date(maxDateLastUpdateFromLS.lastUpdate || new Date);
    const differenceInDays = (+new Date() - +lastMaxDateUpdate) / (1000 * 60 * 60 * 24);
  
    if (differenceInDays && differenceInDays < 1) {
      setMaxDate(new Date(maxDateLastUpdateFromLS.maxWorkbookDate));
      
      return;
    };
    //What the above does: Do not do that expensive task if you already did it today;

    getMaxDateForWorkBooks(setMaxDate);
  }, []);

  const onSelectDate = async (date: Date) => {
    setLoading(true);

    const data = await crawlDataFromJW(date);
    setLoading(false);

    const newWeeks = [
      ...weeks,
      data
    ];

    localStorage.setItem(localStorageWeeksKey, JSON.stringify(newWeeks));
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
    const width = 595.28;
    const height = 841.89;
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

  const downloadAsTXT = () => {
    const $endNode = document.createElement('div');
    $endNode.innerHTML = '$end';

    const programationWrappers = Array.from($wrapper.current.childNodes);
    const allMainElements = programationWrappers.
      map((node: any) => [...Array.from(node.childNodes), $endNode])
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

  const onWriteData = (i: number) => (changedWeekData: any) => {
    const _weeks = [...weeks];
    _weeks.splice(i, 1, changedWeekData);

    localStorage.setItem(localStorageWeeksKey, JSON.stringify(_weeks));
  };

  const importBackup = async (e: any) => {
    const file = await e.currentTarget.files[0].text();
    const backup = JSON.parse(file);
    console.log(backup)

    if (Array.isArray(backup)) {
      const fromLS = JSON.parse(localStorage.getItem(localStorageWeeksKey) || '[]');
      const weeks = [...fromLS, ...backup];
      localStorage.setItem(localStorageWeeksKey, JSON.stringify(weeks));

      console.log(weeks)
      setWeeks(weeks);
    }
  };

  return (
    <div className={S.appWrapper}>
      <Head>
        <title>Programador de Escala</title>
        <meta name="description" content="Ajuda você a fazer a escala de designações da reunião de meio de semana"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <WeeksManager
        weeks={weeks}
        setWeek={onSelectDate}
        loading={loading}
        removeWeek={onDeleteWeek}
        maxDate={maxDate}
      />

      <h2 className='sr-only'>Programação das reuniões</h2>

      <div className={S.programationWrapper} ref={$wrapper}>
        {weeks.map((data: any, i: number) => {
          return (
            <Programation
              key={data.date}
              index={i}
              data={data}
              className={classNames({bordered: i % 2 !== 0})}
              onWriteData={onWriteData(i)}
            />
          )
        })}
      </div>

      {
        Boolean(weeks.length) && (
          <>
            <div className={S.area}>
              <h4>Área de Download</h4>
              <button className={classNames(S.saveAs, S.pdf)} onClick={downloadAsPDF}>
                Salvar como PDF
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
      
      <Desgination state={designationsState} toggleState={setDesignationsState}/>
    </div>
  )
}

export default Home;
