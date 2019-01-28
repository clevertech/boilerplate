import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Form from 'react-jsonschema-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withError from '../../withError';
import { actions } from '../../../redux/modules/account';
import RecoveryCodes from './RecoveryCodes';

const propTypes = {
  generateTwoFactorQR: PropTypes.func.isRequired,
  configureTwoFactorQR: PropTypes.func.isRequired,
  twoFactor: PropTypes.object,
  location: PropTypes.object.isRequired,
  codes: PropTypes.arrayOf(PropTypes.string),
  user: PropTypes.object.isRequired
};

const configure = {
  schema: {
    title: 'Enter Verification Code',
    type: 'object',
    required: ['token'],
    properties: {
      token: {
        type: 'string',
        title: 'Code'
      }
    }
  },
  ui: {
    token: {
      'ui:help': 'Enter the 6-digit verification code generated in the app'
    }
  }
};

class ConfigureTwoFactorApp extends Component {
  componentDidMount() {
    this.props.generateTwoFactorQR();
  }

  onSubmit = form => {
    this.props.configureTwoFactorQR({
      secret: this.props.twoFactor.secret,
      token: form.formData.token
    });
  };

  render() {
    if (this.props.location.search === '?ok') return this.renderOkMessage();
    return this.renderConfigure();
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
              Two factor authentication using an app is now enabled in your account.
            </p>
            <RecoveryCodes codes={this.props.codes || []} email={this.props.user.email} />
          </div>
        </div>
      </div>
    );
  }

  renderConfigure() {
    const { twoFactor } = this.props;
    const qr = twoFactor && twoFactor.qr;

    return (
      <div className="row">
        <div className="col-8">
          <Form
            schema={configure.schema}
            uiSchema={configure.ui}
            onSubmit={this.onSubmit}
            noHtml5Validate
          >
            {this.props.error}
            {!qr && 'Generating QR...'}
            {qr && (
              <div>
                <ol>
                  <li>
                    Download and install{' '}
                    <a
                      href="https://support.google.com/accounts/answer/1066447"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Google Authenticator
                    </a>{' '}
                    for your phone or tablet.
                  </li>
                  <li>Open the authentication app and scan the QR code.</li>
                </ol>
              </div>
            )}
            <fieldset>
              <button className="btn btn-primary" type="submit">
                Verify Code
              </button>
            </fieldset>
          </Form>
        </div>
        <div className="col-4 d-flex justify-content-center align-items-center">
          {!qr && 'Generating QR...'}
          {qr && <img src={qr} alt="QR Code" />}
        </div>
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

ConfigureTwoFactorApp.propTypes = propTypes;
export { ConfigureTwoFactorApp };
export default withError(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ConfigureTwoFactorApp)
);
