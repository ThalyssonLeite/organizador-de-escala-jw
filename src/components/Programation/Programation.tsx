import classNames from "classnames";
import Part from "../Part/Part";
import S from './Programation.module.scss';

interface IProps {
  data: any;
  index: number;
  className: any;
  onWriteData: (data: any) => void;
}

function Programation(props: IProps) {
  
  const onWriteData = (path: string, index: number = 0, type: string, text: string, roomIndex: number) => {
    const data = {...props.data};

    if (type === 'participant') data[path][index][type][roomIndex] = text;
    else data[path][index][type] = text;
    
    props.onWriteData(data);
  };

  return (
    <div
      id={props.data.id}
      className={classNames(
        S.programation,
        props.className,
        {
          [S.paddingTop]: (props.index && props.index % 2 === 0),
          [S.marginBottom]: Boolean(props.data.noMeeting) && (props.index % 2 === 0),
          [S.isNoMeeting]: Boolean(props.data.noMeeting),
          [S.isRoomB]: props.data.rooms['b'],
          [S.isRoomC]: props.data.rooms['c'],
          bordered: Boolean(props.data.noMeeting),
        }
      )}
    >
      {
        props.data.noMeeting
          ? <h2 tabIndex={0}>{`${props.data.week[0].title} | ${props.data.noMeeting}`}</h2>

          : <>
            <Part path="weekExcerpt" data={{ ...props.data.weekExcerpt[0], title: `${props.data.week[0].title} | ${props.data.weekExcerpt[0].title}`}} doNotEditLabel={true} onWriteData={onWriteData} rooms={props.data.rooms}/>

            <Part path="songs" data={props.data.songs[0]} onWriteData={onWriteData} rooms={props.data.rooms}/>
            <Part path="comments" data={props.data.comments[0]} onWriteData={onWriteData} rooms={props.data.rooms} noParticipant={true}/>

            <div className={classNames(S.treasuresSection, {[S.isRoomB]: props.data.rooms['b']})}>
              TESOUROS DA PALAVRA DE DEUS
            </div> 

            {props.data.treasures.map((part: any, i: number) => {
              return (
                <Part key={part.title} path="treasures" index={i} data={part} onWriteData={onWriteData} rooms={props.data.rooms}/>
              )
            })}

            <div className={classNames(S.ministrySection, {[S.isRoomB]: props.data.rooms['b']})}>
              FAÇA SEU MELHOR NO MINISTÉRIO
            </div> 

            <div className={S.ministryPartsWrapper}>
              {props.data.ministry.map((part: any, i: number) => {
                return (
                  <Part key={part.title} path="ministry" index={i} data={part} section="ministry" onWriteData={onWriteData} rooms={props.data.rooms}/>
                )
              })}
            </div>

            <div className={classNames(S.cristianSection, {[S.isRoomB]: props.data.rooms['b']})}>
              NOSSA VIDA CRISTÃ
            </div> 

            <Part path="songs" index={1} data={props.data.songs[1]} noParticipant={true} section='cristianLife' onWriteData={onWriteData} rooms={props.data.rooms}/>

            {props.data.cristianLife.map((part: any, i: number) => {
              return (
                <Part path="cristianLife" index={i} data={part} key={part.title} section='cristianLife' onWriteData={onWriteData} rooms={props.data.rooms}/>
              )
            })}

            <Part path="comments" index={1} data={props.data.comments[1]} section='cristianLife' onWriteData={onWriteData} rooms={props.data.rooms} noParticipant={true}/>
            <Part path="songs" index={2} data={props.data.songs[2]} section='cristianLife' onWriteData={onWriteData} rooms={props.data.rooms}/>
          </>
      }
    </div>
  );
}

export default Programation;
