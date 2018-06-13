import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import withError from '../withError';
import { actions } from '../../redux/modules/account';

const propTypes = {
  login: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }
  onSubmit = () => {
    this.props.login({
      email: this.state.email,
      password: this.state.password
    });
  };

  handleInputEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  handleInputPasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  render() {
    if (this.props.loggedIn) {
      const { from } = this.props.location.state || { from: { pathname: '/' } };

      return <Redirect to={from} />;
    }

    return (
      <div>
        <br />
        <div className="columns is-mobile">
          <div className="column is-half is-offset-one-fifth">
            <div className="box">
              <h3>Member Login</h3>
              {this.props.error && (
                <div className="notification is-link">
                  <button className="delete" />
                  {this.props.error}
                </div>
              )}

              <div className="field">
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="email"
                    placeholder="Email"
                    onChange={this.handleInputEmailChange}
                    value={this.state.email}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope" />
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-check" />
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input"
                    type="password"
                    placeholder="Password"
                    onChange={this.handleInputPasswordChange}
                    value={this.state.password}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock" />
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control">
                  <button className="button is-success" onClick={() => this.onSubmit()}>
                    Login
                  </button>
                </p>
              </div>
              <div className="field is-grouped">
                <p className="control">
                  <Link to="/account/forgot-password">Forgot your password?</Link>
                </p>
                <p className="control">
                  <Link to="/account/register">Create an account</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, { location }) => ({
  location,
  loggedIn: !!state.account.user,
  loggingIn: state.account.loggingIn
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...bindActionCreators(actions, dispatch)
});

Login.propTypes = propTypes;
export { Login };
export default withError(connect(mapStateToProps, mapDispatchToProps)(Login));
