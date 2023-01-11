import React, { useContext } from 'react';
import Context from '../context/context';
import FinishForm from './FinishForm';

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

        {}
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
