import classNames from "classnames";
import Part from "../Part/Part";
import S from './Programation.module.scss';

interface IProps {
  data: any;
  index: number;
  className: any
  onWriteData: (data: any) => void;
}

function Programation(props: IProps) {
  
  const onWriteData = (path: string, index: number = 0, type: string, text: string) => {
    const data = {...props.data};

    data[path][index][type] = text;
    props.onWriteData(data);
  };

  return (
    <div className={classNames(S.programation, props.className)}>
        <Part path="weekExcerpt" data={{ title: `${props.data.week[0].title} | ${props.data.weekExcerpt[0].title}`}} doNotEditLabel={true} onWriteData={onWriteData}/>

        <Part path="songs" data={props.data.songs[0]} onWriteData={onWriteData}/>
        <Part path="comments" data={props.data.comments[0]} onWriteData={onWriteData}/>

        <div className={S.treasuresSection}>
          TESOUROS DA PALAVRA DE DEUS
        </div> 

        {props.data.treasures.map((part: any, i: number) => {
          return (
            <Part key={part.title} path="treasures" index={i} data={part} onWriteData={onWriteData}/>
          )
        })}

        <div className={S.ministrySection}>
          FAÇA SEU MELHOR NO MINISTÉRIO
        </div> 

        {props.data.ministry.map((part: any, i: number) => {
          return (
            <Part key={part.title} path="ministry" index={i} data={part} section="ministry" onWriteData={onWriteData}/>
          )
        })}

        <div className={S.cristianSection}>
          NOSSA VIDA CRISTÃ
        </div> 

        <Part path="songs" index={1} data={props.data.songs[1]} doNotPray={true} section='cristianLife' onWriteData={onWriteData}/>

        {props.data.cristianLife.map((part: any, i: number) => {
          return (
            <Part path="cristianLife" index={i} data={part} key={part.title} section='cristianLife' onWriteData={onWriteData}/>
          )
        })}

        <Part path="comments" index={1} data={props.data.comments[1]} section='cristianLife' onWriteData={onWriteData}/>
        <Part path="songs" index={2} data={props.data.songs[2]} section='cristianLife' onWriteData={onWriteData}/>
    </div>
  );
}

export default Programation;