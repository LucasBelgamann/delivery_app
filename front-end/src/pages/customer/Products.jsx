import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import apiLogin from '../../utils/api';
// import NewNav from '../../components/newNav';
import Context from '../../context/context';
import NewCard from '../../components/NewCard';
import NavBar from '../../components/NavBar';
import '../../css/product.css';

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
    setTotal(somaTotal.toFixed(2).replace('.', ','));
  }, [setTotal, storage]);

  return (
    <div>
      {/* <NewNav /> */}
      <NavBar />
      <div className="container-products">
        <NewCard />
        {/* <ProductCard /> */}
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
