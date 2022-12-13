import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { checkLS, roleUserPerson } from '../utils/generateNavBar';
import MeusPedidosBtn from './meusPedidosBtn';

function Header() {
  const [logged, setLogin] = useState(false);
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    checkLS(setLogin, setUserName, setRole);
  }, [logged, setLogin, setUserName, setRole]);

  const navigate = useHistory();

  const logoff = () => {
    localStorage.clear();
    setLogin(false);
    navigate.push('/login');
  };

  return (
    <header className="common-header">
      <h1
        data-testid="customer_products__element-navbar-link-products"
      >
        { roleUserPerson(role) }
      </h1>
      { roleUserPerson(role) === null
        ? <MeusPedidosBtn />
        : null}
      <p data-testid="customer_products__element-navbar-user-full-name">
        { userName }
      </p>
      {
        (logged)
          ? (
            <button
              type="button"
              onClick={ () => logoff() }
              data-testid="customer_products__element-navbar-link-logout"
            >
              Sair
            </button>
          )
          : null
      }
    </header>
  );
}

Header.defaultProps = {
  logged: undefined,
  setLogin: undefined,
};

export default Header;
