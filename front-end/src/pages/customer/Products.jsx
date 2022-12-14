import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import apiLogin from '../../utils/api';
import { formatCurrency } from '../../utils/formatCurrency';
import Context from '../../context/context';
import Navbar from '../../components/navbar';

function Products() {
  const { products, setProducts, counter, setCounter, qty, setQty } = useContext(Context);
  const [input, setInput] = useState('');
  console.log('input', input);
  const history = useHistory();

  const getStorage = () => {
    const save = counter.map(({ quantity, value }) => ({ quantity, value }));
    localStorage.setItem('carrinho', JSON.stringify(save));
  };

  const get = async () => {
    const { data } = await apiLogin.get('/customer/products');
    setProducts(data);
  };

  const handleChange = ({ target: { name, value } }) => {
    setInput((oldState) => ({ ...oldState, [name]: value }));
    getStorage();
  };

  useEffect(() => {
    get();
  }, []);

  useEffect(() => {
    console.log('counter', counter);
    const total = input ? counter.reduce(
      (acc, { value }) => acc + Number(input) * Number(value.price),
      0,
    ) : counter.reduce(
      (acc, { quantity, value }) => acc + quantity * Number(value.price),
      0,
    );
    setQty(total);
    getStorage();
    const saveStorage = localStorage.getItem('carrinho');
    JSON.parse(saveStorage || '[]');
  }, [counter, qty]);

  const handleAddToCart = (value) => {
    setCounter((prevState) => {
      const itemIndex = prevState.findIndex(
        (counterr) => counterr.value.id === value.id,
      );

      if (itemIndex < 0) {
        return prevState.concat({
          quantity: 1,
          value,
        });
      }

      const newCartItems = [...prevState];
      const item = newCartItems[itemIndex];

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity + 1,
      };
      return newCartItems;
    });
  };

  const handleDecrementCartItem = (value) => {
    if (counter.length) {
      setCounter((prevState) => {
        const itemIndex = prevState.findIndex(
          (counterr) => counterr.value.id === value.id,
        );
        const item = prevState[itemIndex];
        const newCartItems = [...prevState];

        if (item.quantity === 0) {
          newCartItems.splice(itemIndex, 1);

          return newCartItems;
        }

        newCartItems[itemIndex] = {
          ...item,
          quantity: item.quantity - 1,
        };

        console.log('newCartItems', newCartItems);
        return newCartItems;
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="products-container">
        {products.map((product) => (
          <div key={ product.id } className="product">
            <h6
              data-testid={ `customer_products__element-card-price-${product.id}` }
            >
              {formatCurrency(product.price)}
            </h6>
            <img
              data-testid={ `customer_products__img-card-bg-image-${product.id}` }
              src={ product.url_image }
              alt={ product.name }
              width="150px"
              height="150px"
            />
            <h4
              data-testid={ `customer_products__element-card-title-${product.id}` }
            >
              {product.name}
            </h4>
            <div className="btn-moreLess">
              <button
                type="button"
                onClick={ () => handleDecrementCartItem(product) }
                data-testid={ `customer_products__button-card-rm-item-${product.id}` }
              >
                -
              </button>
              {/* {counter.length === 0 && (
                <input
                  data-testid={ `customer_products__input-card-quantity-${product.id}` }
                  type="text"
                  placeholder="0"
                />
              )} */}
              {counter.map(
                ({ quantity, value }) => value.name === product.name && (
                  <input
                    key={ product.name }
                    type="number"
                    data-testid={ `customer_products__input-card-quantity-${product.id}` }
                    value={ quantity }
                    onChange={ handleChange }
                    name="input"
                    // {/* {quantity} */ }
                  />
                ),
              )}
              <button
                type="button"
                onClick={ () => handleAddToCart(product) }
                data-testid={ `customer_products__button-card-add-item-${product.id}` }
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="cart-total"
        data-testid="customer_products__button-cart"
        onClick={ () => history.push('/customer/checkout') }
      >
        Ver carrinho:
        {' '}
        <p data-testid="customer_products__checkout-bottom-value">
          {qty.toFixed(2)}
        </p>
        {' '}
      </button>
    </div>
  );
}

export default Products;
