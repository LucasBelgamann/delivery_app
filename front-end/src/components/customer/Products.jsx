import { useContext, useEffect } from 'react';
import apiLogin from '../../utils/api';
import { formatCurrency } from '../../utils/formatCurrency';
import Context from '../../context/context';

function Products() {
  const { products, setProducts, counter, setCounter, qty, setQty } = useContext(Context);

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
    console.log(qty);
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
    console.log(counter);
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
    console.log(counter);
  };

  return (
    <div>
      <div className="products-container">
        {products.map((product) => (
          <div key={ product.id } className="product">
            <h6>{formatCurrency(product.price)}</h6>
            <img
              src={ product.url_image }
              alt={ product.name }
              width="150px"
              height="150px"
            />
            <h4>{product.name}</h4>
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
      <button type="button">
        Ver carrinho:
        {' '}
        {qty.toFixed(2)}
        {' '}
      </button>
    </div>
  );
}

export default Products;
