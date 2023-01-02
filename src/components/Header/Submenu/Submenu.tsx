import classNames from 'classnames';
import React, { useRef } from 'react';
import S from './Submenu.module.scss';
import {
  downloadAsPDF,
  downloadAsPNG,
  downloadScalesAsText,
  downloadDesignationsAsText,
  importBackup,
  saveBackupHandler
} from './handlers';

interface IProps {
  path: string;
  weeks?: any[];
  active: boolean;
  submenu: string;
  setWeeks: (weeks: any[]) => void;
}

function Submenu (props: IProps) {
  const importInput = useRef(null);
  const submenuOptions = {
    download: [
      { name: 'como PDF (.pdf)' },
      { name: 'como Imagem (.png)' },
      { name: 'como Texto (.txt)' }
    ],
    backup: [
      { name: 'Salvar' },
      { name: 'Recuperar' },
    ]
  };

  if (props.weeks && props.weeks.length < 1) {
    submenuOptions.backup.shift();
  };

  let onClickHandler: any = (option: string) => {};

  //SCALES
  if (props.path === '/') {
    if (props.submenu === 'backup' && importInput.current) {
      onClickHandler = (option: string) => option === 'Salvar'
        ? saveBackupHandler
        : importInput.current.click.bind(importInput.current);
    } else {
      onClickHandler = (option: string) => option.includes('.pdf')
        ? downloadAsPDF
        : option.includes('.txt')
          ? downloadScalesAsText
          : downloadAsPNG;
    };
  //DESIGNATION
  } else {
    onClickHandler = (option: string) => option.includes('.pdf')
    ? downloadAsPDF
    : option.includes('.txt')
      ? downloadDesignationsAsText
      : downloadAsPNG;
  }

  return (
    <div className={classNames(S.submenu, {[S.isVisible]: props.active})}>
      {submenuOptions[props.submenu].map(option => {
        return (
          <button
            tabIndex={0}
            key={option.name}
            className={S.submenuItem}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              (e.target as any).focus();
              (e.target as any).blur();
              onClickHandler(option.name)();
            }}
            onFocus={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {option.name}
          </button>
      )})}

      <input
        type="file"
        accept='.backup'
        ref={importInput}
        id="import-backup"
        onInput={importBackup}
        style={{
          opacity: 0,
          pointerEvents: 'none',
          visibility: 'hidden'
        }}
      />
      
    </div>
  );
};

export default Submenu;