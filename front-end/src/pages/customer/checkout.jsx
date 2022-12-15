import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../../components/navbar';
import Context from '../../context/context';
import apiLogin from '../../utils/api';
import { formatCurrency } from '../../utils/formatCurrency';
import { postData } from '../../utils/requests';

function Checkout() {
  const { setCartItems, qty, seller, setSeller, cartItems } = useContext(Context);
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
    products: cartItems.map((e) => ({
      product_id: e.id,
      quantity: e.quantity,
    })),
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
    get();
  }, []);

  const remove = (id) => {
    const itemRemove = cartItems.filter((e) => e.id !== id);
    console.log(itemRemove);
    setCartItems(itemRemove);
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
            {cartItems.map((e, index) => (
              <tr key={ index }>
                <td>{index + 1}</td>
                <td>{e.name}</td>
                <td>{e.quantity}</td>
                <td>{e.price}</td>
                <td>{formatCurrency(e.quantity * Number(e.price))}</td>
                <td>
                  <button
                    type="button"
                    key={ e.name }
                    onClick={ () => remove(e.id) }
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
        <button type="button" onClick={ submit }>
          Finalizar pedido
        </button>
      </div>
    </div>
  );
}

export default Checkout;
