import React from 'react';
import { PropTypes } from 'prop-types';
import { formatCurrency } from '../utils/formatCurrency';

export default function CardP({
  objProducts,
  addQuantity,
  removeQuantity,
  qty = 0,
  setQuantityWithInput,
}) {
  const handleChange = ({ target: { value } }) => {
    const products = { ...objProducts, quantity: +value };
    console.log('objProducts', objProducts);
    setQuantityWithInput(products);
  };

  return (
    <div key={ objProducts.id } className="product">
      <h3
        data-testid={ `customer_products__element-card-price-${objProducts.id}` }
      >
        {formatCurrency(objProducts.price)}
      </h3>
      <img
        data-testid={ `customer_products__img-card-bg-image-${objProducts.id}` }
        width="150px"
        height="150px"
        src={ objProducts.img }
        alt={ objProducts.name }
      />
      <h4
        data-testid={ `customer_products__element-card-title-${objProducts.id}` }
      >
        {objProducts.name}

      </h4>
      <section className="btn-products">
        <button
          onClick={ () => removeQuantity(objProducts.id) }
          type="button"
          data-testid={ `customer_products__button-card-rm-item-${objProducts.id}` }

        >
          -
        </button>
        <input
          data-testid={ `customer_products__input-card-quantity-${objProducts.id}` }
          type="text"
          inputMode="numeric"
          placeholder="0"
          value={ qty }
          onChange={ handleChange }
        />
        <button
          onClick={ () => addQuantity({
            ...objProducts, quantity: 1 }) }
          type="button"
          data-testid={ `customer_products__button-card-add-item-${objProducts.id}` }

        >
          +
        </button>
      </section>
    </div>
  );
}

CardP.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  price: PropTypes.number,
  img: PropTypes.string,
  addItem: PropTypes.function,
  removeItem: PropTypes.function,
  setItem: PropTypes.function,
  qty: PropTypes.number,
}.isRequired;
