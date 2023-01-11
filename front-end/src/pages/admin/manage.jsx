import React, { useState, useEffect } from 'react';
import Navbar from '../../components/NavBar';
import SubmitBtnAdmin from '../../components/submitBtnAdmin';

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

function Manage() {
  const [loginInput, setLogin] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const [disabledBtn, setDisabledBtn] = useState(true);

  const handleChange = ({ target: { name, value } }) => {
    setLogin((oldState) => ({ ...oldState, [name]: value }));
  };

  useEffect(() => {
    const PASSMIN = 6;
    const NAMEMIN = 12;
    const regex = /\w+@[a-z]+.com/g;
    if (regex.test(loginInput.email)
      && loginInput.password.length >= PASSMIN
      && loginInput.name.length > NAMEMIN
      && loginInput.role !== '') {
      setDisabledBtn(false);
    } else {
      return setDisabledBtn(true);
    }
  }, [loginInput]);

  const roles = [{
    name: 'Escolha uma Opção',
    value: '',
  }, {
    name: 'Administrator',
    value: 'administrator',
  }, {
    name: 'Seller',
    value: 'seller',
  }, {
    name: 'Customer',
    value: 'customer',
  }];

  return (
    <section>
      <Navbar />
      <main style={ CSS.Section }>
        <form style={ CSS.Form }>
          <label htmlFor="name" style={ CSS.Label }>
            Nome:
            <input
              id="name"
              type="name"
              data-testid="admin_manage__input-name"
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
              data-testid="admin_manage__input-email"
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
              data-testid="admin_manage__input-password"
              value={ loginInput.password }
              onChange={ handleChange }
              name="password"
              placeholder=" ********"
              style={ CSS.Input }
            />
          </label>
          <label htmlFor="role" style={ CSS.Label }>
            Tipo:
            <select
              id="role"
              style={ CSS.Input }
              name="role"
              onChange={ handleChange }
              data-testid="admin_manage__select-role"
              value={ loginInput.role }
            >
              {roles.map((role) => (
                <option
                  key={ role.value }
                  value={ role.value }
                  data-testid={ `common_register__input-tipo-${role.value}` }
                >
                  { role.name }
                </option>
              ))}
            </select>
          </label>
          <SubmitBtnAdmin
            dataTestid="admin_manage__button-register"
            routeSuffix="register"
            sendObject={ loginInput }
            navigation="/admin/manage"
            btnName="CADASTRAR"
            disabledBtn={ disabledBtn }
          />
          <p data-testid="admin_manage__element-invalid-register" />
        </form>
      </main>
    </section>
  );
}

export default Manage;
