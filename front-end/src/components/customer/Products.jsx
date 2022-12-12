import { useContext, useEffect } from 'react';
import apiLogin from '../../utils/api';
import { formatCurrency } from '../../utils/formatCurrency';
import Context from '../../context/context';
import NavProducts from '../navBar/NavProducts';

function Products() {
  const { products, setProducts } = useContext(Context);
  const get = async () => {
    const { data } = await apiLogin.get('/customer/products');
    console.log(data);
    setProducts(data);
  };
  useEffect(() => {
    get();
  }, []);

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
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
