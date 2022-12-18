import classNames from 'classnames';
import { useEffect } from 'react';
import S from './Part.module.scss';

interface IProps {
  path?: 'treasures' | 'ministry' | 'cristianLife' | 'songs' | 'week' | 'weekExcerpt' | 'comments';
  index?: number;
  data: any;
  doNotPray?: boolean;
  doNotEditLabel?: boolean;
  section?: 'treasures' | 'ministry' | 'cristianLife';
  onWriteData: any; 
}

function Part(props: IProps) {
  const search = (string: string) => {
    return props.data.title?.toLowerCase().includes(string);
  };

  let color;
  let label: any;

  const isTreasures = (props.section === 'treasures') || props.section === undefined;
  const isMinistry = props.section === 'ministry';
  const isCristian = props.section === 'cristianLife';

  if (isTreasures) {
    color = '#626262';
  } else if (isMinistry) {
    color = '#c38439';
  } else if (isCristian) {
    color = '#942926';
  } else {
    color = '#626262';
  };

  const isPrayer = search('cântico') && (isTreasures || isCristian);
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

  const onBlurParticipant = (e: any) => {
    const $target = e.currentTarget.closest('.'+S.participant);
    const hasSomethingInIt = e.currentTarget.innerHTML.length;
    const classListMethod = hasSomethingInIt ? "add" : "remove";
    e.currentTarget.classList[classListMethod](S.isFilled);
    $target.classList[classListMethod](S.isFilled);
  };

  const onFocusParticipant = (e: any) => {
    const $target = e.currentTarget.closest('.'+S.participant);
    e.currentTarget.classList.remove(S.isFilled);
    $target.classList.remove(S.isFilled);
  }

  const onBlurLabel = (e: any) => {
    const $target = e.currentTarget;
    const hasSomethingInIt = e.currentTarget.innerHTML.length;
    const classListMethod = !hasSomethingInIt ? "add" : "remove";
    $target.closest('.'+S.label).classList[classListMethod](S.isEmpty);
    setTimeout(() => $target.style.display = 'inline', 300);
  };

  const onFocusLabel = (e: any) => {
    const $target = e.currentTarget;
    $target.style.display = 'inline-block';
    $target.closest('.'+S.label).classList.add(S.isEmpty);
  };

  const onBlurParticipantType = (e: any) => {
    const $target = e.currentTarget;
    const hasSomethingInIt = e.currentTarget.innerHTML.length;
    const classListMethod = !hasSomethingInIt ? "add" : "remove";
    $target.classList[classListMethod](S.isEmpty);
  };

  const onFocusParticipantType = (e: any) => {
    const $target = e.currentTarget;
    $target.classList.add(S.isEmpty);
  };

  const onBlurTime = (e: any) => {
    const $target = e.currentTarget;
    const hasSomethingInIt = e.currentTarget.innerHTML.length;
    const classListMethod = !hasSomethingInIt ? "add" : "remove";
    $target.parentElement.parentElement.classList[classListMethod](S.mb);
    $target.classList[classListMethod](S.isEmpty);
  };

  const onFocusTime = (e: any) => {
    const $target = e.currentTarget;
    $target.parentElement.parentElement.classList.add(S.mb);
    $target.classList.add(S.isEmpty);
  };

  const onWriteData = (e: any, type: string) => {
    const target = e.currentTarget;

    setTimeout(() => {
      props.onWriteData(props.path, props.index,  type, typeof e === 'string' ? e : target.innerText);
    }, 300)
  };

  const participantType = isPresident
    ? <strong className={classNames(S.participantType, S.black)} contentEditable onBlur={onBlurParticipantType} onFocus={onFocusParticipantType} onKeyDown={(e) => onWriteData(e, 'participantType')}>{props.data.participantType || label}</strong>
    : <span className={S.participantType} contentEditable onBlur={onBlurParticipantType} onFocus={onFocusParticipantType} onKeyDown={(e) => onWriteData(e, 'participantType')}>{props.data.participantType || label}</span>;

  const participant = (
      <div className={classNames(S.participant, {[S.isFilled]: props.data.participant})}>
        {label && participantType}
      
        <div
          contentEditable
          spellCheck="false"
          className={S.input}
          onBlur={onBlurParticipant}
          onFocus={onFocusParticipant}
          onKeyDown={(e) => onWriteData(e, 'participant')}
        >
          { props.data.participant || ''}
        </div>
    </div>
  );

  const ball = (<div className={S.ball} style={{ background: color }}/>);

  useEffect(() => {
    if (label) onWriteData(label, 'participantType');
  }, []);

  return (
    <div className={S.part}>
      <div className={classNames(S.label, {[S.isPresident]: isPresident})}>
         {!isPresident && ball}

          <div className={S.titleAndTime}>
            <div
              className={S.inputLabel}
              contentEditable={!props.doNotEditLabel}
              onBlur={onBlurLabel}
              onFocus={onFocusLabel}
              onKeyDown={(e) => onWriteData(e, 'title')}
            >
              { props.data.title }
            </div>

            {
              Boolean(props.data.time) && 
              (
                <small
                  className={S.inputTime}
                  contentEditable={!props.doNotEditLabel}
                  onBlur={onBlurTime}
                  onFocus={onFocusTime}
                  onKeyDown={(e) => onWriteData(e, 'time')}
                >{ props.data.time }</small>
              )
            }
          </div>

      </div>

        

      {!props.doNotPray && participant}
      
    </div>
  );
}

export default Part;