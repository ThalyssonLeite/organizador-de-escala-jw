import Image from "next/future/image";
import Part from "../Part/Part";
import S from './Programation.module.scss';

import treasuresImg from 'public/static/icons/diamond.png';
import ministryImg from 'public/static/icons/wheat.png';
import cristianImg from 'public/static/icons/sheep.png';

interface IProps {
  data: any;
  index: number;
}

function Programation(props: IProps) {

  return (
    <div className={S.wrapper}>
      {!props.index && 
        <>
          <h1 className={S.title}>
            Programação da Reunião do Meio de Semana
          </h1>
          <hr className={S.divisor}/>
        </>
      }

      <div className={S.programation}>
        <Part text={`${props.data.week} | ${props.data.weekExcerpt}`}/>

        <Part text={props.data.songs[0]}/>
        <Part text="Comentários iniciais">
          <span>Comentários iniciais <small>(1 min)</small></span>
        </Part>

        <div className={S.treasuresSection}>
          <Image
            src={treasuresImg}
            width={56}
            height={56}
            className={S.treasuresSectionBall}
            alt="Tesouros"
          />
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
          <Image
            src={ministryImg}
            width={56}
            height={56}
            alt="Ministério"
          />
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
          <Image
            src={cristianImg}
            width={56}
            height={56}
            alt="Cristã"
          />
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