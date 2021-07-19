import React from 'react';
import './quantityChanger.css';

const QuantityChanger = ({ rangeSize, maxSize, quantity, setQuantity }) => {
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
    <div className='quantity-changer'>
      <h3 className='quantity-changer__info'>
        Aktualnie {quantity}/{maxSize}
      </h3>
      <div className='quantity-changer__btn-container'>
        <button
          className={`quantity-changer__btn ${
            isAddDisabled ? 'quantity-changer__btn--disabled' : ''
          }`}
          disabled={quantity === maxSize}
          onClick={() => handleQuantity('add')}
        >
          Wyświetl więcej!
        </button>
        <button
          className={`quantity-changer__btn ${
            isSubtractDisabled ? 'quantity-changer__btn--disabled' : ''
          }`}
          disabled={quantity === 0}
          onClick={() => handleQuantity('subtract')}
        >
          Wyświetl mniej!
        </button>
      </div>
    </div>
  );
};

export default QuantityChanger;
