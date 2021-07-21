import React from 'react';
import styles from './headline.module.css';

const Headline = ({ children }) => {
  return <h3 className={styles.headline}>{children}</h3>;
};

export default Headline;
