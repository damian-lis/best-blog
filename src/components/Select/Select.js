import React from 'react';
import './select.css';

const Select = ({ setSelect, ...restProps }) => {
  const handleSelectChange = (e) => {
    setSelect(e.target.value);
  };

  return (
    <select onChange={handleSelectChange} className='select' {...restProps}>
      <option value='all'>Wszystkie komentarze</option>
      <option value='liked'>Polubione komentarze</option>
      <option value='unliked'>Niepolubione komentarze</option>
    </select>
  );
};

export default Select;
