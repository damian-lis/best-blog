import React from 'react';
import './loader.css';

const Loader = () => {
  return (
    <div className='loader'>
      <div className='loader__inner'></div>
      <div className='loader__inner--delay'></div>
    </div>
  );
};

export default Loader;
