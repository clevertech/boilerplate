import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { actions } from '../redux/modules/authentication';

const propTypes = {};

class App extends Component {
  render() {
    const { props } = this;
    return (
      <div>
        <nav className="navbar is-black" aria-label="main navigation">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">
              Boilerplate
            </Link>
          </div>
          <div className="navbar-menu">
            <div className="navbar-start">
              <div className="navbar-item">
                <Link to="/products" className="navbar-item">
                  Products
                </Link>
              </div>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">
                {props.user && (
                  <div className="field is-grouped">
                    <p className="control">
                      <a className="navbar-item">Hi {props.user.username}</a>
                    </p>
                    <p className="control">
                      <Link
                        to="/account"
                        className="navbar-item button is-primary"
                      >
                        Account
                      </Link>
                    </p>
                    <p>
                      <a onClick={props.logout} className="navbar-item button">
                        Log Out
                      </a>
                    </p>
                  </div>
                )}
                {!props.user && (
                  <div className="field is-grouped">
                    <p className="control">
                      <Link
                        to="/login"
                        className="navbar-item button is-primary"
                      >
                        Sign in
                      </Link>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
        {props.children}
      </div>
    );
  }
}

const mapStateToProps = (state, { location }) => ({
  location,
  user: state.authentication.user
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  logout: () => dispatch(actions.logout())
});

App.propTypes = propTypes;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
