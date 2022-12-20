import S from './Sidebar.module.scss';
import React from "react";
import { BrowserRouter, Routes } from 'react-router-dom';

interface IProps {
  children: JSX.Element | JSX.Element[]
}

function Sidebar (props: IProps) {
  return (
    <div className={S.sidebar}>
      <Routes>
        {props.children}
      </Routes>
    </div>
  )
};

export { Sidebar };