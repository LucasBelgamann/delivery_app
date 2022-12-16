import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Context from '../context/context';
import apiLogin from '../utils/api';
import { postData } from '../utils/requests';

export default function FinishForm() {
  const { storage, setSellers, sellers, total } = useContext(Context);
  const history = useHistory();
  const [postAddress, setAddress] = useState({
    seller_id: 1,
    total_price: total.replace(',', '.'),
    delivery_number: '',
    delivery_address: '',
    products: storage.map((e) => ({
      product_id: e.id,
      quantity: e.quantity,
    })),
  });

  const handleChange = ({ target: { name, value } }) => {
    setAddress((oldState) => ({ ...oldState, [name]: value }));
  };

  const handlesubmit = async () => {
    const { sales } = await postData('sales', postAddress);
    history.push(`/customer/orders/${sales}`);
  };

  useEffect(() => {
    const getResponse = async () => {
      const { data } = await apiLogin.get('/login/seller');
      setSellers(data);
    };
    getResponse();
  }, []);

  return (
    <div>
      <label htmlFor="sellers">
        P. Vendedora Responsável:
        <select
          data-testid="customer_checkout__select-seller"
          name="sellers"
          id="sellers"
          onChange={ handleChange }
        >
          {
            sellers.map((seller) => (
              <option
                key={ seller.id }
              >
                {seller.name}
              </option>
            ))
          }
        </select>
      </label>
      <label htmlFor="address">
        Endereço:
        <input
          data-testid="customer_checkout__input-address"
          type="text"
          id="address"
          name="delivery_address"
          placeholder="Digite o seu endereço"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="delivery_number">
        Número:
        <input
          data-testid="customer_checkout__input-address-number"
          type="number"
          id="delivery_number"
          min="0"
          placeholder="Digite o seu número "
          name="delivery_number"
          onChange={ handleChange }
        />
      </label>
      <button
        data-testid="customer_checkout__button-submit-order"
        type="button"
        onClick={ handlesubmit }
      >
        FINALIZAR PEDIDO
      </button>
    </div>
  );
}
