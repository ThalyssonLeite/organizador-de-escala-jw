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
      <header className={S.header} onClick={(e) => {if ((e.target as any).closest('.'+S.menuButton)) return; setBackupState(false); setDownloadState(false)}}>
        <img className={S.logo} src='/static/icons/logo.svg'/>

        <div className={S.headerWrapper}>
          <h1 className={S.title} tabIndex={0}>Organizador de Escalas JW</h1>
          <nav className={S.menu}>
            <div className={classNames(S.menuButton, {[S.isActive]: location.pathname === '/'})} tabIndex={0}>Escalas</div>
            <div className={S.menuButton} tabIndex={0}>Designações</div>
            <div className={S.menuDivisor}/>
              <Routes>
                <Route
                  path={'/'}
                  element={
                    <>
                      { Boolean(props.weeks && props.weeks.length) &&
                        <div
                          tabIndex={0}
                          className={
                            classNames(
                              S.menuButton,
                              {[S.isSubmenuActive]: downloadState}
                          )}
                          onFocus={(e) => {
                            e.stopPropagation();
                            setDownloadState(!downloadState);
                            setBackupState(false)
                          }}
                        >
                          Baixar
                          <i className="arrow-icon"/>

                          <Submenu submenu="download" active={downloadState} setWeeks={props.setWeeks}/>
                        </div>
                      }
                      <div
                        tabIndex={0}
                        className={classNames(
                          S.menuButton,
                          {[S.isSubmenuActive]: backupState}
                        )}
                        onFocus={(e) => {
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