import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { actions } from '../redux/modules/account';

const propTypes = {};

class App extends Component {
  render() {
    const { props } = this;
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark" aria-label="main navigation">
          <Link className="navbar-brand" to="/">
            Boilerplate
          </Link>
          <ul className="navbar-nav mr-auto">
            {props.user && (
              <li className="nav-item">
                <NavLink to="/products" className="nav-link">
                  Products
                </NavLink>
              </li>
            )}
          </ul>
          <div style={{ flexGrow: 1000 }} />
          <ul className="navbar-nav mr-auto">
            {props.user && (
              <li className="nav-item">
                <NavLink to="/account/settings" className="nav-link">
                  Settings
                </NavLink>
              </li>
            )}
            {props.user && (
              <li className="nav-item">
                <a href="#!" onClick={props.logout} className="nav-link">
                  Log Out
                </a>
              </li>
            )}
            {!props.user && (
              <li className="nav-item">
                <NavLink to="/account/login" className="nav-link">
                  Sign in
                </NavLink>
              </li>
            )}
          </ul>
          <div className="collapse navbar-collapse" id="navbarSupportedContent" />
        </nav>
        <br />
        <section className="container">{props.children}</section>
      </div>
    );
  }
}

const mapStateToProps = (state, { location }) => ({
  location,
  user: state.account.user
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  logout: () => dispatch(actions.logout())
});

App.propTypes = propTypes;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
