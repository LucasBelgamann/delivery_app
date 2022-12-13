import React from 'react';
import { Link } from 'react-router-dom';

function MeusPedidosBtn() {
  return (
    <Link
      data-testid="customer_products__element-navbar-link-orders"
      to="/customer/products"
    >
      Meus Pedidos
    </Link>
  );
}

export default MeusPedidosBtn;
