import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SubmitBtn from '../components/submitBtn';

export const CSS = {
  Section: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
  },
  Form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30vw',
    height: '50vh',
    border: '1px solid #e1e1e6',
    borderRadius: '10px',
  },
  Label: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    maxWidth: '25vw',
    width: '100%',
    margin: '10px',
    fontSize: '1.5rem',
  },
  Input: {
    width: '70%',
    height: '3vh',
    borderRadius: '5px',
    border: 'none',
    outline: 'none',
    backgroundColor: '#1e1e1e',
    color: 'white',
    fontSize: '1.2rem',
  },
};

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
    <section style={ CSS.Section }>
      <form style={ CSS.Form }>
        <p>John Entrega!</p>
        <label htmlFor="email" style={ CSS.Label }>
          Login:
          <input
            type="email"
            data-testid="common_login__input-email"
            value={ loginInput.email }
            onChange={ handleChange }
            name="email"
            placeholder=" email"
            style={ CSS.Input }
          />
        </label>
        <label htmlFor="password" style={ CSS.Label }>
          Senha:
          <input
            type="password"
            data-testid="common_login__input-password"
            value={ loginInput.password }
            onChange={ handleChange }
            name="password"
            placeholder=" password"
            style={ CSS.Input }
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
    </section>
  );
}

export default Login;
