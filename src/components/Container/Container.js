import React from 'react';
import styles from './container.module.css';

const Container = ({ children, wrap, column, base, ...restProps }) => {
  return (
    <div
      {...restProps}
      className={`${styles.container} ${wrap ? styles[`container--wrap`] : ''}
    ${column ? styles[`container--column`] : ''}
    ${base ? styles[`container--base`] : ''}
    `}
    >
      {children}
    </div>
  );
};

export default Container;
