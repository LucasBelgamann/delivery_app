import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SubmitBtn from '../components/submitBtn';

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

  return (
    <div>
      <div>
        <form>
          <p>John Entrega!</p>
          <label htmlFor="email">
            Login:
            <input
              type="email"
              data-testid="common_login__input-email"
              value={ loginInput.email }
              onChange={ handleChange }
              name="email"
              placeholder="email"
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              type="password"
              data-testid="common_login__input-password"
              value={ loginInput.password }
              onChange={ handleChange }
              name="password"
              placeholder="password"
            />
          </label>
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
            onClick={ () => history.push('/register') }
          >
            Ainda não tenho conta
          </button>
          <p data-testid="common_login__element-invalid-email" />
        </form>
      </div>
    </div>
  );
}

export default Login;
