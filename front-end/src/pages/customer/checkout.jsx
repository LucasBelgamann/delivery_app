import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../../components/navbar';
import Context from '../../context/context';
import apiLogin from '../../utils/api';
import { formatCurrency } from '../../utils/formatCurrency';
import { postData } from '../../utils/requests';

function Checkout() {
  const { counter, setCounter, qty, seller, setSeller } = useContext(Context);
  const history = useHistory();
  const tableHead = [
    'Item',
    'Descrição',
    'Quantidade',
    'Valor unitário',
    'Sub-total',
    'Remover item',
  ];

  const [postAdress, setAdress] = useState({
    seller_id: 1,
    total_price: qty,
    delivery_number: '',
    delivery_address: '',
    products: counter.map(({ value, quantity }) => ({ product_id: value.id, quantity })),
  });

  const handleChange = ({ target: { name, value } }) => {
    setAdress((oldState) => ({ ...oldState, [name]: value }));
  };

  const submit = () => {
    postData('sales', postAdress);
    alert('Compra realizada com sucesso');
    history.push('/customer/orders/:id');
  };

  const get = async () => {
    const { data } = await apiLogin.get('/login/seller');
    console.log(data);
    setSeller(data);
  };

  useEffect(() => {
    console.log(get());
    console.log(seller.id);
  }, []);

  const remove = (id) => {
    const aiii = counter.filter(({ value }) => value.id !== id);
    console.log(aiii);
    setCounter(aiii);
  };

  return (
    <div className="checkout">
      <Navbar />
      <div>
        <h2>Finalizar pedido</h2>
        <table className="table">
          <thead>
            <tr>
              {tableHead.map((item, index) => (
                <th key={ index }>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {counter.map(({ quantity, value }, index) => (
              <tr key={ index }>
                <td>{index + 1}</td>
                <td>{value.name}</td>
                <td>{quantity}</td>
                <td>{value.price}</td>
                <td>{formatCurrency(quantity * Number(value.price))}</td>
                <td>
                  <button
                    type="button"
                    key={ value.name }
                    onClick={ () => remove(value.id) }
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>{formatCurrency(qty)}</p>
      </div>
      <div>
        <h2>Detalhes e endereço da entrega</h2>
        <label htmlFor="sellers">
          <select id="sellers" onChange={ handleChange } name="sellers">
            <option value="value1">{seller.map((e) => e.name)}</option>
          </select>
        </label>
        <label htmlFor="adress">
          <input
            type="text"
            name="delivery_address"
            id="adress"
            placeholder="Digite o seu endereço"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="number">
          <input
            type="number"
            name="delivery_number"
            id="number"
            placeholder="Digite o seu numero"
            onChange={ handleChange }
          />
        </label>
        <button type="button" onClick={ submit }>Finalizar pedido</button>
      </div>
    </div>
  );
}

export default Checkout;
