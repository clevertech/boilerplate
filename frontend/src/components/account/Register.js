import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Form from 'react-jsonschema-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import withError from '../withError';
import { actions, accountInfo } from '../../redux/modules/account';

const validate = (formData, errors) => {
  if (formData.password !== formData.repassword) {
    errors.repassword.addError("Passwords don't match");
  }
  return errors;
};

const propTypes = {
  register: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};

const register = {
  schema: {
    title: 'Register',
    type: 'object',
    required: ['username', 'firstName', 'lastName', 'email', 'password', 'repassword'],
    properties: {
      username: {
        type: 'string',
        title: 'Username'
      },
      firstName: {
        type: 'string',
        title: 'First name'
      },
      lastName: {
        type: 'string',
        title: 'Last name'
      },
      email: {
        type: 'string',
        title: 'Email',
        format: 'email'
      },
      password: {
        type: 'string',
        title: 'Password'
      },
      repassword: {
        type: 'string',
        title: 'Re-enter password'
      }
    }
  },
  ui: {
    email: {
      'ui:placeholder': 'you@example.com'
    },
    password: {
      'ui:widget': 'password',
      'ui:help': 'Make it strong!'
    },
    repassword: {
      'ui:widget': 'password'
    }
  }
};

class Register extends Component {
  onSubmit = form => {
    this.props.register(form.formData);
  };

  render() {
    return this.props.location.search === '?ok' ? this.renderOkMessage() : this.renderForm();
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
              <i className="fas fa-envelope" />
            </h5>
            <p className="card-text">
              Check your inbox, we have sent you an email to confirm your email address.
            </p>
          </div>
        </div>
      </div>
    );
  }

  renderForm() {
    return (
      <div>
        <br />
        <div className="columns is-mobile">
          <div className="column is-half is-offset-one-fifth">
            <div className="box">
              <Form
                schema={register.schema}
                uiSchema={register.ui}
                onSubmit={this.onSubmit}
                noHtml5Validate
                validate={validate}
              >
                {this.props.error}
                <fieldset>
                  <button className="btn btn-primary btn-block btn-lg" type="submit">
                    Register
                  </button>
                  <div className="mt-2">
                    <div className="float-left">
                      <Link to="/account/login">Log in to your account</Link>
                    </div>
                  </div>
                </fieldset>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, { location }) => accountInfo(state.account, { location });

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch)
});

Register.propTypes = propTypes;
export { Register };
export default withError(connect(mapStateToProps, mapDispatchToProps)(Register));
