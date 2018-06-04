import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Form from 'react-jsonschema-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withError from '../../withError';
import { actions } from '../../../redux/modules/account';

const propTypes = {
  changePassword: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};

const changePassword = {
  schema: {
    title: 'Change your password',
    type: 'object',
    required: ['oldPassword', 'newPassword'],
    properties: {
      oldPassword: {
        type: 'string',
        title: 'Old password'
      },
      newPassword: {
        type: 'string',
        title: 'New password'
      }
    }
  },
  ui: {
    oldPassword: {
      'ui:widget': 'password'
    },
    newPassword: {
      'ui:widget': 'password'
    }
  }
};

class ChangePassword extends Component {
  onSubmit = form => {
    this.props.changePassword(form.formData);
  };

  render() {
    if (this.props.location.search === '?ok') return this.renderOkMessage();
    return this.renderForm();
  }

  renderOkMessage() {
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
            <p className="card-text">Your password has been changed successfully.</p>
          </div>
        </div>
      </div>
    );
  }

  renderForm() {
    return (
      <div>
        <Form
          schema={changePassword.schema}
          uiSchema={changePassword.ui}
          onSubmit={this.onSubmit}
          noHtml5Validate
        >
          {this.props.error}
          <fieldset>
            <button className="btn btn-primary" type="submit">
              Change your password
            </button>
          </fieldset>
        </Form>
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

ChangePassword.propTypes = propTypes;
export { ChangePassword };
export default withError(connect(mapStateToProps, mapDispatchToProps)(ChangePassword));
