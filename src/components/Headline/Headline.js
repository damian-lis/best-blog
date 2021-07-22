import React from 'react';
import styles from './headline.module.css';

const Headline = ({ children, big, ...restProps }) => {
  return (
    <h3 {...restProps} className={`${styles.headline} ${big ? styles['headline--big'] : ''}`}>
      {children}
    </h3>
  );
};

export default Headline;
