import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Form from 'react-jsonschema-form';
import withError from '../withError';
import { actions } from '../../redux/modules/account';

const propTypes = {
  login: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired
};

const login = {
  schema: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: {
        type: 'string',
        title: 'Email',
        format: 'email'
      },
      password: {
        type: 'string',
        title: 'Password'
      }
    }
  },
  ui: {
    email: {
      'ui:placeholder': 'you@example.com',
      classNames: 'field'
    },
    password: {
      'ui:widget': 'password'
    }
  }
};

class Login extends Component {
  onSubmit = form => {
    this.props.login(form.formData);
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

              <Form
                schema={login.schema}
                uiSchema={login.ui}
                onSubmit={this.onSubmit}
                noHtml5Validate
              >
                <div className="field">
                  <p className="control">
                    <button className="button is-success" type="submit">
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
              </Form>
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
export default withError(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);
