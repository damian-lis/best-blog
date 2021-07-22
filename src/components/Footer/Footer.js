import React from 'react';
import styles from './footer.module.css';

const Footer = ({ ...restProps }) => {
  return (
    <div {...restProps} className={styles.footer}>
      <div className={styles.footer__content}>Copyright &#169; Damian Lis 2021</div>
    </div>
  );
};

export default Footer;
