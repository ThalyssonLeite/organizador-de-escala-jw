import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Programation from '../components/Programation/Programation';

import { IDataProgramationLink } from './api/programation-data';

async function crawlDataFromJW(date: Date) {
  const resData = await fetch(`api/programation-data?date=${date}`);
  const dataProgamation: IDataProgramationLink = await resData.json();

  console.log(dataProgamation);

  return dataProgamation;
};

const Home: NextPage = () => {
  const selectedDate = new Date();
  const [data, useData] = useState<any>(null);

  // useEffect(() => {
  //   crawlDataFromJW(selectedDate).then(d => useData(d));
  // }, []);

  const selectDate = async (e: any) => {
    console.log(e.nativeEvent)

    const data = await crawlDataFromJW(e.currentTarget.valueAsDate);
    useData(data);
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <input type="date" onChange={selectDate}/>

      <Programation data={data}/>
    </div>
  )
}

export default Home;
