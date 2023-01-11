import moment from 'moment';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/NavBar';
import Context from '../../context/context';
import apiLogin from '../../utils/api';

export default function Orders() {
  const { sellerSales, setSellerSales, setSellers } = useContext(Context);

  useEffect(() => {
    const getResponse = async () => {
      const { data } = await apiLogin.get('/sales');
      setSellerSales(data.filter((e) => e.seller_id));
    };
    getResponse();
  }, []);

  useEffect(() => {
    const getResponse = async () => {
      const { data } = await apiLogin.get('/login/seller');
      setSellers(data);
    };
    getResponse();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container-pedidos">
        {sellerSales.map((e, i) => (
          <Link to={ `/seller/orders/${e.id}` } key={ i }>
            <div className="pedidos">
              <h4 data-testid={ `seller_orders__element-order-id-${e.id}` }>
                {e.id}
              </h4>
              <h4
                data-testid={ `seller_orders__element-delivery-status-${e.id}` }
              >
                {e.status}
              </h4>
              <h4 data-testid={ `seller_orders__element-order-date-${e.id}` }>
                {moment(e.sale_date).locale('pt-br').format('DD/MM/YYYY') }
              </h4>
              <h4 data-testid={ `seller_orders__element-card-price-${e.id}` }>
                {e.total_price}
              </h4>
              <h6 data-testid={ `seller_orders__element-card-address-${e.id}` }>
                {`${e.delivery_address}, ${e.delivery_number}`}
              </h6>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
