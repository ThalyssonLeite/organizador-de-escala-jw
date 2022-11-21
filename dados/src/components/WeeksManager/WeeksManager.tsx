import S from './WeeksManager.module.scss';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from 'react';

interface IProps {
  weeks: any[];
  setWeek: (week: any) => any;
  loading: boolean;
  removeWeek: (index: number) => any;
  maxDate?: Date;
}

function WeeksManager(props: IProps) {
  const [startDate, setStartDate] = useState(new Date());
  const [addWeekState, setAddWeekState] = useState(false);

  const handleAddWeek = (): void => {
    setAddWeekState(!addWeekState);
  };

  const onSelectDate = (date: Date): void => {
    props.setWeek(date);
    localStorage.setItem('lastChosenDate', date.toISOString());
    setAddWeekState(false);
  };

  return (
    <div className={S.weeksManager}>
      <h2 className='sr-only'>Gerenciador de Semanas</h2>

      {props.loading
        ? <i className='loading-gear-icon'></i>
        : <>
            {props.weeks.map((data, i) => {
              return (
                <div tabIndex={0} key={data.weekExcerpt[0].title} className={S.week}>
                  {data.week[0].title}

                  <button tabIndex={0} className="close-icon" onClick={props.removeWeek(i)}><span className='sr-only'>Excluir Semana {data.week[0].title}</span></button>
                </div>
                  )
            })}
            <div className={S.datePicker}>
              { addWeekState &&
                <DatePicker
                  onChange={onSelectDate}
                  minDate={new Date('01/01/2016')}
                  maxDate={props.maxDate}
                  selected={localStorage.getItem('lastChosenDate') ? new Date(localStorage.getItem('lastChosenDate') || new Date) : new Date()}
                  inline
                />}
            </div>

            <button className={S.addWeek} onClick={handleAddWeek}>
              {addWeekState ? 'Cancelar' : 'Adicionar Semana' } 
            </button>
          </>
      }
    </div>
  );
}

export default WeeksManager;
