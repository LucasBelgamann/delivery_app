import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import apiLogin from '../../utils/api';
import Navbar from '../../components/navbar';
import CardP from '../../components/CardP';
import Context from '../../context/context';

function Products() {
  const { products, setProducts, cartItems, setCartItems } = useContext(Context);
  const history = useHistory();

  const setLocalStorage = (value) => {
    localStorage.setItem('carrinho', JSON.stringify(value));
    setCartItems(value);
  };

  // const getLocalStorage = () => {
  //   const local = localStorage.getItem('cart');
  //   setReslocal(JSON.parse(local));
  // };

  useEffect(() => {
    const getResponse = async () => {
      const { data } = await apiLogin.get('/customer/products');
      setProducts(data);
    };
    getResponse();
  }, []);

  const addQuantity = ({ id, name, price, urlImage, quantity }) => {
    const indexItem = cartItems.findIndex((item) => item.id === id);
    if (indexItem >= 0) {
      cartItems[indexItem].quantity += 1;
      setLocalStorage([...cartItems]);
    } else {
      setLocalStorage([...cartItems, { id, name, price, urlImage, quantity }]);
    }
  };

  const removeQuantity = (id) => {
    const indexItem = cartItems.findIndex((item) => item.id === id);
    if (indexItem >= 0 && cartItems[indexItem].quantity > 1) {
      cartItems[indexItem].quantity -= 1;
      setLocalStorage([...cartItems]);
    }
    if (indexItem >= 0) {
      cartItems.splice(indexItem, 1);
      setLocalStorage([...cartItems]);
    }
  };

  const setItem = ({ id, name, price, urlImage, quantity }) => {
    const indexItem = cartItems.findIndex((item) => item.id === id);
    if (indexItem >= 0 && quantity > 0) {
      cartItems[indexItem].quantity = quantity;
      setLocalStorage([...cartItems]);
    }
    if (indexItem >= 0 && quantity <= 0) {
      cartItems.splice(indexItem, 1);
      setLocalStorage([...cartItems]);
    }
    return setLocalStorage([...cartItems, { id, name, price, urlImage, quantity }]);
  };

  return (
    <>
      <Navbar />
      <div className="products-container">
        {
          products.map((product) => (
            <CardP
              key={ product.id }
              id={ product.id }
              price={ product.price }
              img={ product.url_image }
              name={ product.name }
              addQuantity={ addQuantity }
              removeQuantity={ removeQuantity }
              setItem={ setItem }
              qty={ cartItems.find((item) => item.id === product.id)?.quantity }
            />
          ))
        }
      </div>
      <button
        type="button"
        className="cart-total"
        onClick={ () => history.push('/customer/checkout') }
      >
        Ver carrinho:
        {' '}
        { cartItems.reduce((acc, i) => i.price * i.quantity + acc, 0).toFixed(2) }
        {' '}
        {' '}
      </button>
    </>
  );
}

export default Products;
