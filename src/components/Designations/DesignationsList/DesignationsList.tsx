import React, { useEffect, useState } from "react";
const smoothScroll = require('scroll-smooth');
import S from '../../WeeksManager/WeeksManager.module.scss';
import SDesignation from '../Designation.module.scss';

interface IProps {
  designations: any;
}

function DesignationsList (props: IProps) {
  const {designations} = props;
  const designationsKeys = Object.keys(designations);

  function goToDesignation (participantName: string) {
    const $designation: any = document.querySelector(`*[designation-id="${participantName}"]`);

    const designationOffsetTop = $designation?.offsetTop || 0;

    const $mainContent: any = document.querySelector('*[data-id="main-content"]');
    const littlePaddingForBetterView = 12;
    const minOffsetTop = 40;
    const isFirstElement = designationOffsetTop === minOffsetTop;
    
    const indexIsOdd = Array.from($designation.parentElement.childNodes).findIndex(child => child === $designation) % 2 !== 0;

    function highlightDesignation () {
      $designation.children[0].classList.add(SDesignation.isHighlighted);

      setTimeout(() => {
        $designation.children[0].classList.remove(SDesignation.isHighlighted);
      }, 1000);
    };
    
    smoothScroll.to(
      isFirstElement
        ? 0
        : designationOffsetTop - littlePaddingForBetterView,
      {context: $mainContent}
    );

    highlightDesignation();
  }

  function copyDesignation (e, participantName: string) {
    const $target = e.currentTarget;
    const $textNode = $target.childNodes[0];
    const $designation: any = document.querySelector(`*[designation-id="${participantName}"]`);

    $designation.innerText.replaceAll('\n\n', '\n');

    const previousTextNode = $textNode.textContent;

    $textNode.textContent = 'Designação copiada!';

    $target.onmouseout = () => {
      setTimeout(() => {
        $textNode.textContent = previousTextNode;
      }, 300);

      $target.onmouseout = null;
    }
  };
  
  return (
    <div className={S.weeksGroup}>
      {designationsKeys.map((participantName: string) => {
        return (
          <div
            className={S.week}
            title='Clique para copiar e rolar'
            key={participantName}
            onClick={(e) => {
              goToDesignation(participantName); copyDesignation(e, participantName);
            }}
          >
            {participantName}
            <button
              className='copy-icon'
              style={{pointerEvents: 'none'}}
            />
          </div>
        )})}
    </div>
  )
}

export default DesignationsList;