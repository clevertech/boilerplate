import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import withError from '../withError';
import { actions } from '../../redux/modules/account';

const propTypes = {
  location: PropTypes.object.isRequired,
  confirmEmail: PropTypes.func.isRequired
};

class ConfirmEmail extends Component {
  componentDidMount() {
    const urlParams = new URLSearchParams(this.props.location.search);
    const token = urlParams.get('emailConfirmationToken');
    this.props.confirmEmail({ token });
  }

  render() {
    if (this.props.error) return this.props.error;
    return this.props.location.search === '?ok'
      ? this.renderSuccessMessage()
      : this.renderWaiting();
  }

  renderSuccessMessage() {
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
            <p className="card-text">Thanks! You have confirmed your email address successfully</p>
            <Link to="/account/login" className="btn btn-primary">
              Log in with your credentials
            </Link>
          </div>
        </div>
      </div>
    );
  }

  renderWaiting() {
    return (
      <div className="container text-center">
        {this.props.error}
        <div
          className="card shadow-lg p-3 mb-5 bg-white rounded"
          style={{ width: '20rem', margin: '100px auto' }}
        >
          <div className="card-body">
            <h5 className="card-title">
              <i className="fas fa-user-cog" />
            </h5>
            <p className="card-text">Please, hold on a second...</p>
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

ConfirmEmail.propTypes = propTypes;
export { ConfirmEmail };
export default withError(connect(mapStateToProps, mapDispatchToProps)(ConfirmEmail));
