import { Link } from 'react-router-dom';

export const checkLS = (setLogin, setUserName, setRole) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const { name, role, token } = user;
  setLogin(!!token);
  setUserName(name);
  setRole(role);
};

export const roleUserPerson = (role) => {
  if (role === 'seller') {
    return (
      <Link
        to="/seller/orders"
      >
        Pedidos
      </Link>
    );
  } if (role === 'administrator') {
    return 'Gerenciar Usuários';
  }
  return null;
};
