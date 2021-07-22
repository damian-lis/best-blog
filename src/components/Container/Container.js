import React from 'react';
import styles from './container.module.css';

const Container = ({ children, wrap, column, base, main, mainWrapper, ...restProps }) => {
  return (
    <div
      {...restProps}
      className={`${styles.container} ${wrap ? styles[`container--wrap`] : ''}
    ${column ? styles[`container--column`] : ''}
    ${base ? styles[`container--base`] : ''}
    ${main ? styles[`container--main`] : ''}
    ${mainWrapper ? styles[`container--mainWrapper`] : ''}
    `}>
      {children}
    </div>
  );
};

export default Container;
