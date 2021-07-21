import React from 'react';
import styles from './select.module.css';

const Select = ({ setSelect, selectOptions, ...restProps }) => {
  const handleSelectChange = (e) => {
    setSelect(e.target.value);
  };

  return (
    <select onChange={handleSelectChange} className={styles.select} {...restProps}>
      {selectOptions.map((selectOption) => (
        <option value={selectOption.value}>{selectOption.label}</option>
      ))}
    </select>
  );
};

export default Select;
