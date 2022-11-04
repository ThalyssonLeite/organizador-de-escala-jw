import classNames from "classnames";
import Part from "../Part/Part";
import S from './Programation.module.scss';

interface IProps {
  data: any;
  index: number;
  className: any
}

function Programation(props: IProps) {

  return (
    <div className={classNames(S.wrapper, props.className)}>
      <div className={S.programation}>
        <Part text={`${props.data.week} | ${props.data.weekExcerpt}`}/>

        <Part text={props.data.songs[0]}/>
        <Part text="Comentários iniciais">
          <span>Comentários iniciais <small>(1 min)</small></span>
        </Part>

        <div className={S.treasuresSection}>
          
          TESOUROS DA PALAVRA DE DEUS
        </div> 

        <Part text={props.data.treasures}>
          <span>{props.data.treasures} <small>(10 min)</small></span>
        </Part>
        <Part text="Joias espirituais">
          <span>Joias espirituais <small>(10 min)</small></span>
        </Part>
        <Part text="Leitura da Bíblia">
          <span>Leitura da Bíblia <small>(4 min)</small></span>
        </Part>

        <div className={S.ministrySection}>
          FAÇA SEU MELHOR NO MINISTÉRIO
        </div> 

        {props.data.ministry.map((part: any) => {
          return (
            <Part key={part.title} text={`${part.title} ${part.time}`}type="ministry">
              <span>{part.title} <small>{part.time}</small></span>
            </Part>
          )
        })}

        <div className={S.cristianSection}>
          NOSSA VIDA CRISTÃ
        </div> 

        <Part type="cristian" text={props.data.songs[1]} doNotPray={true}/>

        {props.data.cristianLife.map((part: any) => {
          return (
            <Part type="cristian" text={`${part.title} ${part.time}`}key={part.title}>
              <span>{part.title} <small>{part.time}</small></span>
            </Part>
          )
        })}

        <Part type="cristian" text="Comentários finais">
          <span>Comentários finais <small>(3 min)</small></span>
        </Part>
        <Part type="cristian" text={props.data.songs[2]}/>
      </div>
    </div>
  );
}

export default Programation;