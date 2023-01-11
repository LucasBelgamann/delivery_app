import { useState } from 'react';
import SubmitBtn from '../components/submitBtn';

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
    <section className="container-login">
      <h2 className="title-register">John Delivery</h2>
      <form className="form">
        <div className="input-container">
          <input
            id="name"
            type="name"
            data-testid="common_register__input-name"
            className="text-input"
            value={ loginInput.name }
            onChange={ handleChange }
            name="name"
            autoComplete="off"
            placeholder=" seu nome"
          />
          <label htmlFor="name" className="label">Nome</label>
        </div>
        <div className="input-container">
          <input
            id="email"
            type="email"
            data-testid="common_register__input-email"
            className="text-input"
            value={ loginInput.email }
            autoComplete="off"
            onChange={ handleChange }
            name="email"
            placeholder=" seu-email@site.com.br"
          />
          <label htmlFor="email" className="label">Email</label>
        </div>
        <div className="input-container">
          <input
            id="password"
            type="password"
            data-testid="common_register__input-password"
            className="text-input"
            value={ loginInput.password }
            onChange={ handleChange }
            name="password"
            placeholder=" ********"
          />
          <label htmlFor="password" className="label">Senha</label>
        </div>
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
