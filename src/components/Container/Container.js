import React from 'react';
import './container.css';

const Container = ({ children, wrap, column, base, ...restProps }) => {
  return (
    <div
      {...restProps}
      className={`container ${wrap ? 'container--wrap' : ''}
    ${column ? 'container--column' : ''}
    ${base ? 'container--base' : ''}
    `}
    >
      {children}
    </div>
  );
};

export default Container;
