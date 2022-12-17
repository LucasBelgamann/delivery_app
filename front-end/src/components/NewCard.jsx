import React, { useContext } from 'react';
import Context from '../context/context';

export default function NewCard() {
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
        <div key={ product.id } className="card">
          <div className="imgBx">
            <img
              data-testid={ `customer_products__img-card-bg-image-${product.id}` }
              src={ product.url_image }
              alt={ product.name }
            />
          </div>
          <div className="contentBx">
            <h3
              data-testid={ `customer_products__element-card-title-${product.id}` }
            >
              {product.name}
            </h3>
            <h2
              className="price"
              data-testid={ `customer_products__element-card-price-${product.id}` }
            >
              R$
              {' '}
              <span
                data-testid={ `customer_products__element-card-price-${product.id}` }
              >
                {product.price.replace(/\./, ',')}
              </span>
            </h2>
            <div className="buy">
              <button
                type="button"
                onClick={ () => removeQuantity(product.id) }
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
        </div>
      ))}
    </>

  );
}
