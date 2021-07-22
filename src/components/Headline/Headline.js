import React from 'react';
import PropTypes from 'prop-types';
import styles from './headline.module.css';

const Headline = ({ children, big, ...restProps }) => {
  return (
    <h3 {...restProps} className={`${styles.headline} ${big ? styles['headline--big'] : ''}`}>
      {children}
    </h3>
  );
};

Headline.propTypes = {
  big: PropTypes.bool
};

export default Headline;
