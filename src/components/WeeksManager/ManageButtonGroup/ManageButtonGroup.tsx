import classNames from 'classnames';
import { Props } from 'next/script';
import { useRef } from 'react';
import S from './ManageButtonGroup.module.scss'

interface IProps {
  weeks: any;
  weekState: 'add' | 'organize' | 'delete' | null;
  setWeekState: (state: IProps["weekState"]) => void;
  trashButtonState: boolean;
  cancelDeletion: () => void;
  applyDeletion: () => void;
  toggleDeletionWarning: (toggle: boolean) => void;
  loading: boolean;
}

function ManageButtonGroup (props: IProps) {
  const {weeks, weekState, setWeekState, trashButtonState} = props;

  const manageButtonGroup = useRef(null);

  const returnButton = (cancelChanges?: () => void) => (
    <button className={classNames(S.manageButton ,{[S.isDisabled]: (weekState === 'add' && !props.weeks.length) || props.loading})} title="Voltar" onClick={cancelChanges || (() => setWeekState(null))}>
      <i className={classNames(S.manageButtonIcon, 'return-icon')}/>
    </button>
  );

  const addButton = (
    <button className={S.manageButton} onClick={() => setWeekState('add')} title='Adicionar'>
      <i className={classNames(S.manageButtonIcon, 'plus-icon')}/>
    </button>
  );

  const organizeButton = (title?: string) => (
    <div className={classNames(S.manageButton, {[S.isDisabled]: weeks.length <= 1})} title={title || 'Mudar ordem'} onClick={() => setWeekState('organize')}>
        <i className={classNames(S.manageButtonIcon, 'drag-icon')}/>
    </div>
  );

  const deleteButton = (title?: string, applyChanges?: () => void) => (
    <button
      className={classNames(
        S.manageButton,
        {[trashButtonState ? S.deleteButton : S.isDisabled]: weekState === 'delete'}
      )}
      title={title || 'Excluir'}
      onClick={applyChanges || (() => setWeekState('delete'))}
      onMouseEnter={
        weekState === 'delete'
          ? () => props.toggleDeletionWarning(true)
          : undefined
      }
      onMouseLeave={
        weekState === 'delete'
          ? () => props.toggleDeletionWarning(false)
          : undefined
      }
    >
      <i className={classNames(S.manageButtonIcon, 'trash-icon')}/>
    </button>
  );

  return (
    <>
      <div ref={manageButtonGroup} className={S.manageButtonsGroup}>
      {
          (weekState === null && Boolean(props.weeks.length)) && 
          (<>
            {addButton} {organizeButton()} {deleteButton()}
          </>)
        }
        
        {
          (weekState === 'add' || !props.weeks.length) && 
          returnButton()
        }

        {
          weekState === 'organize' && 
          (<>
            {returnButton()}
          </>)
        }

        {
          weekState === 'delete' && 
          (<>
            {returnButton(props.cancelDeletion)} {deleteButton('Confirmar exclusões', props.applyDeletion)}
          </>)
        }
      </div>
    </>
  );
};

export default ManageButtonGroup;