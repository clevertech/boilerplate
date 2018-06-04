import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { actions } from '../../redux/modules/account';
import ChangePassword from './settings/ChangePassword';
import ConfigureTwoFactor from './settings/ConfigureTwoFactor';
import ConfigureTwoFactorApp from './settings/ConfigureTwoFactorApp';
import ConfigureTwoFactorSMS from './settings/ConfigureTwoFactorSMS';
import Profile from './settings/Profile';

const propTypes = {
  getAccount: PropTypes.func.isRequired
};

class Settings extends Component {
  componentDidMount() {
    this.props.getAccount();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <div className="list-group">
              <NavLink
                to="/account/settings"
                className="list-group-item list-group-item-action"
                activeClassName="active"
                exact
              >
                Profile
              </NavLink>
              <NavLink
                to="/account/settings/change-password"
                className="list-group-item list-group-item-action"
                activeClassName="active"
              >
                Change password
              </NavLink>
              <NavLink
                to="/account/settings/2fa"
                className="list-group-item list-group-item-action"
                activeClassName="active"
              >
                Security
              </NavLink>
            </div>
          </div>
          <div className="col-9">
            <Switch>
              <Route path="/account/settings" component={Profile} exact />
              <Route path="/account/settings/change-password" component={ChangePassword} />
              <Route path="/account/settings/2fa" component={ConfigureTwoFactor} exact />
              <Route path="/account/settings/2fa/sms" component={ConfigureTwoFactorSMS} />
              <Route path="/account/settings/2fa/app" component={ConfigureTwoFactorApp} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, { location }) => ({
  location,
  user: state.account.user
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  ...bindActionCreators(actions, dispatch)
});

Settings.propTypes = propTypes;
export { Settings };
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
