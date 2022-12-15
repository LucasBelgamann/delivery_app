import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import { formatCurrency } from '../utils/formatCurrency';
import Context from '../context/context';

export default function CardP({
  id,
  price,
  img,
  name,
  addQuantity,
  removeQuantity,
  qty = 0,
  setItem,
}) {
  const { products } = useContext(Context);

  const handleChange = ({ target: { value } }) => {
    setItem({ ...products, quantity: Number(value) });
  };

  return (
    <div key={ id } className="product">
      <h3
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        {formatCurrency(price)}
      </h3>
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        width="150px"
        height="150px"
        src={ img }
        alt={ name }
      />
      <h4
        data-testid={ `customer_products__element-card-title-${id}` }
      >
        {name}

      </h4>
      <section className="btn-products">
        <button
          onClick={ () => removeQuantity(id) }
          type="button"
          data-testid={ `customer_products__button-card-rm-item-${id}` }

        >
          -
        </button>
        <input
          data-testid={ `customer_products__input-card-quantity-${id}` }
          type="text"
          inputMode="numeric"
          placeholder="0"
          value={ qty }
          onChange={ handleChange }
        />
        <button
          onClick={ () => addQuantity({
            id, name, price, urlImage: img, quantity: 1 }) }
          type="button"
          data-testid={ `customer_products__button-card-add-item-${id}` }

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
  qtd: PropTypes.number,
}.isRequired;
