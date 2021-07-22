import React from 'react';
import PropTypes from 'prop-types';
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

Container.propTypes = {
  wrap: PropTypes.bool,
  column: PropTypes.bool,
  base: PropTypes.bool,
  main: PropTypes.bool,
  mainWrapper: PropTypes.bool
};

export default Container;
