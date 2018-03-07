import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../redux/modules/authentication';

const propTypes = {};

class Login extends Component {
  onSubmit = e => {
    e.preventDefault();

    this.props.login({
      username: this.refs.username.value,
      password: this.refs.password.value
    });
  };

  render() {
    if (this.props.loggedIn) {
      const { from } = this.props.location.state || { from: { pathname: '/' } };

      return <Redirect to={from} />;
    }

    const error = this.props.error ? (
      <div className="notification is-danger">{this.props.error}</div>
    ) : null;

    return (
      <form onSubmit={this.onSubmit}>
        <div className="hero is-link">
          <div className="hero-body">
            <div className="container">
              <h2 className="title">Sign in</h2>
            </div>
          </div>
        </div>
        <section className="section">
          <div className="container">
            {error}
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input className="input" ref="username" />
              </div>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input className="input" ref="password" type="password" />
              </div>
            </div>

            <div className="control">
              <button
                className={`button is-primary ${this.props.loggingIn ? 'is-loading' : ''}`}
                disabled={this.props.loggingIn}
                type="submit"
              >
                Login
              </button>
            </div>
          </div>
        </section>
      </form>
    );
  }
}

const mapStateToProps = (state, { location }) => ({
  location,
  loggedIn: !!state.authentication.user,
  error: state.authentication.error,
  loggingIn: state.authentication.loggingIn
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...bindActionCreators(actions, dispatch)
});

Login.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(Login);
