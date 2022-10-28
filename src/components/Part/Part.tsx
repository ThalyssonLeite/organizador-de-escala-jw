import S from './Part.module.scss';

interface IProps {
  children?: JSX.Element | string;
  text?: string;
  type?: 'treasures' | 'ministry' | 'cristian';
  doNotPray?: boolean;
}

function Part(props: IProps) {
  function search(string: string) {
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
    color = '#9d5d07';
  } else if (isCristian) {
    color = '#942926';
  } else {
    color = '#626262';
  };

  const isPrayer = search('cântico') && (isTreasures || isCristian) && !props.doNotPray;
  const isStudent = search('leitura da bíblia') || isMinistry && !search('vídeo');
  const isStudy = search('estudo bíblico de congregação');

  if (isPrayer) {
    label = 'Oração:'
  } else if (isStudent) {
    label = 'Estudante:'
  } else if (isStudy) {
    label = 'Dirigente/Leitor:'
  }

  return (
    <div className={S.part}>
      <div className={S.label}>
        <div className={S.ball} style={{ background: color }}></div> { props.children || props.text}
      </div>

      <div className={S.participants}>
        {label} <input type="text" />
      </div>
    </div>
  );
}

export default Part;