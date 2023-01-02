import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
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

  useEffect(() => {
    document.body.addEventListener('click', (e) => {
      if ((e.target as any).closest('.'+S.menuButton)) return;
      setBackupState(false);
      setDownloadState(false);
    });
  }, []);

  const optionsPrefix = location.pathname === '/' ? 'escalas' : 'designações';

  return (
    <>
      <header className={S.header}>
        <img className={S.logo} src='/static/icons/logo.png'/>

        <div className={S.headerWrapper}>
          <h1 className={S.title}>Organizador de Escalas JW</h1>
          <nav className={S.menu}>
            <Link
              to='/'
              className={classNames(S.menuButton, {[S.isActive]: location.pathname === '/'})}
              tabIndex={0}
              onClick={(e) => {
                e.currentTarget.focus();
                setDownloadState(false);
                setBackupState(false);
              }}
            >
              Escalas
            </Link>
            <Link
              to='/designations'
              className={classNames(S.menuButton, {[S.isActive]: location.pathname === '/designations'})}
              tabIndex={0}
              onClick={(e) => {
                e.currentTarget.focus();
                setDownloadState(false);
                setBackupState(false);
              }}
            >
              Designações
            </Link>
            <div className={S.menuDivisor}/>
              { Boolean(props.weeks && props.weeks.length) &&
                <div
                  tabIndex={0}
                  className={
                    classNames(
                      S.menuButton,
                      {[S.isSubmenuActive]: downloadState}
                  )}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDownloadState(!downloadState);
                    setBackupState(false)
                  }}
                  onFocus={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDownloadState(!downloadState);
                    setBackupState(false)
                  }}
                >
                  Baixar {optionsPrefix}
                  <i className="arrow-icon"/>

                  <Submenu
                    submenu="download"
                    active={downloadState}
                    setWeeks={props.setWeeks}
                    path={location.pathname}
                  />
                </div>
              }
              {location.pathname !== '/designations' && (
                <div
                tabIndex={0}
                className={classNames(
                  S.menuButton,
                  {[S.isSubmenuActive]: backupState}
                )}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setBackupState(!backupState);
                  setDownloadState(false);
                }}
                onFocus={(e) => {
                  e.preventDefault();
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
                  path={location.pathname}
                />
              </div>
            )}
          </nav>
        </div>
      </header>
    </>
  )
};

export {Header}