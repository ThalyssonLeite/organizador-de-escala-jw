import Image from "next/future/image";
import Part from "../Part/Part";
import S from './Programation.module.scss';

import treasuresImg from 'public/diamond.png';
import ministryImg from 'public/wheat.png';
import cristianImg from 'public/sheep.png';

interface IProps {
  data: any
}

function Programation(props: IProps) {

  if (!props.data) return null;
  
  return (
    <div>
       <h1 className={S.title}>Programação da Reunião do Meio de Semana</h1>
      <hr className={S.divisor}/>

      <div className={S.programation}>
        <div className={S.week}>
          {props.data.week} | {props.data.weekExcerpt}
        </div>

        <Part text={props.data.songs[0]}/>
        <Part text="Comentários iniciais"/>

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

        <Part text={props.data.treasures}/>
        <Part text="Joias espirituais"/>
        <Part text="Leitura da Bíblia"/>

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
              <>{part.title} <small>{part.time}</small></>
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
              <>{part.title} <small>{part.time}</small></>
            </Part>
          )
        })}

        <Part type="cristian" text="Comentários finais"/>
        <Part type="cristian" text={props.data.songs[2]}/>
      </div>
    </div>
  );
}

export default Programation;