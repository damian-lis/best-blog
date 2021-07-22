import React from 'react';
import styles from './errorInfo.module.css';

const ErrorInfo = ({ ...restProps }) => {
  return (
    <p {...restProps} className={styles.errorInfo}>
      Wystąpił jakiś błąd <br />
      Załaduj stronę jeszcze raz!
    </p>
  );
};

export default ErrorInfo;
