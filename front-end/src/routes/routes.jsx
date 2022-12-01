import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../components/login';

function Routes() {
  return (
    <div>
      <Switch>
        <Route exact patch="/" component={ Login } />
        <Route exact patch="/login" component={ Login } />
      </Switch>
    </div>
  );
}

export default Routes;
