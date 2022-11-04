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
    setAddWeekState(false);
  };

  return (
    <div className={S.weeksManager}>
      {props.loading
        ? <i className='loading-gear-icon'></i>
        : <>
            {props.weeks.map((data, i) => {
              return (
              <div key={data.date} className={S.week}>
                {data.programation.week}

                <div className={S.closeWrapper}>
                  <i className="close-icon" onClick={props.removeWeek(i)}/>
                </div>
              </div>)
            })}
            <div className={S.datePicker}>
              { addWeekState &&
                <DatePicker
                  onChange={onSelectDate}
                  minDate={new Date('01/01/2016')}
                  maxDate={props.maxDate}
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