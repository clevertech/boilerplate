import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Form from 'react-jsonschema-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { actions } from '../../redux/modules/account';
import Box from './Box';

const propTypes = {
  resetPassword: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};

const reset = {
  schema: {
    title: 'Password reset',
    type: 'object',
    required: ['password'],
    properties: {
      password: {
        type: 'string',
        title: 'New password'
      }
    }
  },
  ui: {
    password: {
      'ui:widget': 'password'
    }
  }
};

class ResetPassword extends Component {
  onSubmit = form => {
    const urlParams = new URLSearchParams(this.props.location.search);
    const token = urlParams.get('emailConfirmationToken');
    const { password } = form.formData;
    this.props.resetPassword({ password, token });
  };

  render() {
    return this.props.location.search === '?reset' ? this.renderResetMessage() : this.renderForm();
  }

  renderResetMessage() {
    return (
      <div className="container text-center">
        <div
          className="card shadow-lg p-3 mb-5 bg-white rounded"
          style={{ width: '20rem', margin: '100px auto' }}
        >
          <div className="card-body">
            <h5 className="card-title">
              <i className="fas fa-check" />
            </h5>
            <p className="card-text">Your password has been successfully changed.</p>
            <Link to="/account/login" className="btn btn-primary">
              Log in with your new password
            </Link>
          </div>
        </div>
      </div>
    );
  }

  renderForm() {
    return (
      <Box>
        <Form schema={reset.schema} uiSchema={reset.ui} onSubmit={this.onSubmit} noHtml5Validate>
          <fieldset>
            <button className="btn btn-primary btn-lg btn-block" type="submit">
              Change your password
            </button>
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

ResetPassword.propTypes = propTypes;
export { ResetPassword };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword);
