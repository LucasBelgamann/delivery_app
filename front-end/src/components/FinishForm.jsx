import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Context from '../context/context';
import apiLogin from '../utils/api';
import { postData } from '../utils/requests';
import '../css/Input.css';
import image from '../images/motoboy.png';

export default function FinishForm() {
  const {
    setStorage,
    storage,
    setSellers,
    sellers,
    total,
  } = useContext(Context);
  const [ID, setId] = useState(2);

  useEffect(() => {
    const getId = async () => {
      const ids = await sellers.map(({ id }) => id)[0];
      setId(ids);
    };
    getId();
  }, []);

  const history = useHistory();
  const [postAddress, setAddress] = useState({
    seller_id: ID,
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
    setStorage([]);
    // alert('Compra realizada com sucesso');
    history.push(`/customer/orders/${sales.id}`);
  };

  useEffect(() => {
    const getResponse = async () => {
      const { data } = await apiLogin.get('/login/seller');
      setSellers(data);
    };
    getResponse();
  }, []);

  return (
    <div className="container-finishform">
      <div>
        <h3>Detalhes e endereço para entrega</h3>
        <div className="input-container">
          <select
            data-testid="customer_checkout__select-seller"
            name="sellers"
            id="sellers"
            className="text-input"
            onChange={ handleChange }
          >
            {sellers.map((seller) => (
              <option key={ seller.id }>{seller.name}</option>
            ))}
          </select>
          <label className="label" htmlFor="address">Sellers</label>
        </div>
        <div className="input-container">
          <input
            type="text"
            id="address"
            className="text-input"
            autoComplete="off"
            placeholder="Enter your address"
            onChange={ handleChange }
            required
          />
          <label className="label" htmlFor="address">Address</label>
        </div>
        <div className="input-container">
          <input
            type="text"
            id="number"
            className="text-input"
            autoComplete="off"
            placeholder="Enter your number"
            onChange={ handleChange }
            required
          />
          <label className="label" htmlFor="number">Number</label>
        </div>
        <button
          data-testid="customer_checkout__button-submit-order"
          type="button"
          className="finish-btn"
          onClick={ handlesubmit }
        >
          FINALIZAR PEDIDO
        </button>
      </div>
      <div>
        <a href="https://storyset.com/business">
          <img className="motoboy" src={ image } alt="motoboy" />
        </a>
      </div>
    </div>

  );
}
