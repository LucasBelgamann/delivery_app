import React, { useContext } from 'react';
import Context from '../context/context';

export default function ProductCard() {
  const {
    products,
    addQuantity,
    removeQuantity,
    storage,
    setQuantityWithInput,
  } = useContext(Context);

  const handleInputChange = (product, value) => {
    setQuantityWithInput({ ...product, quantity: Number(value),
    });
    window.location.reload();
  };

  const productU = (pr) => {
    if (pr?.quantity === 0 || !pr?.quantity) {
      return 0;
    }
    if (pr?.quantity > 0) {
      return pr?.quantity;
    }
    return null;
  };

  return (
    <>
      {products.map((product) => (

        <div key={ product.id } className="product">
          <h2 className="price-product">
            R$
            {' '}
            <span
              data-testid={ `customer_products__element-card-price-${product.id}` }
            >
              {product.price.replace(/\./, ',')}
            </span>
          </h2>
          <img
            width="100px"
            height="100px"
            data-testid={ `customer_products__img-card-bg-image-${product.id}` }
            src={ product.url_image }
            alt={ product.name }
          />
          <h3
            data-testid={ `customer_products__element-card-title-${product.id}` }
            style={ { color: 'black' } }
          >
            {product.name}

          </h3>
          <div>
            <button
              onClick={ () => removeQuantity(product.id) }
              type="button"
              data-testid={ `customer_products__button-card-rm-item-${product.id}` }
            >
              -

            </button>
            <input
              data-testid={ `customer_products__input-card-quantity-${product.id}` }
              type="text"
              inputMode="numeric"
              placeholder="0"
              value={ productU(storage.find(({ name }) => name === product.name)) }
              onChange={ ({ target: { value } }) => handleInputChange(product, value) }
            />
            <button
              onClick={ () => addQuantity({ ...product, quantity: 1 }) }
              type="button"
              data-testid={ `customer_products__button-card-add-item-${product.id}` }
            >
              +

            </button>
          </div>
        </div>
      ))}
    </>

  );
}
