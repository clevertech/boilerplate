import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../../../redux/modules/account';

const propTypes = {
  getAccount: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

class Profile extends Component {
  componentDidMount() {
    this.props.getAccount();
  }

  render() {
    return (
      <div>
        <h2>Public Profile</h2>
        <hr />
        <dl>
          <dt>Name</dt>
          <dd>{this.props.user.name}</dd>
        </dl>
        <dl>
          <dt>Email</dt>
          <dd>{this.props.user.email}</dd>
        </dl>
      </div>
    );
  }
}

const mapStateToProps = (state, { location }) => ({
  location,
  user: state.account.user
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  ...bindActionCreators(actions, dispatch)
});

Profile.propTypes = propTypes;
export { Profile };
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
