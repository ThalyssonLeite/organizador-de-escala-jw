/* eslint-disable react-hooks/rules-of-hooks */
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Programation from '../components/Programation/Programation';
import S from './index.module.scss';

import { IDataProgramationLink } from './api/programation-data';
import WeeksManager from '../components/WeeksManager/WeeksManager';
import axios from 'axios';

export function getStaticProps () {
  axios.get('');

  return {
    props: {}
  }
};

async function crawlDataFromJW(date: Date) {
  const resData = await fetch(`api/programation-data?date=${date}`);
  const dataProgamation: IDataProgramationLink = await resData.json();

  console.log(dataProgamation);

  return dataProgamation;
};

const Home: NextPage = () => {
  const localStorageKey = 'weeks';

  const [weeks, setWeeks] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const weeksStored = JSON.parse(localStorage.getItem(localStorageKey) || '[]');

    if (!weeksStored.length) return;

    setWeeks(weeksStored);
  }, []);

  const onSelectDate = async (date: Date) => {
    setLoading(true);

    const data = await crawlDataFromJW(date);
    setLoading(false);

    const newWeeks = [
      ...weeks,
      {programation: data, date}
    ];


    localStorage.setItem(localStorageKey, JSON.stringify(newWeeks));
    setWeeks(newWeeks);
  };

  const onDeleteWeek = (i: number) => () => {
    const _weeks = [...weeks];
    _weeks.splice(i, 1);
    setWeeks(_weeks);
  };

  return (
    <div className={S.appWrapper}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <WeeksManager
        weeks={weeks}
        setWeek={onSelectDate}
        loading={loading}
        removeWeek={onDeleteWeek}
      />

      <div className={S.programationWrapper}>
        {weeks.map((data: any, i: number) => {
          return (
          <Programation
            key={data.date}
            index={i}
            data={data.programation}
          />)
        })}
      </div>
    </div>
  )
}

export default Home;
