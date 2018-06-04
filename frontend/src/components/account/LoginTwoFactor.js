import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Form from 'react-jsonschema-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { actions } from '../../redux/modules/account';
import Box from './Box';

const propTypes = {
  loginTwoFactor: PropTypes.func.isRequired,
  twoFactor: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  loggedIn: PropTypes.bool.isRequired
};

const login = {
  schema: {
    title: 'Two Factor Authentication',
    type: 'object',
    required: ['token'],
    properties: {
      token: {
        type: 'string',
        title: 'Please enter the 6-digit authentication code or a recovery code'
      }
    }
  },
  ui: {
    token: {}
  }
};

class LoginTwoFactor extends Component {
  onSubmit = form => {
    this.props.loginTwoFactor({
      token: form.formData.token,
      jwt: this.props.twoFactor.token
    });
  };

  render() {
    if (this.props.loggedIn) {
      const { from } = this.props.location.state || { from: { pathname: '/' } };

      return <Redirect to={from} />;
    }

    const { twofactor, twofactorPhone } = this.props.twoFactor || {};

    return (
      <Box>
        <Form schema={login.schema} uiSchema={login.ui} onSubmit={this.onSubmit} noHtml5Validate>
          {this.props.error}
          {twofactor === 'qr' && <p>Open Google Authentication or similar app and enter a code</p>}
          {twofactor === 'sms' && (
            <p>
              Enter the code we sent you in an SMS to <em>{twofactorPhone}</em>
            </p>
          )}
          <fieldset>
            <button className="btn btn-primary btn-block btn-lg" type="submit">
              Log In
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
  twoFactor: state.account.twoFactor
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...bindActionCreators(actions, dispatch)
});

LoginTwoFactor.propTypes = propTypes;
export { LoginTwoFactor };
export default connect(mapStateToProps, mapDispatchToProps)(LoginTwoFactor);
