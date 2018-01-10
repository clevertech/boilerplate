import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import App from './containers/App';
import Products from './containers/Products';
import Home from './containers/Home';
import Login from './containers/Login';
import Account from './containers/Account';
import EnsureAuthenticated from './containers/EnsureAuthenticated';

import NoMatch from './components/NoMatch';

import history from './history';

export default () => (
  <Router history={history}>
    <App>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} />
        <Route path="/products" component={Products} />
        <EnsureAuthenticated>
          <Route path="/account" component={Account} />
        </EnsureAuthenticated>
        <Route component={NoMatch} />
      </Switch>
    </App>
  </Router>
);
