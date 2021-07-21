import React from 'react';
import styles from './headline.module.css';

const Headline = ({ children, xl }) => {
  return <h3 className={`${styles.headline} ${xl ? styles['headline--xl'] : ''}`}>{children}</h3>;
};

export default Headline;
