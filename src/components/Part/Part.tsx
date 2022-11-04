import classNames from 'classnames';
import S from './Part.module.scss';

interface IProps {
  children?: JSX.Element | string;
  text?: string;
  type?: 'treasures' | 'ministry' | 'cristian';
  doNotPray?: boolean;
}

function Part(props: IProps) {
  const search = (string: string) => {
    return props.text?.toLowerCase().includes(string);
  };

  let color;
  let label;

  const isTreasures = (props.type === 'treasures') || props.type === undefined;
  const isMinistry = props.type === 'ministry';
  const isCristian = props.type === 'cristian';

  if (isTreasures) {
    color = '#626262';
  } else if (isMinistry) {
    color = '#c38439';
  } else if (isCristian) {
    color = '#942926';
  } else {
    color = '#626262';
  };

  const isPrayer = search('cântico') && (isTreasures || isCristian) && !props.doNotPray;
  const isStudent = search('leitura da bíblia') || isMinistry && !search('vídeo');
  const isStudy = search('estudo bíblico de congregação');
  const isPresident = search(' | ');

  if (isPrayer) {
    label = 'Oração:'
  } else if (isStudent) {
    label = 'Estudante:'
  } else if (isStudy) {
    label = 'Dirigente/Leitor:'
  } else if (isPresident) {
    label = 'Presidente:'
  }

  const onBlur = (e: any) => {
    const $target = e.currentTarget.closest('.'+S.participant);
    const hasSomethingInIt = e.currentTarget.innerHTML.length;
    const classListMethod = hasSomethingInIt ? "add" : "remove";
    $target.classList[classListMethod](S.isFilled);
  };

  const participant = (
  <div className={S.participant}>
    <span className={S.participantType}>
      {isPresident
        ? <strong>{label}</strong>
        : label
      }
    </span> 
    <div contentEditable spellCheck="false" className={S.input} onBlur={onBlur}></div>
  </div>
  );

  const ball = (<div className={S.ball} style={{ background: color }}/>);

  return (
    <div className={S.part}>
      <div className={classNames(S.label, {[S.isPresident]: isPresident})}>
         {!isPresident && ball} { props.children || props.text}
      </div>

      {!search("cântico") && participant}
      
    </div>
  );
}

export default Part;