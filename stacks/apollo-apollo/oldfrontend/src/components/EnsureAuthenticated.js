import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const propTypes = {};

class EnsureAuthenticated extends Component {
  render() {
    return this.props.user ? this.props.children || null : <Redirect to="/account/login" />;
  }
}

const mapStateToProps = (state, { location }) => ({
  location,
  user: state.account.user
});
const mapDispatchToProps = (dispatch, ownProps) => ({});

EnsureAuthenticated.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(EnsureAuthenticated);
