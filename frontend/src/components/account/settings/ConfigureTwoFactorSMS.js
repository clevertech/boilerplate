import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Form from 'react-jsonschema-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withError from '../../withError';
import { actions } from '../../../redux/modules/account';
import RecoveryCodes from './RecoveryCodes';

const propTypes = {
  generateTwoFactorSMS: PropTypes.func.isRequired,
  configureTwoFactorSMS: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  twoFactor: PropTypes.object,
  codes: PropTypes.arrayOf(PropTypes.string),
  user: PropTypes.object.isRequired
};

const configure = {
  schema: {
    title: 'Add SMS Authentication',
    type: 'object',
    required: ['token'],
    properties: {
      token: {
        type: 'string',
        title: 'Please enter the 6-digit authentication code we just sent you'
      }
    }
  },
  ui: {
    token: {}
  }
};

const generate = {
  schema: {
    title: 'Add SMS Authentication',
    type: 'object',
    required: ['phoneNumber'],
    properties: {
      phoneNumber: {
        type: 'string',
        title: "What's your phone number"
      }
    }
  },
  ui: {
    phoneNumber: {}
  }
};

class ConfigureTwoFactorSMS extends Component {
  onSubmitGenerate = form => {
    this.props.generateTwoFactorSMS(form.formData);
  };

  onSubmitConfigure = form => {
    this.props.configureTwoFactorSMS({
      secret: this.props.twoFactor.secret,
      token: form.formData.token
    });
  };

  render() {
    if (this.props.location.search === '?confirm') return this.renderConfigure();
    if (this.props.location.search === '?ok') return this.renderOkMessage();
    return this.renderGenerate();
  }

  renderOkMessage() {
    return (
      <div className="container text-center">
        <div className="card shadow-lg p-3 mb-5 bg-white rounded message-box">
          <div className="card-body">
            <h5 className="card-title">
              <i className="fas fa-check" />
            </h5>
            <p className="card-text">
              Two factor authentication using SMS is now enabled in your account.
            </p>
            <RecoveryCodes codes={this.props.codes} email={this.props.user.email} />
          </div>
        </div>
      </div>
    );
  }

  renderConfigure() {
    return (
      <div>
        <Form
          schema={configure.schema}
          uiSchema={configure.ui}
          onSubmit={this.onSubmitConfigure}
          noHtml5Validate
        >
          {this.props.error}
          <fieldset>
            <button className="btn btn-primary" type="submit">
              Verify code
            </button>
          </fieldset>
        </Form>
      </div>
    );
  }

  renderGenerate() {
    return (
      <div>
        <Form
          schema={generate.schema}
          uiSchema={generate.ui}
          onSubmit={this.onSubmitGenerate}
          noHtml5Validate
        >
          {this.props.error}
          <fieldset>
            <button className="btn btn-primary" type="submit">
              Send authentication code
            </button>
          </fieldset>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state, { location }) => ({
  location,
  twoFactor: state.account.twoFactor,
  codes: state.account.codes,
  user: state.account.user
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...bindActionCreators(actions, dispatch)
});

ConfigureTwoFactorSMS.propTypes = propTypes;
export { ConfigureTwoFactorSMS };
export default withError(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ConfigureTwoFactorSMS)
);
