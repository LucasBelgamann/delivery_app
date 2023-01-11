import moment from 'moment/moment';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Context from '../../context/context';
import NavBar from '../../components/NavBar';
import apiLogin from '../../utils/api';

function OrdersId() {
  const { orders, setOrders, sellers } = useContext(Context);
  const { id } = useParams();
  const test1 = 'customer_order_details__';
  const tableHead = [
    'Item',
    'Descrição',
    'Quantidade',
    'Valor unitário',
    'Sub-total',
  ];

  const handleStatusChange = async (status) => {
    const update = await apiLogin.patch(`/sales/${id}`, { status });
    return update;
  };

  useEffect(() => {
    const getResponse = async () => {
      const { data } = await apiLogin.get(`/sales/${id}`);
      const newData = data.map((e) => e);
      setOrders(newData);
      console.log('orders', orders);
    };
    getResponse();
  }, []);

  return (
    <>
      <NavBar />
      <h1 className="title-details">Detalhe do Pedido</h1>
      <div className="container-details">
        {orders.map((e, i) => (
          <div key={ i } className="details-seller">
            {sellers.map((item, index) => (
              <p
                key={ index }
                data-testid={ `${test1}element-order-details-label-seller-name` }
              >
                {item.name}
              </p>
            ))}
            <h4 data-testid={ `${test1}element-order-details-label-order-id` }>
              {e.id}
            </h4>
            <h4 data-testid={ `${test1}element-order-details-label-order-date` }>
              {moment(e.sale_date).locale('pt-br').format('DD/MM/YYYY') }
            </h4>
            <h4
              data-testid={ `${test1}element-order-details-label-delivery-status` }
            >
              {e.status}
            </h4>
            <button
              type="button"
              className="entregue"
              onClick={ () => handleStatusChange('Entregue') }
              data-testid="customer_order_details__button-delivery-check"
              disabled={ e.status !== 'Em Trânsito' }
            >
              Entregue
            </button>
          </div>
        ))}
        <table>
          <thead>
            <tr>
              {tableHead.map((item, index) => (
                <th key={ index }>{item}</th>
              ))}
            </tr>
          </thead>
          {orders.map((e) => e.products.map((product, i) => (
            <tr key={ i }>
              <td data-testid={ `${test1}element-order-table-item-number-${i}` }>
                {i + 1}
              </td>
              <td data-testid={ `${test1}element-order-table-name-${i}` }>
                {product.name}
              </td>
              <td data-testid={ `${test1}element-order-table-quantity-${i}` }>
                {product.salesProducts.quantity}
              </td>
              <td>
                R$
                {' '}
                <span
                  data-testid={ `${test1}element-order-table-unit-price-${i}` }
                >
                  {product.price}
                </span>
              </td>
              <td>
                R$
                {' '}
                <span
                  data-testid={ `${test1}element-order-table-sub-total-${i}` }
                >
                  {(
                    parseFloat(product.salesProducts.quantity)
                  * parseFloat(product.price)
                  ).toFixed(2)}
                </span>
              </td>
            </tr>
          )))}
        </table>
        <div className="total-pedidotwo">
          <span data-testid="customer_order_details__element-order-total-price">
            TOTAL DO PEDIDO: R$
            {' '}
            {orders.map((product) => product.products
              .reduce(
                (acc, e) => Number(e.salesProducts.quantity) * Number(e.price) + acc,
                0,
              )
              .toFixed(2).replace(/\./, ','))}
          </span>
        </div>
      </div>
    </>
  );
}

export default OrdersId;
