import React from 'react';
import { Link } from 'react-router-dom';

function MeusPedidosBtn() {
  return (
    <Link
      data-testid="header__show_home_btn"
      to="/customer/products"
    >
      Meus Pedidos
    </Link>
  );
}

export default MeusPedidosBtn;
