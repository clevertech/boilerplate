import React from 'react';
import { Route, Switch } from 'react-router-dom';
import EnsureAuthenticated from '../EnsureAuthenticated';
import ConfirmEmail from './ConfirmEmail';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import LoginTwoFactor from './LoginTwoFactor';
import Register from './Register';
import ResetPassword from './ResetPassword';
import Settings from './Settings';

export default () => (
  <Switch>
    <Route path="/account/login" component={Login} />
    <Route path="/account/login-2fa" component={LoginTwoFactor} />
    <Route path="/account/register" component={Register} />
    <Route path="/account/forgot-password" component={ForgotPassword} />
    <Route path="/account/reset-password" component={ResetPassword} />
    <Route path="/account/confirm-email" component={ConfirmEmail} />
    <EnsureAuthenticated>
      <Route path="/account/settings" component={Settings} />
    </EnsureAuthenticated>
  </Switch>
);
