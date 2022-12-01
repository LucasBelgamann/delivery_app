import { useState } from 'react';
import apiLogin from '../utils/api';

function Login() {
  const [loginInput, setLogin] = useState({
    email: '',
    password: '',
  });
  const [disabledBtn, setDisabledBtn] = useState(true);

  const handleChange = ({ target: { name, value } }) => {
    setLogin((oldState) => ({ ...oldState, [name]: value }));
    const tamMin = 6;
    const regex = /\w+@[a-z]+.com/g;
    if (loginInput.email.match(regex) && loginInput.password.length >= tamMin) {
      setDisabledBtn(false);
    } else {
      return setDisabledBtn(true);
    }
  };

  const handleSubmit = async ({ event }) => {
    event.preventDefault();
    await apiLogin(loginInput);
  };

  return (
    <div>
      <div>
        <form>
          <input
            type="email"
            data-testid="common_login__input-email"
            value={ loginInput.email }
            onChange={ handleChange }
            name="email"
          />
          <input
            type="password"
            data-testid="common_login__input-password"
            value={ loginInput.password }
            onChange={ handleChange }
            name="password"
          />
          <button
            type="submit"
            data-testid="common_login__button-login"
            onSubmit={ handleSubmit }
            disabled={ disabledBtn }
          >
            Login
          </button>
          <button type="submit" data-testid="common_login__button-register">
            Ainda não tem conta
          </button>
          <p data-testid="common_login__element-invalid-email" />
        </form>
      </div>
    </div>
  );
}

export default Login;
