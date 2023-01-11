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

  // const arrayImg = [
  //   {
  //     id: 1,
  //     url: 'https://giassi.vtexassets.com/arquivos/ids/541441/Cerveja-Pilsen-Skol-Lata-350ml.png?v=638053328959330000',
  //   },
  //   {
  //     id: 2,
  //     url: 'https://gbarbosa.vtexassets.com/arquivos/ids/174966/62853e8124d5d4e1f36b500e.png?v=637884962731900000',
  //   },
  //   {
  //     id: 3,
  //     url: 'https://s3-us-west-2.amazonaws.com/varejao.ip/7891991011105-cerveja-300ml-antarctica-retornavel.png',
  //   },
  //   {
  //     id: 4,
  //     url: 'https://choppbrahmaexpress.vtexassets.com/arquivos/ids/155796/brahma_-_600ml.png?v=637353454952430000',
  //   },
  //   {
  //     id: 5,
  //     url: 'https://static23.minhalojanouol.com.br/clgatacado/produto/20200410020112_7043992957_D.png',
  //   },
  //   {
  //     id: 6,
  //     url: 'https://lirp.cdn-website.com/67675e44/dms3rep/multi/opt/PRODUTOS+DESTAQUES+%281%29-400w.png',
  //   },
  //   {
  //     id: 7,
  //     url: 'https://choppbrahmaexpress.vtexassets.com/arquivos/ids/155589/70ca1861a6e7b5e4da6c69af29a970dc.png?v=637353454279370000',
  //   },
  //   {
  //     id: 8,
  //     url: 'https://www.supermercadosbh.com.br/wp-content/uploads/2020/10/Cerveja-Brama-Duplo-Malte-Lata-350ml.png',
  //   },
  //   {
  //     id: 9,
  //     url: 'https://magento.choppbrahmaexpress.com.br/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/b/e/becks_600ml.png',
  //   },
  //   {
  //     id: 10,
  //     url: 'https://supermercadosimperatriz.vteximg.com.br/arquivos/ids/157184-1000-1000/BEB-SKOL-269ML-BEATS-LT-SENSES.png?v=637734307910870000',
  //   },
  //   {
  //     id: 11,
  //     url: 'https://www.bernardaoemcasa.com.br/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/b/4/b46d07210453f80e27ad4714ed65980e.png',
  //   },
  // ];

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
