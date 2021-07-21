import React from 'react';
import styles from './loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.loader__inner}></div>
      <div className={`${styles.loader__inner} ${styles['loader__inner--delay']}`}></div>
    </div>
  );
};

export default Loader;
