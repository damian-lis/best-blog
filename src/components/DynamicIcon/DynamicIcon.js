import React from 'react';
import './dynamicIcon.css';

const DynamicIcon = ({
  number,
  src,
  srcTrue,
  srcFalse,
  toggle,
  label,
  small,
  medium,
  link,
}) => {
  return (
    <div className={`dynamic-icon ${link ? 'dynamic-icon--link' : ''}`}>
      {label && <span className='dynamic-icon__label'>{label}</span>}
      <div
        className={`dynamic-icon__img-container ${
          small ? 'dynamic-icon__img-container--small' : ''
        }
        ${medium ? 'dynamic-icon__img-container--medium' : ''}`}
      >
        <img
          className='dynamic-icon__img'
          src={src ? src : toggle ? srcTrue : srcFalse}
        />
        {number !== undefined ? (
          <span className='dynamic-icon__number'>{number}</span>
        ) : null}
      </div>
    </div>
  );
};

export default DynamicIcon;
