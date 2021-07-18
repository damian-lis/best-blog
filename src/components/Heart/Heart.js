import React from 'react';
import heartIcon from '../../assets/heartIcon.svg';
import grayHeartIcon from '../../assets/grayHeartIcon.svg';
import './heart.css';

const Heart = ({ number, toggle = true }) => {
  return (
    <div className={'heart'}>
      <img className={'heart__icon'} src={toggle ? heartIcon : grayHeartIcon} />
      <span className={'heart__number'}>{number}</span>
    </div>
  );
};

export default Heart;
