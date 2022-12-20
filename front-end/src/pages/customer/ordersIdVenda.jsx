import moment from 'moment';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar';
import Context from '../../context/context';
import apiLogin from '../../utils/api';

function OrdersIdVenda() {
  const { pedidos, setPedidos } = useContext(Context);

  useEffect(() => {
    const getResponse = async () => {
      const name = localStorage.getItem('name');
      console.log(name);
      const { data } = await apiLogin.get('/sales');
      setPedidos(data.filter((e) => e.user.name === name));
    };
    getResponse();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container-pedidos">
        {pedidos.map((e, i) => (
          <Link key={ i } to={ `/customer/orders/${e.id}` }>
            <div className="pedidos">
              <h4 data-testid={ `customer_orders__element-order-id-${e.id}` }>
                {e.id}
              </h4>
              <h4
                data-testid={ `customer_orders__element-delivery-status-${e.id}` }
              >
                {e.status}
              </h4>
              <h4 data-testid={ `customer_orders__element-order-date-${e.id}` }>
                {moment(e.sale_date).locale('pt-br').format('DD/MM/YYYY') }
              </h4>
              <h4 data-testid={ `customer_orders__element-card-price-${e.id}` }>
                {e.total_price.replace(/\./, ',')}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default OrdersIdVenda;
