import moment from 'moment/moment';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar';
import Context from '../../context/context';
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

  const handlePrepararPedido = async () => {
    const update = await apiLogin.patch(`/sales/${id}`, { status: 'Preparando' });
    window.location.reload();
    return update;
  };

  const handleSaiuEntregar = async () => {
    const update = await apiLogin.patch(`/sales/${id}`, { status: 'Em Trânsito' });
    window.location.reload();
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
      <Navbar />
      <h1>Detalhe do Pedido</h1>
      {sellers.map((e, i) => (
        <p
          key={ i }
          data-testid={ `${test1}element-order-details-label-seller-name` }
        >
          {e.name}
        </p>
      ))}
      {orders.map((e, i) => (
        <div key={ i }>
          <h4 data-testid={ `${test1}element-order-details-label-order-id` }>
            {e.id}
          </h4>
          <h4 data-testid={ `${test1}element-order-details-label-order-date` }>
            {/* {moment().subtract(dez, 'days').calendar()} */}
            {moment().format('DD/MM/YYYY')}
          </h4>
          <h4
            data-testid={ `${test1}element-order-details-label-delivery-status` }
          >
            {e.status}
          </h4>
          <button
            type="button"
            onClick={ handlePrepararPedido }
            data-testid="customer_order_details__button-delivery-check"
            disabled={ e.status === 'Entregue' }
          >
            Preparar pedido
          </button>
          <button
            type="button"
            onClick={ handleSaiuEntregar }
            data-testid="customer_order_details__button-delivery-check"
            disabled={ e.status === 'Entregue' }
          >
            Saiu para a entrega
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
      <p>
        TOTAL DO PEDIDO R$
        {' '}
        <span data-testid="customer_order_details__element-order-total-price">
          {orders.map((product) => product.products
            .reduce(
              (acc, e) => Number(e.salesProducts.quantity) * Number(e.price) + acc,
              0,
            )
            .toFixed(2).replace(/\./, ','))}
        </span>
      </p>
    </>
  );
}

export default OrdersId;
