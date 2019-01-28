import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Form from 'react-jsonschema-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import withError from '../../withError';
import { actions } from '../../../redux/modules/account';

const propTypes = {
  getTwoFactorStatus: PropTypes.func.isRequired,
  disableTwoFactor: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  twoFactorStatus: PropTypes.object
};

const disableForm = {
  schema: {
    title: 'Disable two-factor authentication',
    type: 'object',
    required: ['password'],
    properties: {
      password: {
        type: 'string',
        title: 'Password'
      }
    }
  },
  ui: {
    password: {
      'ui:widget': 'password'
    }
  }
};

class ConfigureTwoFactor extends Component {
  state = {};

  componentDidMount() {
    this.props.getTwoFactorStatus();
  }

  onSubmit = form => {
    this.props.disableTwoFactor(form.formData);
  };

  showDisableForm = () => {
    this.setState({ showDisableForm: true });
  };

  hideDisableForm = () => {
    this.setState({ showDisableForm: false });
  };

  render() {
    if (this.props.location.search === '?disabled') return this.renderDisabled();
    return this.renderForm();
  }

  renderDisabled() {
    return (
      <div className="container text-center">
        <div className="card shadow-lg p-3 mb-5 bg-white rounded message-box">
          <div className="card-body">
            <h5 className="card-title">
              <i className="fas fa-check" />
            </h5>
            <p className="card-text">Two factor authentication has been disabled.</p>
          </div>
        </div>
      </div>
    );
  }

  renderDisableForm() {
    const { twofactor, twofactorPhone } = this.props.twoFactorStatus;
    const messages = {
      sms: `with SMS using this phone number: ${twofactorPhone}`,
      qr: 'using an app'
    };
    const message = messages[twofactor] || '';
    return (
      <div className="card">
        <div className="card-body">
          {this.state.showDisableForm && (
            <div>
              <Form
                schema={disableForm.schema}
                uiSchema={disableForm.ui}
                onSubmit={this.onSubmit}
                noHtml5Validate
              >
                {this.props.error}
                <fieldset>
                  <button type="submit" className="btn btn-danger">
                    Disable two-factor authentication
                  </button>{' '}
                  <button className="btn btn-link" onClick={this.hideDisableForm}>
                    Cancel
                  </button>{' '}
                </fieldset>
              </Form>
              <br />
            </div>
          )}
          {!this.state.showDisableForm && (
            <p className="card-text">You have two factor authentication enabled {message}</p>
          )}

          {!this.state.showDisableForm && (
            <p className="card-text">
              <button className="btn btn-secondary" onClick={this.showDisableForm}>
                Edit
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  renderConfigurationOptions() {
    return (
      <div>
        <p>There are two ways to configure two factor authentication </p>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">SMS text message</h5>
            <p className="card-text">Receive a text message to your mobile device</p>
            <Link to="/account/settings/2fa/sms">
              <button className="btn btn-primary">Configure phone</button>
            </Link>
          </div>
        </div>
        <br />
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Use an app</h5>
            <p className="card-text">Scan a QR code with Google Authentication or similar apps</p>
            <Link to="/account/settings/2fa/app">
              <button className="btn btn-primary">Configure app</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  renderForm() {
    if (!this.props.twoFactorStatus) {
      return (
        <div>
          {this.props.error}
          <p>Loading two-factor configuration status...</p>
        </div>
      );
    }

    const { twofactor } = this.props.twoFactorStatus;
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2>Security</h2>
          </div>
        </div>

        {twofactor && this.renderDisableForm()}
        {!twofactor && this.renderConfigurationOptions()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  twoFactorStatus: state.account.twoFactorStatus
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...bindActionCreators(actions, dispatch)
});

ConfigureTwoFactor.propTypes = propTypes;
export { ConfigureTwoFactor };
export default withError(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ConfigureTwoFactor)
);
