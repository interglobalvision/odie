import React from 'react';

const Tooltip = ({ content, tooltipClass }) => (
  <div className='tooltip-holder grid-row justify-center'>
    <div className={'tooltip tooltip-' + tooltipClass}>
      <span className='font-size-small'>{ content }</span>
    </div>
  </div>
)

export default Tooltip;
