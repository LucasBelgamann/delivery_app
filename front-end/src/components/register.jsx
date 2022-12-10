import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import apiLogin from '../utils/api';

function Register() {
  const [loginInput, setLogin] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [disabledBtn, setDisabledBtn] = useState(true);
  const history = useHistory();

  const handleChange = ({ target: { name, value } }) => {
    setLogin((oldState) => ({ ...oldState, [name]: value }));
    const PASSMIN = 5;
    const NAMEMIN = 12;
    const regex = /\w+@[a-z]+.com/g;
    if (loginInput.email.match(regex)
      && loginInput.password.length >= PASSMIN
      && loginInput.name.length >= NAMEMIN) {
      setDisabledBtn(false);
    } else {
      return setDisabledBtn(true);
    }
  };

  const handleSubmit = async () => {
    apiLogin.post('/register', loginInput).then(({ data }) => {
      history.push('/customer/products');
      return data;
    });
  };

  return (
    <div>
      <div>
        <form>
          <label htmlFor="name">
            Nome:
            <input
              id="name"
              type="name"
              data-testid="common_register__input-name"
              value={ loginInput.name }
              onChange={ handleChange }
              name="name"
              placeholder="seu nome"
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              id="email"
              type="email"
              data-testid="common_register__input-email"
              value={ loginInput.email }
              onChange={ handleChange }
              name="email"
              placeholder="seu-email@site.com.br"
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              id="password"
              type="password"
              data-testid="common_register__input-password"
              value={ loginInput.password }
              onChange={ handleChange }
              name="password"
              placeholder="********"
            />
          </label>
          <button
            type="button"
            data-testid="common_register__button-register"
            onClick={ handleSubmit }
            disabled={ disabledBtn }
          >
            CADASTRAR
          </button>
          <p data-testid="common_register__element-invalid_register" />
        </form>
      </div>
    </div>
  );
}

export default Register;
