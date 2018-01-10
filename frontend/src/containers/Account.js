import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../redux/modules/authentication';

const propTypes = {};

class Account extends Component {
  componentWillMount() {
    this.props.getAccount();
  }

  render() {
    return (
      <div>
        <div className="hero is-link">
          <div className="hero-body">
            <div className="container">
              <h2 className="title">Hi {this.props.user.username}</h2>
            </div>
          </div>
        </div>
        <section className="section">
          <div className="container">
            <p>...</p>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state, { location }) => ({
  location,
  user: state.authentication.user
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  ...bindActionCreators(actions, dispatch)
});

Account.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(Account);
