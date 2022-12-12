import { useContext, useEffect, useState } from 'react';
import apiLogin from '../../utils/api';
import { formatCurrency } from '../../utils/formatCurrency';
import Context from '../../context/context';
import NavProducts from '../navBar/NavProducts';

function Products() {
  const { products, setProducts } = useContext(Context);
  const [counter, setCounter] = useState([]);
  const get = async () => {
    const { data } = await apiLogin.get('/customer/products');
    setProducts(data);
  };
  useEffect(() => {
    get();
  }, []);

  useEffect(() => {
    console.log('eiiiii', counter);
  }, [counter]);

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

      console.log(item.quantity);

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity + 1,
      };

      console.log(newCartItems);
      return newCartItems;
    });
    console.log(value);
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
  };

  return (
    <div>
      <NavProducts />
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
            <div className="btn-moreLess" key={ product.name }>
              <button
                type="button"
                onClick={ () => handleDecrementCartItem(product) }
              >
                -
              </button>
              <spam>
                {' '}
                {counter.forEach((e) => (
                  <p>{e}</p>
                ))}

              </spam>
              <button
                type="button"
                onClick={ () => handleAddToCart(product) }
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
