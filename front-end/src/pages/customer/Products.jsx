import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import apiLogin from '../../utils/api';
import NavBar from '../../components/navbar';
import ProductCard from '../../components/ProductCard';
import Context from '../../context/context';

export default function Products() {
  const {
    storage,
    setProducts,
    total,
    setTotal,
  } = useContext(Context);

  const history = useHistory();

  useEffect(() => {
    const getResponse = async () => {
      const { data } = await apiLogin.get('/customer/products');
      setProducts(data);
    };
    getResponse();
  }, []);

  useEffect(() => {
    const somaTotal = storage.reduce((acc, c) => c.price * c.quantity + acc, 0);
    console.log('somaTotal', somaTotal);
    setTotal(somaTotal.toFixed(2).replace('.', ','));
    console.log('total', total);
  }, [setTotal, storage]);

  return (
    <div>
      <NavBar />
      <div className="container-products">
        <ProductCard />
      </div>
      <div>
        <button
          type="button"
          data-testid="customer_products__button-cart"
          onClick={ () => history.push('/customer/checkout') }
          disabled={ storage.length === 0 }
          className="cart-total"
        >
          Ver Carrinho:
          <span>
            R$
            {' '}
            <span
              data-testid="customer_products__checkout-bottom-value"
            >
              {
                total
              }
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
