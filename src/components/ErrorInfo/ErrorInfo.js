import React from 'react';
import styles from './errorInfo.module.css';

const ErrorInfo = () => {
  return (
    <p className={styles.errorInfo}>
      Wystąpił jakiś błąd <br />
      Załaduj stronę jeszcze raz!
    </p>
  );
};

export default ErrorInfo;
