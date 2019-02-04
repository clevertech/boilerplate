import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Form from 'react-jsonschema-form';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import withError from '../withError';
import { actions } from '../../redux/modules/account';
import Box from './Box';

const propTypes = {
  login: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired
};

const login = {
  schema: {
    title: 'Member Login',
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
      'ui:placeholder': 'you@example.com'
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
      <Box>
        <Form schema={login.schema} uiSchema={login.ui} onSubmit={this.onSubmit} noHtml5Validate>
          {this.props.error}
          <fieldset>
            <button className="btn btn-primary btn-block btn-lg" type="submit">
              Log In
            </button>
            <div className="mt-2">
              <div className="float-left">
                <Link to="/account/forgot-password">Forgot your password?</Link>
              </div>
              <div className="float-right d-block">
                <Link to="/account/register">Create an account</Link>
              </div>
            </div>
          </fieldset>
        </Form>
      </Box>
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
