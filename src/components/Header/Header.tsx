import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import S from './Header.module.scss';

function Header () {
  return (
    <>
      <header className={S.header}>
        <img className={S.logo} src='/static/icons/logo.svg'/>

        <div className={S.headerWrapper}>
          <h1 className={S.title}>Organizador de Escalas JW</h1>
          <nav className={S.menu}>
            <div className={S.menuButton}>Meio de Semana</div>
            <div className={S.menuButton}>Designações</div>
            <div className={S.menuDivisor}/>
            <BrowserRouter>
              <Routes>
                <Route
                  path={'/'}
                  element={
                    <>
                      <div className={S.menuButton}>Baixar</div>
                      <div className={S.menuButton}>Backup</div>
                    </>
                  }
                />
                <Route
                  path={'/designation'}
                  element={
                    <>
                      <div className={S.menuButton}>Baixar</div>
                    </>
                  }
                />
              </Routes>
            </BrowserRouter>
          </nav>
        </div>
      </header>
    </>
  )
};

export {Header}