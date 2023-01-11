import React, { useContext } from 'react';
import Context from '../context/context';
import FinishForm from './FinishForm';
import '../css/checkout.css';
import trash from '../images/trash.png';

export default function TableCheckout() {
  const { storage, setStorage } = useContext(Context);
  const test = 'customer_checkout__';
  const tableHead = [
    'Item',
    'Descrição',
    'Quantidade',
    'Valor unitário',
    'Sub-total',
    'Remover item',
  ];

  const removeQuantity = (id) => {
    const indexItem = storage.findIndex((item) => item.id === id);
    storage.splice(indexItem, 1);
    return setStorage([...storage]);
  };

  return (
    <div className="container-pai-Cus">
      <p>Finalizar Pedido</p>
      <div className="container-table-Cus">
        <table>
          <thead>
            <tr>
              {tableHead.map((item, index) => (
                <th key={ index }>{item}</th>
              ))}
            </tr>
          </thead>
          {storage.map((e, i) => (
            <tr key={ e.id }>
              <td
                className="inicial-table"
                data-testid={ `${test}element-order-table-item-number-${i}` }
              >
                {i + 1}
              </td>
              <td data-testid={ `${test}element-order-table-name-${i}` }>
                {e.name}
              </td>
              <td data-testid={ `${test}element-order-table-quantity-${i}` }>
                {e.quantity}
              </td>
              <td>
                R$
                {' '}
                <span
                  data-testid={ `${test}element-order-table-unit-price-${i}` }
                >
                  {e.price.replace(/\./, ',')}
                </span>
              </td>
              <td>
                R$
                {' '}
                <span data-testid={ `${test}element-order-table-sub-total-${i}` }>
                  {(e.price * e.quantity).toFixed(2).replace(/\./, ',')}
                </span>
              </td>
              <td>
                <button
                  className="btn-remove"
                  onClick={ () => removeQuantity(e.id) }
                  data-testid={ `${test}element-order-table-remove-${i}` }
                  type="button"
                >
                  <img width="25" height="25" src={ trash } alt="Remove" />
                </button>
              </td>
            </tr>
          ))}
        </table>
        <div className="total-pedido">
          <span
            data-testid="customer_checkout__element-order-total-price"
          >
            TOTAL DO PEDIDO R$
            {' '}
            {storage
              .reduce((acc, c) => c.price * c.quantity + acc, 0)
              .toFixed(2)
              .replace(/\./, ',')}
          </span>
        </div>
      </div>
      <FinishForm />
    </div>
  );
}
