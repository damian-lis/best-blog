import React from 'react';
import heartIconImg from '../../assets/heartIcon.svg';
import './heart.css';

const Heart = ({ number }) => {
  return (
    <div className={'heart'}>
      <img className={'heart__icon'} src={heartIconImg} />
      <span className={'heart__number'}>{number}</span>
    </div>
  );
};

export default Heart;
