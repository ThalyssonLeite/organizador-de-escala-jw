import React from 'react';
import { useEffect, useRef, useState } from 'react';
import Programation from './components/Programation/Programation';
import S from './App.module.scss';

import {WeeksManager} from './components/WeeksManager/WeeksManager';
import classNames from 'classnames';
import Desgination from './components/Designations/Designation';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Route } from 'react-router-dom';

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

const App: React.FunctionComponent = (props: any) => {
  const localStorageWeeksKey = 'weeks';

  const [weeks, setWeeks] = useState<any>(getWeeksFromLocalStorage());
  const [loading, setLoading] = useState(false);
  const [maxDate, setMaxDate] = useState<Date | undefined>(undefined);
  const [designationsState, setDesignationsState] = useState<boolean>(false);

  (window as any).setWeeks = setWeeks;

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

  const onWriteWeekData = (i: number) => (changedWeekData: any) => {
    const _weeks = [...weeks];
    _weeks.splice(i, 1, changedWeekData);

    localStorage.setItem(localStorageWeeksKey, JSON.stringify(_weeks));
  };

  return (
    <div className={S.appWrapper}>
      <Header weeks={weeks} setWeeks={setWeeks}/>

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
      
      <div data-id='main-content' className={S.mainContent}>
        <h2 className='sr-only'>Programação das reuniões</h2>

        <div data-id='programation-wrapper' className={S.programationWrapper} ref={$wrapper}>
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
                  <h4>Área de Designações</h4>

                  <button className={classNames(S.saveAs, S.designation)} onClick={() => setDesignationsState(!designationsState)}>
                    Ver Designações
                  </button>
                </div>
              </>
            )
          }
        </div>
        
        <Desgination state={designationsState} toggleState={setDesignationsState}/>
      </div>
    </div>
  )
}

export default App;
