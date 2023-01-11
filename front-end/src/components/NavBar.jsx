import { useContext, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as GrIcons from 'react-icons/gr';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import Context from '../context/context';
import image from '../images/carrinho.jpg';
import '../css/NewNav.css';

function NavBar({ userType = 'customer' }) {
  const [sidebar, setSideBar] = useState(true);
  const { storage } = useContext(Context);
  const [value, ,] = useLocalStorage('user');
  const history = useHistory();

  const showSideBar = () => {
    setSideBar(!sidebar);
  };

  const logout = () => {
    localStorage.clear();
    history.push('/login');
  };

  const pedidosRedirect = () => {
    if (value.role === 'seller') {
      history.push('/seller/orders');
    }

    if (value.role === 'customer') {
      history.push('/customer/orders');
    }

    if (value.role === 'administrator') {
      history.push('/admin/manage');
    }
  };

  return (
    <div>
      <div className="navbar">
        <FaIcons.FaBars onClick={ showSideBar } className="menu-bars" />
        <p
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {`Olá, ${value.name}`}
        </p>
        <button
          className="cart"
          type="button"
          onClick={ () => history.push('/customer/checkout') }
          disabled={ storage.length === 0 }
        >
          <img width="27" height="25" src={ image } alt="carrinho" />
          {storage.length}
        </button>
      </div>
      <nav className={ sidebar ? 'nav-menu active' : 'nav-menu' }>
        <ul className="nav-menu-items">
          <li className="navbar-toggle">
            <GrIcons.GrClose onClick={ showSideBar } className="menu-bars" />
          </li>
          {
            userType === 'customer' && (
              <button
                className="btns-nav"
                type="button"
                data-testid="customer_products__element-navbar-link-products"
                onClick={ () => history.push('/customer/products') }

              >
                Proudutos
              </button>
            )
          }
          <button
            type="button"
            className="btns-nav"
            data-testid="customer_products__element-navbar-link-orders"
            onClick={ pedidosRedirect }

          >
            {
              value.role === 'administrator'
                ? 'Gerenciar usuários'
                : 'Meus pedidos'
            }
          </button>
          <button
            className="btns-nav"
            type="button"
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ logout }
          >
            Sair
          </button>
        </ul>
      </nav>
    </div>
  );
}

NavBar.propTypes = {
  userType: PropTypes.string,
}.isRequired;

export default NavBar;
