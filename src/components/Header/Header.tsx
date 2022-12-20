import classNames from "classnames";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import S from './Header.module.scss';
import Submenu from "./Submenu/Submenu";

interface IProps {
  weeks: any[];
  setWeeks: (weeks: any[]) => void;
}

function Header (props: IProps) {
  const location = useLocation();
  const [downloadState, setDownloadState] = useState(false);
  const [backupState, setBackupState] = useState(false);

  return (
    <>
      <header className={S.header} onClick={() => {setBackupState(false); setDownloadState(false)}}>
        <img className={S.logo} src='/static/icons/logo.svg'/>

        <div className={S.headerWrapper}>
          <h1 className={S.title}>Organizador de Escalas JW</h1>
          <nav className={S.menu}>
            <div className={classNames(S.menuButton, {[S.isActive]: location.pathname === '/'})}>Escalas</div>
            <div className={S.menuButton}>Designações</div>
            <div className={S.menuDivisor}/>
              <Routes>
                <Route
                  path={'/'}
                  element={
                    <>
                      { Boolean(props.weeks && props.weeks.length) &&
                        <div
                          className={
                            classNames(
                              S.menuButton,
                              {[S.isSubmenuActive]: downloadState}
                          )}
                          onClick={(e) => {
                            e.stopPropagation();
                            setDownloadState(!downloadState); setBackupState(false)}
                          }
                        >
                          Baixar
                          <i className="arrow-icon"/>

                          <Submenu submenu="download" active={downloadState} setWeeks={props.setWeeks}/>
                        </div>
                      }
                      <div
                        className={classNames(
                          S.menuButton,
                          {[S.isSubmenuActive]: backupState}
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          setBackupState(!backupState);
                          setDownloadState(false);
                        }}
                      >
                        Backup
                        <i className="arrow-icon"/>

                        <Submenu
                          submenu="backup"
                          active={backupState}
                          weeks={props.weeks}
                          setWeeks={props.setWeeks}
                        />
                      </div>
                    </>
                  }
                />
              </Routes>
          </nav>
        </div>
      </header>
    </>
  )
};

export {Header}