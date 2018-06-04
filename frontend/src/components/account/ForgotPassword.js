import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Form from 'react-jsonschema-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import withError from '../withError';
import { actions } from '../../redux/modules/account';
import Box from './Box';

const propTypes = {
  location: PropTypes.object,
  forgotPassword: PropTypes.func.isRequired
};

const forgot = {
  schema: {
    title: 'Password reset',
    type: 'object',
    required: ['email'],
    properties: {
      email: {
        type: 'string',
        title: 'Your email address',
        format: 'email'
      }
    }
  },
  ui: {
    email: {
      'ui:placeholder': 'you@example.com',
      'ui:help': 'We will send you reset instructions in an email'
    }
  }
};

class ForgotPassword extends Component {
  onSubmit = form => {
    this.props.forgotPassword(form.formData);
  };

  render() {
    return this.props.location.search === '?sent' ? this.renderSentMessage() : this.renderForm();
  }

  renderSentMessage() {
    return (
      <div className="container text-center">
        <div
          className="card shadow-lg p-3 mb-5 bg-white rounded"
          style={{ width: '20rem', margin: '100px auto' }}
        >
          <div className="card-body">
            <h5 className="card-title">
              <i className="fas fa-envelope" />
            </h5>
            <p className="card-text">
              Check your inbox, we have sent you an email with instructions to reset your email.
            </p>
          </div>
        </div>
      </div>
    );
  }

  renderForm() {
    return (
      <Box>
        <Form schema={forgot.schema} uiSchema={forgot.ui} onSubmit={this.onSubmit} noHtml5Validate>
          {this.props.error}
          <fieldset>
            <button className="btn btn-primary btn-lg btn-block" type="submit">
              Send reset instructions
            </button>
            <div className="mt-2">
              <div className="float-left">
                <Link to="/account/register">Create an account</Link>
              </div>
              <div className="float-right d-block">
                <Link to="/account/login">Log In</Link>
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

ForgotPassword.propTypes = propTypes;
export { ForgotPassword };
export default withError(connect(mapStateToProps, mapDispatchToProps)(ForgotPassword));
