import classNames from 'classnames';
import { useEffect } from 'react';
import S from './Designation.module.scss';

function Desgination() {
  const copyToClipboard = async (e: any) => {
    console.log( e
      .currentTarget
      .closest('.'+S.card))
    const designation = e
      .currentTarget
      .closest('.'+S.card)
      .querySelector('.'+S.designation)
      .innerText;

    await navigator
      .clipboard
      .writeText(designation);
  };

  useEffect(() => {
    const weeksFromLS = JSON.parse(localStorage.getItem('weeks') || '[]');

    const participants = weeksFromLS.flatMap((week: any) => {
      const bibleReader = week.treasures.pop();

      return [
        ...week.ministry.filter((part: any) => part.participantType && part.participant),
        ...(bibleReader.participant ? [bibleReader] : [])
      ]
    });

    console.log(participants)
  })



  return (
    <div className={S.wrapper}>
      <button tabIndex={0} className={S.close}>
        <i className="close-icon"></i>
        <span className='sr-only'>Fechar Designações</span>
      </button>

      <div className={S.card}>
        <div className={S.designation}>
          Designação para: Fulana<br/><br/>

          Semana: 7-13 de novembro<br/>
          Parte: Revisita<br/>
          Designados: Fulana1 / Fulana2<br/>
        </div>

        <button className={S.copy} onClick={copyToClipboard}>
          Copiar Designação
        </button>
      </div>
    </div>
  );
}

export default Desgination;