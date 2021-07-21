import React from 'react';
import styles from './dynamicIcon.module.css';

const DynamicIcon = ({
  number,
  src,
  srcTrue,
  srcFalse,
  toggle,
  label,
  small,
  medium,
  link,
  white,
  reverse,
}) => {
  return (
    <div
      className={`${styles.dynamicIcon} ${
        link ? styles['dynamicIcon--link'] : ''
      }
    ${white ? styles['dynamicIcon--linkWhite'] : ''}
    ${reverse ? styles['dynamicIcon--reverse'] : ''}
    `}
    >
      {label && <span>{label}</span>}
      <div
        className={`${styles.dynamicIcon__imgContainer} ${
          small ? styles['dynamicIcon__imgContainer--small'] : ''
        }
        ${medium ? styles['dynamicIcon__imgContainer--medium'] : ''}`}
      >
        <img
          className={styles.dynamicIcon__img}
          src={src ? src : toggle ? srcTrue : srcFalse}
        />
        {number !== undefined ? (
          <span className={styles.dynamicIcon__number}>{number}</span>
        ) : null}
      </div>
    </div>
  );
};

export default DynamicIcon;
