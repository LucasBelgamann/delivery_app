import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import apiLogin from '../../utils/api';
import Navbar from '../../components/navbar';
import CardP from '../../components/CardP';
import Context from '../../context/context';
import { formatCurrency } from '../../utils/formatCurrency';

function Products() {
  const { products, setProducts, cartItems, setCartItems } = useContext(Context);
  // const [isDisable, setIsDisable] = useState(true);
  const history = useHistory();

  const setLocalStorage = (value) => {
    localStorage.setItem('carrinho', JSON.stringify(value));
    setCartItems(value);
  };

  useEffect(() => {
    const getResponse = async () => {
      const { data } = await apiLogin.get('/customer/products');
      setProducts(data);
    };
    getResponse();
  }, [setProducts]);

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

  const setQuantityWithInput = ({
    id,
    name,
    price,
    url_image: urlImage,
    quantity,
  }) => {
    console.log('{ id, name, price, urlImage, quantity }', {
      id,
      name,
      price,
      urlImage,
      quantity,
    });
    console.log('quantity', quantity);
    const indexItem = cartItems.findIndex((item) => item.id === id);
    console.log('indexItem', indexItem);
    if (indexItem >= 0 && quantity > 0) {
      cartItems[indexItem].quantity = quantity;
      console.log('setCartItemsPRIMEIRO', cartItems[indexItem].quantity);
      setLocalStorage([...cartItems]);
    }
    if (indexItem >= 0 && quantity <= 0) {
      cartItems.splice(indexItem, 1);
      console.log('setCartItemsSEGUNDO', cartItems);
      setLocalStorage([...cartItems]);
    }
    return setLocalStorage([
      ...cartItems,
      { id, name, price, urlImage, quantity },
    ]);
  };

  const quantity = (product) => {
    const item = cartItems.find((e) => e.id === product);
    return item?.quantity;
  };

  return (
    <>
      <Navbar />
      <div className="products-container">
        {products.map(({ id, name, price, url_image: img }) => (
          <CardP
            key={ id }
            objProducts={ {
              id,
              name,
              price,
              img,
            } }
            addQuantity={ addQuantity }
            removeQuantity={ removeQuantity }
            setQuantityWithInput={ setQuantityWithInput }
            qty={ quantity(id) }
          />
        ))}
      </div>
      <button
        type="button"
        className="cart-total"
        data-testid="customer_products__button-cart"
        onClick={ () => history.push('/customer/checkout') }
        disabled={ cartItems.length === 0 }
      >
        <p data-testid="customer_products__checkout-bottom-value">
          Ver carrinho:
          {' '}
          {formatCurrency(
            cartItems
              .reduce((acc, i) => i.price * i.quantity + acc, 0)
              .toFixed(2),
          )}
          {' '}
        </p>
      </button>
    </>
  );
}

export default Products;
