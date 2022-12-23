import { useState } from 'react';
import SubmitBtn from '../components/submitBtn';
import { CSS } from './login';

function Register() {
  const [loginInput, setLogin] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });

  const [disabledBtn, setDisabledBtn] = useState(true);

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

  return (
    <section style={ CSS.Section }>
      <form style={ CSS.Form }>
        <label htmlFor="name" style={ CSS.Label }>
          Nome:
          <input
            id="name"
            type="name"
            data-testid="common_register__input-name"
            value={ loginInput.name }
            onChange={ handleChange }
            name="name"
            placeholder=" seu nome"
            style={ CSS.Input }
          />
        </label>
        <label htmlFor="email" style={ CSS.Label }>
          Email:
          <input
            id="email"
            type="email"
            data-testid="common_register__input-email"
            value={ loginInput.email }
            onChange={ handleChange }
            name="email"
            placeholder=" seu-email@site.com.br"
            style={ CSS.Input }
          />
        </label>
        <label htmlFor="password" style={ CSS.Label }>
          Senha:
          <input
            id="password"
            type="password"
            data-testid="common_register__input-password"
            value={ loginInput.password }
            onChange={ handleChange }
            name="password"
            placeholder=" ********"
            style={ CSS.Input }
          />
        </label>
        <SubmitBtn
          dataTestid="common_register__button-register"
          routeSuffix="register"
          sendObject={ loginInput }
          navigation="/customer/products"
          btnName="CADASTRAR"
          disabledBtn={ disabledBtn }
        />
        <p data-testid="common_register__element-invalid_register" />
      </form>
    </section>
  );
}

export default Register;
