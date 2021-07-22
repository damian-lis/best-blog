import React from 'react';
import styles from './line.module.css';

const Line = ({ ...restProps }) => {
  return <div {...restProps} className={styles.line}></div>;
};

export default Line;
