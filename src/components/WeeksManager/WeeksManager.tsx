import S from './WeeksManager.module.scss';
import DatePicker from "react-datepicker";
import ptBR from 'date-fns/locale/pt-BR';
import Switch from "react-switch";

const smoothScroll = require('scroll-smooth');
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import ManageButtonGroup from './ManageButtonGroup/ManageButtonGroup';
import DragDropSort from '../../libs/drag-drop-sort';

interface IProps {
  weeks: any[];
  addWeek: (week: any, noMeeting: false | string) => any;
  setWeeks: (weeks: any) => any;
  loading: boolean;
  removeWeek: (index: number) => any;
  maxDate?: Date;
}

type TWeekState = 'add' | 'organize' | 'delete' | null;

function WeeksManager(props: IProps) {
  const [weekState, setWeekState] = useState<TWeekState>(props.weeks.length < 1
    ? null
    : 'add'
  );

  useEffect(() => {
    if (props.weeks.length < 1) setWeekState('add');
    else setWeekState(null);
  }, [props.weeks]);

  //SWITCH - NO MEETING REASON
  const [switchState, setSwitchState] = useState(false);
  const noMeetingInput = useRef(null);
  const switchStyle = {
    tabIndex: 0,
    height: 20,
    width: 40,
    onColor: '#5b3c88',
    offColor: '#6d6d6d',
    checkedIcon: false,
    uncheckedIcon: false,
    activeBoxShadow: 'transparent',
  }

  useEffect(() => {
    if (weekState === 'add') setSwitchState(false);
  }, [weekState]);
  //

  //SWITCH - ROOMS
  const [roomState, setRoomState] = useState({b: false, c: false});

  function handleRoomState () {

  };

  const onSelectDate = (date: Date): void => {
    const noMeeting = switchState && (noMeetingInput.current.value ? noMeetingInput.current.value : 'Não haverá reunião');
    props.addWeek(date, noMeeting);
    setSwitchState(false);

    //makes selected on the calendar the last date chosen
    localStorage.setItem('lastChosenDate', date.toISOString());
  };

  useEffect(() => {
    //if you just finished to load a new week...
    if (!props.loading && weekState === 'add') {
      setWeekState(null);
      setTimeout(() => {
        const weeksContainer = containerOfWeeks.current;
        const newWeekJustCreated = weeksContainer.children[weeksContainer.childElementCount - 1];
        if (newWeekJustCreated) newWeekJustCreated.click();
      }, 100);
    }
  }, [props.loading]);

  const goToWeek = (event: any) => {
    const $target = event.currentTarget;
    const weekId = $target.getAttribute('data-id');
    const week: any = document.querySelector(`*[id="${weekId}"]`);

    const weekOffsetTop = week?.offsetTop || 0;

    const $programationsWrapper: any = document.querySelector('*[data-id="main-content"]');
    const littlePaddingForBetterView = 20;
    const minOffsetTop = 111;
    const isFirstElement = !Boolean(week.previousElementSibling) && (weekOffsetTop === minOffsetTop);
    
    const indexIsOdd = Array.from(week.parentElement.childNodes).findIndex(child => child === week) % 2 !== 0;
    
    if (isFirstElement) {
      smoothScroll.to(0, {
        context: $programationsWrapper,
      });
    } else if (indexIsOdd) {
      smoothScroll.to(weekOffsetTop - littlePaddingForBetterView - 71, {
        context: $programationsWrapper,
      });
    } else {
      smoothScroll.to(weekOffsetTop - 71, {
        context: $programationsWrapper,
      });
    }
  }

  //DRAG AND DROP
  const containerOfWeeks = useRef(null);

  function bootstrapDragAndDrop () {
    const dragDropSort = new DragDropSort;
    dragDropSort.bootstrap({
      callBackFn: handleDragAndDrop,
      containerElement: containerOfWeeks.current
    });
  };

  function handleDragAndDrop ({order, moved}) {
    const newWeeksOrder = order
      .map(id => {
        return props.weeks.find(week => week.id === id);
      });

    props.setWeeks(newWeeksOrder);

    //MOVE TO WEEK WHEN FINISH DRAG
    setTimeout(() => {
      const movedWeek: any = document.querySelector(`*[drag-id="${moved}"]`);
      const previousOnClickFn = movedWeek.onclick;
      movedWeek.onclick = goToWeek;
      movedWeek.click();

      setTimeout(() => {
        movedWeek.onclick = previousOnClickFn;
      }, 500);
    }, 150);
  };

  //DELETE MODE
  const tempWeeksTrash = useRef(new Set);
  const [trashButton, setTrashButton] = useState(false);
  const [deletionWarning, setDeletionWarning] = useState(false);

  function handleOnSelectWeekOnDeleteMode (event) {
    const $weeksGroup = document.querySelector<any>('.'+S.weeksGroup);

    const minHeight = $weeksGroup.scrollHeight;
    $weeksGroup.style.minHeight = minHeight + 'px';

    const $week = event.currentTarget
    const weekId = $week.getAttribute('data-id');
    const isOnTempTrash = tempWeeksTrash.current.has(weekId);
    const classListMethod = isOnTempTrash ? 'remove' : 'add';
    const tempTrashMethod = isOnTempTrash ? 'delete' : 'add';
    
    $week.classList[classListMethod](S.isMarkedToDelete);
    tempWeeksTrash.current[tempTrashMethod](weekId);

    setTrashButton(Boolean(tempWeeksTrash.current.size));
    setDeletionWarning(false);
  };

  function cancelDeletion () {
    tempWeeksTrash.current.clear();
    const markedToTrashWeeks = Array
      .from(document.querySelectorAll('.'+S.isMarkedToDelete));

    markedToTrashWeeks
      .forEach($week => $week.classList.remove(S.isMarkedToDelete));

    setWeekState(null);
    setTrashButton(false);

    const $weeksGroup = document.querySelector<any>('.'+S.weeksGroup);
    $weeksGroup.removeAttribute('style');
  };

  function applyDeletion () {
    const weeksLeft = props.weeks
    .filter(week => !tempWeeksTrash.current.has(week.id));
    const newWeeks = weeksLeft.length ? weeksLeft : [];
    
    tempWeeksTrash.current.clear();
    props.setWeeks(newWeeks);
    localStorage.setItem('weeks', JSON.stringify(newWeeks))
    
    setWeekState(weeksLeft.length ? null : 'add');

    const $weeksGroup = document.querySelector<any>('.'+S.weeksGroup);
    $weeksGroup.removeAttribute('style');
    setTrashButton(Boolean(tempWeeksTrash.current.size));
  };

  useEffect(() => {
    const allInTrash = Array.from(document.querySelectorAll(`.${S.week}.${S.isMarkedToDelete}`));

    if (deletionWarning) {
      allInTrash.forEach(node => node.animate([
        {width: '37px', whiteSpace: 'nowrap'},
      ], {duration: 200, easing: 'ease', fill: 'forwards'}));
    } else {
      allInTrash.forEach(node => {
        node.animate([
          {width: '100%'},
        ], {duration: 200, easing: 'ease', fill: 'forwards'});
        node.animate([
          {whiteSpace: 'unset'},
        ], {duration: 200, easing: 'ease', delay: 200, fill: 'forwards'});
      })
    };
  }, [deletionWarning]);

  return (
    <>
      <h2 className='sr-only'>Gerenciador de Semanas</h2>
      
      <div className={S.weeksManager}>

        <div
          className={classNames(S.weeksGroup, {[S.isDeletionWarning]: deletionWarning})}
          drag-type='container'
          ref={containerOfWeeks}
          onMouseEnter={bootstrapDragAndDrop}
        >
          {props.weeks.map((data, i) => {
            return (
              <div
                data-id={data.id}
                tabIndex={0}
                key={data.id}
                className={classNames(S.week, {[S.isAddMode]: weekState === 'add'}, {[S.isNoMeeting]: Boolean(data.noMeeting)})}
                onClick={
                  !weekState
                    ? goToWeek
                    : weekState === 'delete'
                      ? handleOnSelectWeekOnDeleteMode
                      : () => {}
                  }
                drag-type='item'
                drag-name='week'
                drag-id={data.id}
              >
                {!(deletionWarning && tempWeeksTrash.current.has(data.id)) && data.week[0].title}

                {
                  weekState === 'organize' &&
                  (<button tabIndex={0} className="drag-icon" drag-type='key'>
                    <span className='sr-only'>Excluir Semana {data.week[0].title}</span>
                  </button>)
                }

                {
                  (deletionWarning && tempWeeksTrash.current.has(data.id)) &&
                  (<button tabIndex={0} className="trash-icon" drag-type='key'>
                    <span className='sr-only'>Excluir Semana {data.week[0].title}</span>
                  </button>)
                }
              </div>
              )
          })}

          {
            (weekState === 'add' || props.loading || !props.weeks.length) &&
            (
              <div
                tabIndex={0}
                className={classNames(S.week, S.isAddMode)}
              >
                <div className={classNames("loading-icon", S.loadingIcon)} tabIndex={0} drag-type='key'>
                  <span className='sr-only'>Carregando nova semana</span>
                </div>
              </div>
            )
          }
        </div>

        <ManageButtonGroup
          weeks={props.weeks}
          weekState={weekState}
          setWeekState={setWeekState}
          trashButtonState={trashButton}
          cancelDeletion={cancelDeletion}
          applyDeletion={applyDeletion}
          toggleDeletionWarning={setDeletionWarning}
          loading={props.loading}
        />

        <div className={classNames(S.tutorialOverlay, {[S.appear]: weekState || props.loading || !props.weeks.length})}>
          { ((weekState === 'add' || !props.weeks.length) && !props.loading) &&
            <div className={S.tutorialOverlayContent}>
              <h2 tabIndex={0}>Escolha uma semana</h2>

              <div className={S.datePicker}>
                <DatePicker
                  onChange={onSelectDate}
                  locale={ptBR}
                  minDate={new Date('01/01/2016')}
                  maxDate={props.maxDate || undefined}
                  selected={localStorage.getItem('lastChosenDate') ? new Date(localStorage.getItem('lastChosenDate') || new Date) : new Date()}
                  inline
                />
              </div>

              <div style={{display: 'flex', width: '100%'}}>
                <label className={S.switcher}>
                  <Switch
                    {...switchStyle}
                    checked={switchState}
                    onChange={() => setSwitchState(!switchState)}
                  />
                  <span style={{color: switchState ? 'var(--color-purple)' : 'var(--color-grey)'}}>Sala B</span>
                </label>
                <label className={S.switcher}>
                  <Switch
                    {...switchStyle}
                    checked={switchState}
                    onChange={() => setSwitchState(!switchState)}
                  />
                  <span style={{color: switchState ? 'var(--color-purple)' : 'var(--color-grey)'}}>Sala C</span>
                </label>
              </div>

              <label className={S.switcher}>
                <Switch
                  {...switchStyle}
                  checked={switchState}
                  onChange={() => setSwitchState(!switchState)}
                />
                <span style={{color: switchState ? 'var(--color-purple)' : 'var(--color-grey)'}}>Não haverá reunião</span>
              </label>

             <label className={classNames(S.noMeetingWrapper, {[S.isVisible]: switchState})}>
              <input ref={noMeetingInput} className={S.noMeeting} placeholder='Escreva o motivo. Ex: Assembleia' spellCheck={false}/>
              <span className='sr-only'>Diga o motivo</span>
             </label>
            </div>
          }

           { props.loading &&
            <div className={S.tutorialOverlayContent}>
              <h2 tabIndex={0}>Carregando sua semana</h2>

              <div
                tabIndex={0}
                className={classNames(S.bigLoadingIcon, "loading-fill-icon")}
              >
                <span className='sr-only'>Carrengando semana</span>
              </div>
            </div>
          }

          { weekState === 'organize' &&
            <div className={S.tutorialOverlayContent}>
              <h2 tabIndex={0}>Arraste para organizar</h2>
            </div>
          }

          { weekState === 'delete' &&
            <div className={S.tutorialOverlayContent}>
              <h2 tabIndex={0}>Selecione para excluir</h2>
            </div>
          }
        </div>
      </div>
    </>
  );
}

export { WeeksManager };
