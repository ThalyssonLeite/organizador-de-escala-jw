import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { downloadText } from '../Header/Submenu/handlers';
import S from './Designation.module.scss';

interface IProps {
  state: boolean;
  toggleState: (state: boolean) => void;
  setDesignations: (designations: any) => void;
  designations: any;
}

function Desgination(props: IProps) {
  const {designations} = props;

  useEffect(() => {
    document.body.style.overflow = props.state ? 'hidden' : 'auto';

    const weeksFromLS = JSON.parse(localStorage.getItem('weeks') || '[]');

    const parts = weeksFromLS.flatMap((week: any) => {
      const bibleReader = (
        week.treasures[week.treasures.length - 1].participant
          ? [
              {
                ...week.treasures.pop(week.treasures.length - 1),
                week: week.week[0].title
              }
            ]
          : []
      );

      const ministry = week.ministry
        .filter((part: any) => {
          return part.participantType && part.participant.length
        })
        .map((part: any) => {
          return {
            ...part,
            week: week.week[0].title 
          };
        });

      return [
        ...bibleReader,
        ...ministry,
      ]
    });

    let participants: any = {};

    parts.forEach(part => {
      part.participant.forEach((participant: string, i: number) => {
        const separators = ['/', `\\`, '|', ',', ':', ';', '-', ' e '];

        const separator = separators.find(separator => participant.includes(separator));

        const participantsOfThisPart = Boolean(separator) 
          ? participant.split(separator).map(separator => separator.trim())
          : [participant.trim()];

        participantsOfThisPart.forEach(string => string.trim());

        participantsOfThisPart.forEach((participantOfThisPart: string) => {
          participants = {
            ...participants,
            [participantOfThisPart]: [
              ...(participants[participantOfThisPart] || []),
              {
                week: part.week,
                participants: participant,
                title: part.title,
                plural: separator,
                room: i === 0
                  ? 'A'
                  : i === 1
                    ? 'B'
                    : 'C'
              }
            ]
          }
        });
      });
    });

    let sortedParticipants: any = Object.entries(participants)
    sortedParticipants.sort((a: any[], b: any[]) => {
      return b[1].length - a[1].length
    });

    props.setDesignations(() => (Object.fromEntries(sortedParticipants) as any));

    //This line below serves to get the data to download designations as text
  }, [props.state]);
  
  localStorage.setItem('designations', JSON.stringify(designations));
  
  const designationKeys = Object.keys(designations);
  const justRoomA = designationKeys
  .flatMap(key => designations[key])
  .every(part => part.room === 'A');

  return (
    <div className={S.wrapper}>
      {
        designationKeys.map((participantKey: string, i: number) => {
          return (
            <>
              <div
                designation-id={participantKey}
                className={classNames(
                S.cardWrapper,
              )}>
                <div className={S.card}
                  key={participantKey}
                >
                  <div className={S.designation}>
                  <strong>Designação para {participantKey}</strong><br/><br/>
                  {
                    designations[participantKey].map((designation: any, i: number) => {
                      return (
                        <div>
                          <strong>Semana:</strong> {designation?.week}<br/>
                          <strong>Parte:</strong> {designation?.title}<br/>
                          <strong>Designado{designation.plural ? 's' : ''}:</strong> {designation?.participants}<br/>
                          {!justRoomA && (
                            <><strong>Sala:</strong> {designation?.room}<br/></>
                          )}
                          {
                            (designations[participantKey].length > 1 &&
                            !((designations[participantKey].length - 1) === i)) &&
                            <br/>
                          }
                        </div>
                      )
                    })
                  }
                  </div>
                </div>
              </div>

              {(designations[participantKey].length
                >
              (designations[designationKeys[i + 1]]||[0]).length) && <div/>}
            </>
          )
        })
      }
    </div>
  );
}

export default Desgination;