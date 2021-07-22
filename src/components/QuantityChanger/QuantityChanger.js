import React from 'react';
import PropTypes from 'prop-types';
import styles from './quantityChanger.module.css';

const QuantityChanger = ({
  rangeSize = 0,
  maxSize = 0,
  quantity = 0,
  setQuantity = () => {},
  ...restProps
}) => {
  let range = rangeSize;

  const handleQuantity = (action) => {
    switch (action) {
      case 'add':
        const isAdd = quantity + range < maxSize;
        if (!isAdd) {
          range = maxSize - quantity;
        }

        setQuantity(quantity + range);
        break;

      case 'subtract':
        const isSubtract = quantity - range > 0;

        if (!isSubtract) {
          range = quantity;
        }

        setQuantity(quantity - range);
        break;

      default:
        break;
    }
  };

  const isAddDisabled = quantity === maxSize;
  const isSubtractDisabled = quantity === 0;

  return (
    <div {...restProps} className={styles.quantityChanger}>
      <h3 className={styles.quantityChanger__info}>
        Wyświetlasz {quantity} z {maxSize}
      </h3>
      <div className={styles.quantityChanger__btnContainer}>
        <button
          className={`${styles.quantityChanger__btn} ${
            isSubtractDisabled ? styles['quantityChanger__btn--disabled'] : ''
          }`}
          disabled={quantity === 0}
          onClick={() => handleQuantity('subtract')}>
          Schowaj ({range > quantity ? quantity : range})
        </button>
        <button
          className={`${styles.quantityChanger__btn} ${
            isAddDisabled ? styles['quantityChanger__btn--disabled'] : ''
          }`}
          disabled={quantity === maxSize}
          onClick={() => handleQuantity('add')}>
          Pokaz ({range > maxSize - quantity ? maxSize - quantity : range})
        </button>
      </div>
    </div>
  );
};

QuantityChanger.propTypes = {
  rangeSize: PropTypes.number.isRequired,
  maxSize: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  setQuantity: PropTypes.func.isRequired
};

export default QuantityChanger;
