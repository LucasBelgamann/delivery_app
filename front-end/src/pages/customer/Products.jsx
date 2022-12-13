import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import apiLogin from '../../utils/api';
import { formatCurrency } from '../../utils/formatCurrency';
import Context from '../../context/context';
import Navbar from '../../components/navbar';

function Products() {
  const { products, setProducts, counter, setCounter, qty, setQty } = useContext(Context);
  const history = useHistory();

  const get = async () => {
    const { data } = await apiLogin.get('/customer/products');
    setProducts(data);
  };

  useEffect(() => {
    get();
  }, []);

  useEffect(() => {
    console.log('eiiiii', counter);
    const total = counter.reduce(
      (acc, { quantity, value }) => acc + quantity * Number(value.price),
      0,
    );
    setQty(total);
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

        if (item.quantity === 1) {
          newCartItems.splice(itemIndex, 1);

          return newCartItems;
        }

        newCartItems[itemIndex] = {
          ...item,
          quantity: item.quantity - 1,
        };

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
              data-testid={ ` customer_products__element-card-title-${product.id}` }
            >
              {product.name}
            </h4>
            <div className="btn-moreLess">
              <button
                type="button"
                onClick={ () => handleDecrementCartItem(product) }
              >
                -
              </button>
              {counter.map(
                ({ quantity, value }) => value.name === product.name && (
                  <p key={ product.name }>{quantity}</p>
                ),
              )}
              <button type="button" onClick={ () => handleAddToCart(product) }>
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="cart-total"
        onClick={ () => history.push('/customer/checkout') }
      >
        Ver carrinho:
        {' '}
        {qty.toFixed(2)}
        {' '}
      </button>
    </div>
  );
}

export default Products;
