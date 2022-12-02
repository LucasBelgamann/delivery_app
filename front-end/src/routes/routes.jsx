import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from '../components/login';

function Routes() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact patch="/login" component={ Login } />
      </Switch>
    </div>
  );
}

export default Routes;
