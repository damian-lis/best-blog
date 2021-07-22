import React from 'react';
import styles from './dynamicIcon.module.css';

const DynamicIcon = ({
  number,
  src,
  srcTrue,
  srcFalse,
  toggle,
  label,
  labelMedium,
  imgSmall,
  imgMedium,
  link,
  white,
  reverse,
  ...restProps
}) => {
  return (
    <div
      {...restProps}
      className={`${styles.dynamicIcon} ${link ? styles['dynamicIcon--link'] : ''}
    ${white ? styles['dynamicIcon--linkWhite'] : ''}
    ${reverse ? styles['dynamicIcon--reverse'] : ''}
    `}>
      {label && (
        <span
          className={`${styles.dynamicIcon__label} ${
            labelMedium ? styles['dynamicIcon__label--medium'] : ''
          }`}>
          {label}
        </span>
      )}
      <div
        className={`${styles.dynamicIcon__imgContainer} ${
          imgSmall ? styles['dynamicIcon__imgContainer--small'] : ''
        }
        ${imgMedium ? styles['dynamicIcon__imgContainer--medium'] : ''}`}>
        <img
          className={styles.dynamicIcon__img}
          alt="dynamicIcon"
          src={src ? src : toggle ? srcTrue : srcFalse}
        />
        {number !== undefined ? <span className={styles.dynamicIcon__number}>{number}</span> : null}
      </div>
    </div>
  );
};

export default DynamicIcon;
