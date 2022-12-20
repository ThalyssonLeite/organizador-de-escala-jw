import classNames from 'classnames';
import React, { useRef } from 'react';
import S from './Submenu.module.scss';
import {
  downloadScaleAsPDF,
  downloadScaleAsPNG,
  downloadScalesAsText,
  importBackup,
  saveBackupHandler
} from './handlers';

interface IProps {
  submenu: string;
  active: boolean;
  weeks?: any[];
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

  if (props.submenu === 'backup' && importInput.current) {
    onClickHandler = (option: string) => option === 'Salvar'
      ? saveBackupHandler
      : importInput.current.click.bind(importInput.current);
  } else {
    onClickHandler = (option: string) => option.includes('.pdf')
      ? downloadScaleAsPDF
      : option.includes('.txt')
        ? downloadScalesAsText
        : downloadScaleAsPNG;
  };

  return (
    <div className={classNames(S.submenu, {[S.isVisible]: props.active})}>
      {submenuOptions[props.submenu].map(option => {
        return (
          <button
            tabIndex={0}
            key={option.name}
            className={S.submenuItem}
            onFocus={(e) => {e.stopPropagation()}}
            onClick={onClickHandler(option.name)}
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