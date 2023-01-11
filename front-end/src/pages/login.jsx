import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SubmitBtn from '../components/submitBtn';
import '../css/login.css';

function Login() {
  const [loginInput, setLogin] = useState({
    email: '',
    password: '',
  });

  const [disabledBtn, setDisabledBtn] = useState(true);
  const history = useHistory();

  const handleChange = ({ target: { name, value } }) => {
    setLogin((oldState) => ({ ...oldState, [name]: value }));
    const tamMin = 5;
    const regex = /\w+@[a-z]+.com/g;
    if (loginInput.email.match(regex) && loginInput.password.length >= tamMin) {
      setDisabledBtn(false);
    } else {
      return setDisabledBtn(true);
    }
  };

  useEffect(() => {
    const login = localStorage.getItem('user');
    // const role = JSON.parse(login)?.role;
    const role = localStorage.getItem('role');
    console.log('role', role);

    if (!login || login === null) return history.replace('/login');

    if (login && role === 'customer') {
      return history.replace('/customer/products');
    }
    if (login && role === 'administrator') {
      return history.push('/admin/manage');
    }
    if (login && role === 'seller') {
      return history.push('/seller/orders');
    }
    return history.replace('/login');
  }, [history]);

  return (
    <section className="container-login">
      <h2 className="title-login">John Delivery</h2>
      <form className="form">
        <div className="input-container">
          <input
            type="text"
            value={ loginInput.email }
            onChange={ handleChange }
            id="Login"
            className="text-input"
            name="email"
            autoComplete="off"
            placeholder="Enter your email"
            required
          />
          <label className="label" htmlFor="Login">Email</label>
        </div>
        <div className="input-container">
          <input
            type="password"
            value={ loginInput.password }
            onChange={ handleChange }
            id="password"
            className="text-input"
            name="password"
            autoComplete="off"
            placeholder="Enter your password"
            required
          />
          <label className="label" htmlFor="Login">Password</label>
        </div>
        <div className="btns-container">
          <SubmitBtn
            dataTestid="common_login__button-login"
            routeSuffix="login"
            sendObject={ loginInput }
            navigation="/customer/products"
            btnName="LOGIN"
            disabledBtn={ disabledBtn }
          />
          <button
            type="submit"
            data-testid="common_login__button-register"
            className="btn-login"
            onClick={ () => history.push('/register') }
          >
            Cadastrar
          </button>
        </div>
      </form>
      <p data-testid="common_login__element-invalid-email" />
    </section>
  );
}

export default Login;
