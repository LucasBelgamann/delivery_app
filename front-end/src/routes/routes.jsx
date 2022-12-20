import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from '../pages/login';
import Register from '../pages/register';
import CustomProducts from '../pages/customer/Products';
import CustomCheckout from '../pages/customer/checkout';
import CustomOrdersId from '../pages/customer/ordersId';
import CustomOrdersIdVenda from '../pages/customer/ordersIdVenda';
import SellOrders from '../pages/seller/orders';
import SellOrdersId from '../pages/seller/ordersId';
import AdminManage from '../pages/admin/manage';

function Routes() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
        <Route exact path="/customer/products" component={ CustomProducts } />
        <Route exact path="/customer/checkout" component={ CustomCheckout } />
        <Route
          exact
          path="/customer/orders"
          component={ CustomOrdersIdVenda }
        />
        <Route exact path="/customer/orders/:id" component={ CustomOrdersId } />
        <Route exact path="/seller/orders" component={ SellOrders } />
        <Route exact path="/seller/orders/:id" component={ SellOrdersId } />
        <Route path="/admin/manage" component={ AdminManage } />
      </Switch>
    </div>
  );
}

export default Routes;
