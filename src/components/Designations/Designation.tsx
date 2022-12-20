import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { downloadText } from '../Header/Submenu/handlers';
import S from './Designation.module.scss';

interface IProps {
  state: boolean;
  toggleState: (state: boolean) => void;
}

function Desgination(props: IProps) {
  const copyToClipboard = async (e: any) => {
    const target = e.currentTarget;

    const designation = target
      .closest('.'+S.card)
      .querySelector('.'+S.designation)
      .innerText;

    await navigator
      .clipboard
      .writeText(designation)

    target.classList.add(S.isCopied);
    setTimeout(() => target.classList.remove(S.isCopied), 2500);
  };

  const [designations, setDesignations] = useState<any[]>([]);

  useEffect(() => {
    document.body.style.overflow = props.state ? 'hidden' : 'auto';

    const weeksFromLS = JSON.parse(localStorage.getItem('weeks') || '[]');

    const parts = weeksFromLS.flatMap((week: any) => {
      const bibleReader = week.treasures.pop();

      return [
        ...(bibleReader.participant ? [{ ...bibleReader, week: week.week[0].title }] : []),
        ...week.ministry.filter((part: any) => part.participantType && part.participant).map((part: any) => ({ ...part, week: week.week[0].title })),
      ]
    });

    const participants: {to: any, designations?: any}[] = [...new Set(parts.flatMap((part: any) => {
      return part
        .participant
        .split('/')
        .map((text: string) => text.trim())
        .filter((text: string) => text);
    }))].map(participant => ({ to: participant }));

    participants.forEach((participant, i) => {
      const partsWith = parts.filter((part: any) => part.participant.includes(participant.to));

      participants[i].designations = partsWith;
    });
    
    setDesignations(participants);
  }, [props.state]);

  const saveAsTXT = () => {
    const text = `${designations.map((participant, i) => {
      return `${i ? '\n\n' : ''}Designação para: ${participant.to}
        ${participant.designations.map((designation: any, i: number) => {
          return `
Semana: ${designation?.week}
Parte: ${designation?.title}
Designados: ${designation?.participant}\n`
        }).join('')}`
    }).join('')}`

    downloadText('Designações de Meio de Semana TXT', text);
  };

  return (
    <div className={classNames(S.wrapper, {[S.isVisible]: props.state})}>
      <button tabIndex={0} className={S.close} onClick={() => props.toggleState(!props.state)}>
        <i className="close-icon"></i>
        <span className='sr-only'>Fechar Designações</span>
      </button>

      {
        designations.length
          ? <button className={S.saveAs} onClick={saveAsTXT}>Salvar como TXT</button>
          : <div className={S.card}>
            Você ainda não designou nenhum estudante da Escola
          </div>
      }

      {
        designations.map((participant, i) => {
          return (
            <div className={S.card} key={participant.to}>
              <div className={S.designation}>
              Designação para: {participant.to}<br/><br/>

              {
                participant.designations.map((designation: any, i: number) => {
                  return (
                    <>
                      Semana: {designation?.week}<br/>
                      Parte: {designation?.title}<br/>
                      Designados: {designation?.participant}<br/>

                      {
                        participant.designations.length > 1 &&
                        !((participant.designations.length - 1) === i) &&
                        <br/>
                      }
                    </>
                  )
                })
              }
              </div>

              <button className={S.copy} onClick={copyToClipboard}>
                <span className={S.copyBefore}>Copiar Designação <span className='sr-only'>de {participant.to}</span></span>
                <span className={S.copyAfter}>Designação Copiada!</span>
              </button>
            </div>
          )
        })
      }
    </div>
  );
}

export default Desgination;