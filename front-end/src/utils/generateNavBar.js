export const checkLS = (setLogin, setUserName, setRole) => {
  const token = localStorage.getItem('token');
  const name = localStorage.getItem('name');
  const roleUser = localStorage.getItem('role');
  setLogin(!!token);
  setUserName(name);
  setRole(roleUser);
};

export const roleUserPerson = (role) => {
  if (role === 'seller') {
    return 'Pedidos';
  } if (role === 'administrator') {
    return 'Gerenciar Usuários';
  }
  return null;
};
