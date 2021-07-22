import React from 'react';
import PropTypes from 'prop-types';
import styles from './select.module.css';

const Select = ({ setSelect = () => {}, selectOptions = [], ...restProps }) => {
  const handleSelectChange = (e) => {
    setSelect(e.target.value);
  };

  return (
    <select {...restProps} onChange={handleSelectChange} className={styles.select}>
      {selectOptions.map((selectOption, index) => (
        <option key={index} value={selectOption.value}>
          {selectOption.label}
        </option>
      ))}
    </select>
  );
};

Select.propTypes = {
  setSelect: PropTypes.func.isRequired,
  selectOptions: PropTypes.array.isRequired
};

export default Select;
