import React from 'react';
import './dynamicIcon.css';

const DynamicIcon = ({ number, src, srcTrue, srcFalse, toggle }) => {
  return (
    <div className={'dynamic-icon'}>
      <img
        className={'dynamic-icon__img'}
        src={src ? src : toggle ? srcTrue : srcFalse}
      />
      <span className={'dynamic-icon__number'}>{number}</span>
    </div>
  );
};

export default DynamicIcon;
