import React from 'react';
import styles from './headline.module.css';

const Headline = ({ children, big }) => {
  return <h3 className={`${styles.headline} ${big ? styles['headline--big'] : ''}`}>{children}</h3>;
};

export default Headline;
